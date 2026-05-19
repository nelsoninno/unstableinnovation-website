# unstableinnovation.com — rebuild

Static site to replace the current Wix-hosted unstableinnovation.com. Deployed via GitHub Pages.

## Folder structure

```
unstableinnovation-website/
├── README.md                                    (this file)
├── index.html                                   (home)
├── books.html, get.html, thank-you.html, ...    (English pages)
├── insights.html, takeaways.html, ...
├── megatrends/                                  (megatrend subpages)
├── es/                                          (Spanish mirror, added in phase 2)
├── llms.txt, llms-full.txt
├── sitemap.xml, robots.txt, feed.xml
│
├── assets/
│   ├── css/                  (stylesheet)
│   ├── js/                   (form handler, menu)
│   ├── fonts/                ← Nelson: drop Unstable.woff2 + Unstable.woff here
│   └── images/
│       ├── photos/           ← Nelson: portrait + workshop + TEDx photos
│       ├── book-covers/      ← Nelson: Unstable Innovation EN/ES 3D mockups + flat covers
│       ├── recommended-books/← Nelson: the 15 book cover images
│       ├── reviews/          ← Nelson: hand-drawn cartoon reviewer icons
│       ├── logos-featured-on/← Nelson: Forbes, ZDF, ARD, TEDx, CoinDesk, El Salvador Diario logos
│       ├── icons/            ← Nelson: insights category icons (Megatrends, Books, etc.)
│       └── og/               (Open Graph social cards — I'll generate these)
│
└── files/
    ├── en/                   ← Nelson: unstable-innovation-en.pdf, .epub, .mobi (or .azw3)
    └── es/                   ← Nelson: innovacion-inestable-es.pdf, .epub, .mobi (or .azw3)
```

## What to drop where

| What | Where | Naming hint |
|---|---|---|
| Custom "Unstable" font files | `assets/fonts/` | `unstable.woff2`, `unstable.woff` |
| English book PDF | `files/en/` | `unstable-innovation.pdf` |
| English book EPUB | `files/en/` | `unstable-innovation.epub` |
| English Kindle file | `files/en/` | `unstable-innovation.mobi` or `.azw3` |
| Spanish book PDF | `files/es/` | `innovacion-inestable.pdf` |
| Spanish book EPUB | `files/es/` | `innovacion-inestable.epub` |
| Spanish Kindle file | `files/es/` | `innovacion-inestable.mobi` or `.azw3` |
| Book 3D mockup (EN) | `assets/images/book-covers/` | `unstable-innovation-3d.png` |
| Book flat cover (EN) | `assets/images/book-covers/` | `unstable-innovation-flat.jpg` |
| Book 3D mockup (ES) | `assets/images/book-covers/` | `innovacion-inestable-3d.png` |
| Innovation helmet hero image | `assets/images/photos/` | `helmet-hero.png` |
| Nelson portrait (yellow bg, mic) | `assets/images/photos/` | `nelson-speaker-yellow.jpg` |
| TEDx photo | `assets/images/photos/` | `nelson-tedx.jpg` |
| Workshop / sticky notes | `assets/images/photos/` | `workshop-sticky-notes.jpg` |
| weSpark studio | `assets/images/photos/` | `wespark-studio.jpg` |
| Two-person helmet shot | `assets/images/photos/` | `nelson-kris-helmet.jpg` |
| 15 recommended-book covers | `assets/images/recommended-books/` | `01-little-book-of-stoicism.jpg`, `02-consolations-of-philosophy.jpg`, ... (numbered in order) |
| 4 reviewer cartoon icons | `assets/images/reviews/` | `aliya.png`, `julio.png`, `abdul.png`, `tim.png` |
| Featured-on logos | `assets/images/logos-featured-on/` | `forbes.svg`, `zdf.svg`, `ard.svg`, `tedx.svg`, `coindesk.svg`, `eldiario.svg` (SVG preferred) |
| 4 insights icons | `assets/images/icons/` | `megatrends.png`, `recommended-books.png`, `takeaways.png`, `applications.png` |

If you don't have any of these, drop what you have and use whatever naming. I'll adapt.
