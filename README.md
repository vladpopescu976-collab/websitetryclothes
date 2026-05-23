# websitetryclothes

TryClothes marketing website for `try-clothes.com`.

## Structure

- `index.html` - static SEO-friendly page entry.
- `styles.bundle.css` - generated CSS file loaded by the site.
- `styles.css` - readable CSS entrypoint that mirrors the modular source files.
- `css/base.css` - design tokens, base styles, navigation, buttons.
- `css/hero-phone.css` - cinematic hero, 3D phone, scroll storytelling.
- `css/sections.css` - content sections, cards, FAQ, CTA, footer.
- `css/responsive.css` - reveal states, animations, responsive rules.
- `app.js` - custom scroll animation, reveal effects, waitlist form behavior.
- `assets/` - logo and image assets.

## Commands

- `node scripts/build-css.js` - regenerate `styles.bundle.css` from `css/*.css`.
- `node --check app.js && node scripts/validate-site.js` - validate JavaScript, JSON-LD, H1 coverage, and local references.

## Deployment Notes

- GitHub Pages serves only the static website. App/backend clients should call `https://api.try-clothes.com` directly; GitHub Pages cannot act as a real `/api/` reverse proxy.
