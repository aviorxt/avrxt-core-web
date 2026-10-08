# Customization checklist

## Identity

- Set every `NEXT_PUBLIC_*` identity value in `.env.local`.
- Replace `public/brand-mark.svg` and review accessible labels.
- Rewrite the home, About, Uses, Contact, profile, and email copy.
- Replace placeholder social links and remove unused networks.

## Content and features

- Seed your own documents and gallery entries, or remove Supabase-backed routes.
- Configure Spotify before enabling the music dashboard.
- Keep only the tools you are prepared to operate and support.
- Remove payment, Discord, newsletter, storage, and worker code when unused.

## Trust and compliance

- Rewrite all legal templates for your identity, location, services, and providers.
- Add a monitored security contact.
- Confirm cookie behavior and consent requirements for your jurisdiction.
- Check contrast, keyboard navigation, reduced motion, and multiple viewport sizes.

## Launch

- Set a production `NEXT_PUBLIC_SITE_URL`.
- Restrict CSP and CORS allowlists to origins you control.
- run `npm run lint`, `npm run build`, and `npm audit`.
- Validate metadata, `robots.txt`, `sitemap.xml`, and social previews.
