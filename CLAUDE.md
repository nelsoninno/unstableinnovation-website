# Unstable Innovation site — change log

This log is written by the operator (Nelson + Claude on his behalf).
It captures every non-trivial change made after launch. Newest at the top.

## 2026-07-07, Section 15 gate re-run (bilingual)

Site brought up to the current SEO + AI-findability standard (website-build reference, Section 15). Both languages.

**Foundations at repo root (Phase 1)**
- New favicon stack at root: favicon.ico (16/32/48), favicon-16x16, -32x32, -192x192, -512x512, apple-touch-icon (180), site.webmanifest.
- Every 25 HTML files updated to reference /favicon.ico etc. from root; fixes the broken 404.html favicon link.
- robots.txt rewritten to 2026 template: 3-category framework, deprecated anthropic-ai and cohere-ai removed, added OAI-SearchBot, Claude-SearchBot, Claude-User, Perplexity-User, DuckAssistBot, MistralAI-User, Applebot-Extended, Amazonbot, meta-externalagent.
- sitemap.xml rebuilt: 26 URLs, lastmod today, /faq/ + /es/faq/ registered, llms.txt + llms-full.txt listed.

**Em-dash sweep (Phase 2)**
- 296 em-dashes replaced with commas across every HTML file and both llms files. Zero remain in title, meta description, og:title, twitter:title, H1, or body copy.

**H1 accessibility (Phase 3)**
- / and /es/ H1s now carry aria-label. document.querySelector('h1').textContent reads clean ('Become an innovator & transform your life today!' / 'Conviértete en innovador y transforma tu vida hoy') instead of the run-on 'innovator&' / 'innovadory' bug.

**Structured data (Phase 4)**
- Every one of 22 indexable pages now carries valid JSON-LD @graph. Cross-linked via @id: #person (nelsoninno.com), #book, #website, #service-catalog, #organization (WeSpark).
- New OfferCatalog node (@id nelsoninno.com/#service-catalog) enumerates Nelson's three consulting services as Service items: AI education/training/implementation, Bitcoin education/implementation, innovation & technology transformation.
- Thank-you pages remain schema-less (noindex, correct).

**'Work with Nelson' visible surface (Phase 5)**
- New dark-themed section on / and /es/ after the About-the-author block, naming the ICP (enterprise + government innovation, digital-transformation, technology teams) and the three service areas. LinkedIn CTA.
- LinkedIn stated as the only channel Nelson uses for engagement inquiries. No email surfaced (per explicit instruction).
- New .split-thirds CSS class for the 3-column layout.

**Meta descriptions (Phase 6)**
- All 22 indexable pages rewritten to 129-151 chars, buyer-outcome or intent-phrase first, one concrete proof, light CTA where natural, no em-dashes.

**llms.txt / llms-full.txt (Phase 7)**
- Em-dashes stripped.
- New 'Work with Nelson' section added to both files: three service areas, ICP, proof points, LinkedIn as the only contact channel.
- Librería Internacional (every shop in El Salvador) added as a paperback distribution channel.
- /faq/ added to Core pages in llms.txt.

**FAQ pages (Phase 8)**
- New /faq/index.html and /es/faq/index.html with 8 direct-answer Q&As covering the book, formats, purchase (including Librería Internacional in El Salvador), Nelson's background, and enterprise/government consulting engagements.
- Visible on-page HTML AND FAQPage JSON-LD (not schema-only). Every answer is direct-answer-first per GEO tactics.
- FAQ link added to the site footer in both languages via partials.js.

**Home-page hero eyebrow (Phase 8+)**
- Added a small discoverability-friendly pre-headline above the H1 on / and /es/. EN: 'Unstable Innovation, a book about innovation, entrepreneurship, and philosophy'. ES: 'Innovación Inestable, un libro sobre innovación, emprendimiento y filosofía'. Styled via .hero__eyebrow.

**Librería Internacional (El Salvador retail)**
- New dedicated section on /buy/ and /es/buy/ pointing Salvadoran buyers to every Librería Internacional shop.
- Added to llms.txt (one-line mention) and llms-full.txt (new 'Where to buy the paperback' section).
- Added to FAQ Q5 in both languages.

Cache busters bumped: styles.css v8 -> v10, partials.js v7 -> v9.

Commits: 68140ef (Section 15 gate part 1), a64e7f1 (Section 15 gate part 2), plus the final commit landing the FAQ pages + eyebrow + Librería Internacional.

