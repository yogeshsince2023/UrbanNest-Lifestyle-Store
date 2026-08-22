/**
 * Calculate total quantity count and subtotal amount
 * @param {Array} items
 * @returns {{ totalCount: number, subtotal: number }}
 */
export function calculateCartTotals(items = []) {
  return items.reduce(
    (acc, item) => {
      const qty = item.quantity || 1;
      acc.totalCount += qty;
      acc.subtotal += (item.price || 0) * qty;
      return acc;
    },
    { totalCount: 0, subtotal: 0 }
  );
}

/**
 * Default seeded initial items for out-of-the-box demonstration
 */
export const DEFAULT_INITIAL_ITEMS = [];

/**
 * Cart Reducer handling all parcel operations
 */
export function cartReducer(state, action) {
  let newItems;

  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.payload;
      const quantityToAdd = action.quantity || 1;
      const existingIndex = state.items.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        newItems = state.items.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: (item.quantity || 1) + quantityToAdd }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          {
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            shortDescription: product.shortDescription,
            image: product.image,
            quantity: quantityToAdd,
          },
        ];
      }
      break;
    }

    case 'REMOVE_ITEM': {
      const idToRemove = action.payload;
      newItems = state.items.filter((item) => item.id !== idToRemove);
      break;
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        newItems = state.items.filter((item) => item.id !== id);
      } else {
        newItems = state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
      }
      break;
    }

    case 'CLEAR_CART': {
      newItems = [];
      break;
    }

    case 'OPEN_DRAWER': {
      return { ...state, isDrawerOpen: true };
    }

    case 'CLOSE_DRAWER': {
      return { ...state, isDrawerOpen: false };
    }

    case 'TOGGLE_DRAWER': {
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    }

    default:
      return state;
  }

  const { totalCount, subtotal } = calculateCartTotals(newItems);
  return {
    ...state,
    items: newItems,
    totalCount,
    subtotal,
  };
}
