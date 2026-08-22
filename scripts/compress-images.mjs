/**
 * Compress all product JPGs: generate WebP + compressed JPG.
 * Run: node scripts/compress-images.mjs
 */
import sharp from 'sharp';
import { readdirSync, writeFileSync, readFileSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const IMG_DIR = join(__dirname, '..', 'public', 'assets', 'images', 'products');

const MAX_WIDTH = 600;
const QUALITY = 75;

async function compressAll() {
  const files = readdirSync(IMG_DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  console.log(`Found ${files.length} images to compress...`);

  for (const file of files) {
    const input = join(IMG_DIR, file);
    const webpOut = join(IMG_DIR, basename(file, extname(file)) + '.webp');

    try {
      // Read entire file into memory first to avoid lock conflicts on Windows
      const buf = readFileSync(input);

      // Generate WebP
      await sharp(buf)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(webpOut);

      // Compress original JPG in-place
      const compressedJpg = await sharp(buf)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toBuffer();

      writeFileSync(input, compressedJpg);

      console.log(`  OK ${file} -> ${basename(webpOut)} (${(compressedJpg.length / 1024).toFixed(0)}KB)`);
    } catch (err) {
      console.error(`  FAIL ${file}: ${err.message}`);
    }
  }
  console.log('Done!');
}

compressAll();
