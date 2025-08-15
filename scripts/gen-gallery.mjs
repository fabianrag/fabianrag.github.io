import fg from 'fast-glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Cambia si alojas fuera (p. ej. Supabase/CDN). Mantén la barra final.
const BASE_URL = process.env.GALLERY_BASE_URL ?? '/photos/';

const MOBILE_DIR = 'public/photos/mobile';
const DESKTOP_DIR = 'public/photos/desktop';

const mobileFiles = await fg([`${MOBILE_DIR}/*.webp`], { dot: false });
const desktopFiles = await fg([`${DESKTOP_DIR}/*.webp`], { dot: false });

const byBase = (p) => {
  const name = path.basename(p, path.extname(p));
  // normalizamos quitando sufijos comunes
  return name.replace(/-(mobile|desktop)$/i, '');
};

// indexamos desktop por basename
const deskMap = new Map();
for (const d of desktopFiles) {
  deskMap.set(byBase(d), d);
}

const items = [];
for (const m of mobileFiles) {
  const base = byBase(m);
  const d = deskMap.get(base)
    ?? desktopFiles.find(f => byBase(f) === base)   // fallback
    ?? null;

  // Si no hay par en desktop, usamos el mobile también como original
  const originalPath = d ?? m;

  // Metadatos reales del "original"
  const meta = await sharp(originalPath).metadata();
  const width = meta.width ?? 1024;
  const height = meta.height ?? 768;

  // URLs públicas (GitHub Pages sirve /public como raíz)
  const mobileUrl = `${BASE_URL}mobile/${path.basename(m)}`;
  const desktopUrl = `${BASE_URL}${originalPath.includes('/desktop/')
    ? `desktop/${path.basename(originalPath)}`
    : `mobile/${path.basename(originalPath)}`}`;

  items.push({
    id: base,
    original: desktopUrl,
    thumbnail: mobileUrl,
    width,
    height,
    caption: '',
    alt: base
  });
}

// Orden opcional por nombre
items.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

await fs.mkdir('src/data', { recursive: true });
await fs.writeFile('src/data/gallery.json', JSON.stringify(items, null, 2), 'utf8');

console.log(`✅ Generado src/data/gallery.json con ${items.length} fotos`);
