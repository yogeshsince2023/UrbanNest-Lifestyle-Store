import productsData from '../data/products.json' with { type: 'json' };


/**
 * =============================================================================
 * RECOMMENDATION ENGINE LOGIC: Jaccard Tag Similarity + Content-Based Filtering
 * =============================================================================
 *
 * HOW THE SIMILARITY ALGORITHM WORKS IN PLAIN TERMS:
 *
 * 1. Tag Vector Extraction:
 *    Extracts all attribute tags from items in the cart (or active product).
 *    Example: Cart has Pitcher (['ceramics', 'stoneware', 'earthy']) + Tea Box (['tea', 'ceramics', 'brass']).
 *    Query Tag Set A = {'ceramics', 'stoneware', 'earthy', 'tea', 'brass'}.
 *
 * 2. Jaccard Similarity Coefficient:
 *    For every catalog product B with tags B_tags:
 *    Intersection = Elements appearing in BOTH Query Set A and Product Set B
 *    Union = All unique elements across BOTH sets
 *    Jaccard Index = |Intersection| / |Union| (Range: 0.0 to 1.0)
 *
 * 3. Multi-Factor Tiebreakers (Category & Price Proximity):
 *    - Category Synergy Bonus (+0.12): Products sharing a category with query items get a boost.
 *    - Price Band Proximity (+0.08 max): Products priced close to the average cart item price get a slight boost:
 *      priceDeltaScore = 1 / (1 + |candidatePrice - avgPrice| / 800) * 0.08
 *    - Composite Score = (Jaccard * 0.80) + CategoryBonus + PriceDeltaScore
 *
 * 4. Anti-Duplicate Exclusion:
 *    Strictly filters out any product ID already in the cart or target selection.
 *
 * 5. Zero-State Fallback:
 *    If the cart is empty, seeds recommendations with featured curated artisan staples.
 */

/**
 * Calculate Jaccard similarity between two arrays of string tags
 *
 * @param {string[]} tagsA
 * @param {string[]} tagsB
 * @returns {number} Float from 0.0 to 1.0
 */
export function calculateJaccardSimilarity(tagsA, tagsB) {
  if (!tagsA?.length || !tagsB?.length) return 0;

  const setA = new Set(tagsA.map((t) => t.toLowerCase()));
  const setB = new Set(tagsB.map((t) => t.toLowerCase()));

  let intersectionCount = 0;
  for (const tag of setA) {
    if (setB.has(tag)) {
      intersectionCount++;
    }
  }

  const unionCount = new Set([...setA, ...setB]).size;
  return unionCount === 0 ? 0 : intersectionCount / unionCount;
}

/**
 * Generate genuine content-based recommendations
 *
 * @param {Object} options
 * @param {Object} [options.targetProduct] - Single product to find matches for
 * @param {Array} [options.cartItems=[]] - Cart items to base collective recommendations on
 * @param {Array} [options.catalog=productsData] - Complete product list
 * @param {number} [options.limit=4] - Max recommendations to return
 * @param {string[]} [options.excludeIds=[]] - Product IDs to exclude (already in cart/active)
 * @returns {Array<Object & { similarityScore: number, matchPercentage: number, sharedTags: string[] }>}
 */
export function getRecommendations({
  targetProduct = null,
  cartItems = [],
  catalog = productsData,
  limit = 4,
  excludeIds = [],
} = {}) {
  // Build set of excluded product IDs
  const excludedSet = new Set(excludeIds.map(String));
  if (targetProduct?.id) {
    excludedSet.add(String(targetProduct.id));
  }
  for (const item of cartItems) {
    const itemId = item?.id || item?.product?.id;
    if (itemId) excludedSet.add(String(itemId));
  }

  // 1. Gather all query source items
  let sourceItems = [];
  if (targetProduct) {
    sourceItems = [targetProduct];
  } else if (cartItems && cartItems.length > 0) {
    sourceItems = cartItems.map((ci) => ci.product || ci);
  }

  // Fallback: If no cart items or target, seed with featured products
  if (sourceItems.length === 0) {
    const featuredPool = catalog
      .filter((p) => !excludedSet.has(String(p.id)))
      .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return featuredPool.slice(0, limit).map((p, idx) => ({
      ...p,
      similarityScore: Math.max(0.65, 0.95 - idx * 0.08),
      matchPercentage: Math.round(Math.max(65, 95 - idx * 8)),
      sharedTags: (p.tags || []).slice(0, 2),
      recommendationReason: p.featured ? 'Featured Studio Curation' : 'Artisan Essential',
    }));
  }

  // 2. Aggregate query tags, categories, and average price
  const queryTags = new Set();
  const queryCategories = new Set();
  let totalPrice = 0;

  for (const item of sourceItems) {
    if (item.tags && Array.isArray(item.tags)) {
      item.tags.forEach((t) => queryTags.add(t.toLowerCase()));
    }
    if (item.category) {
      queryCategories.add(item.category);
    }
    totalPrice += Number(item.price) || 1000;
  }

  const queryTagsArray = Array.from(queryTags);
  const avgPrice = sourceItems.length > 0 ? totalPrice / sourceItems.length : 1000;

  // 3. Score every candidate product in the catalog
  const scoredCandidates = catalog
    .filter((candidate) => !excludedSet.has(String(candidate.id)))
    .map((candidate) => {
      const candidateTags = (candidate.tags || []).map((t) => t.toLowerCase());

      // Jaccard similarity score on tag intersection/union
      const jaccard = calculateJaccardSimilarity(queryTagsArray, candidateTags);

      // Shared tags list
      const candidateTagSet = new Set(candidateTags);
      const sharedTags = queryTagsArray.filter((t) => candidateTagSet.has(t));

      // Category synergy bonus (+0.22 if same category, +0.05 otherwise)
      const isSharedCategory = queryCategories.has(candidate.category);

      // Composite score: Tag overlap (primary) + Category synergy + Price proximity
      const priceDelta = Math.abs((Number(candidate.price) || 1000) - avgPrice);
      const jaccardWeight = jaccard * 0.65;
      const categoryWeight = isSharedCategory ? 0.22 : 0.05;
      const priceWeight = (1 / (1 + priceDelta / 700)) * 0.18;


      const rawScore = jaccardWeight + categoryWeight + priceWeight;
      const normalizedScore = Math.min(0.98, Math.max(0.48, rawScore));


      let recommendationReason = 'Artisan Synergy';
      if (sharedTags.length > 0) {
        recommendationReason = `Pairs with ${sharedTags[0]} craft`;
      } else if (isSharedCategory) {
        recommendationReason = `Complementary ${candidate.category}`;
      }


      return {
        ...candidate,
        similarityScore: normalizedScore,
        matchPercentage: Math.round(normalizedScore * 100),
        sharedTags,
        recommendationReason,
      };
    });

  // 4. Sort descending by similarity score, with price tiebreaker
  scoredCandidates.sort((a, b) => {
    if (Math.abs(b.similarityScore - a.similarityScore) > 0.01) {
      return b.similarityScore - a.similarityScore;
    }
    return (a.price || 0) - (b.price || 0);
  });

  return scoredCandidates.slice(0, limit);
}
