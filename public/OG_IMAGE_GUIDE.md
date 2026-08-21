# UrbanNest Lifestyle Store — Open Graph & Social Preview Asset Guide

This specification defines the design guidelines for `og-image.jpg` (1200 × 630 px) used for Open Graph (Facebook, LinkedIn, iMessage) and Twitter Card rich sharing previews.

---

## 1. Visual Composition & Palette

| Element | Specification | Design System Token |
|---|---|---|
| **Canvas Size** | 1200 × 630 px (1.91:1 aspect ratio) | Standard Open Graph Size |
| **Background** | Warm natural cream (`#F7F5EF`) with subtle 3.5% noise texture | `--color-paper` |
| **Headline** | *"UrbanNest Lifestyle Store"* in Fraunces Soft Display Serif (64pt, `#26261F`) | `--color-ink`, `--font-display` |
| **Tagline** | *"Little Things. Beautiful Living."* in Space Mono uppercase (20pt, `#8B5E3C`) | `--color-clay`, `--font-utility` |
| **Artisan Tag Badge** | Signature gift tag in Deep Pine Moss (`#5C6B4F`) with punch-hole eyelet | `--color-moss`, `--radius-tag` |
| **Showcase Imagery** | Two-item curated stack: Hand-Pinched Stoneware Pitcher + Botanical Cedar Candle | Studio Product Imagery |
| **Trust Marker** | *"Handcrafted Pottery • Washed Linens • Artisan Stationery"* | Editorial Subtext |

---

## 2. Technical Validation
- File format: High quality JPEG / WebP (`og-image.jpg`)
- Max file size: < 300 KB for rapid messenger link unrolling
- Safe margin: 80px inner padding on all sides to prevent text clipping across mobile unfurlers.
