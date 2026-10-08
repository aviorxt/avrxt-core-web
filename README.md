# Core Web

A production-minded, monochrome personal website starter built with Next.js. It includes a portfolio-style home page, profile, gallery, docs, contact and newsletter flows, optional Spotify data, useful public tools, responsive motion, social previews, legal templates, and secure baseline headers.

This repository contains neutral example content only. Replace the placeholders, review every policy, and enable only the integrations you need.

## Highlights

- Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS 4
- Responsive dark UI with reduced-motion support
- Configurable profile, metadata, social links, sitemap, and Open Graph images
- Network, DNS, email, typography, quote, and keyboard-test tools
- Optional Supabase, Cloudflare R2/Workers, Resend, Spotify, Razorpay, and status-page integrations
- CSP and browser security headers, input validation, rate limiting, and private-network protections
- Vercel Analytics and Speed Insights components included

## Quick start

```bash
git clone YOUR_REPOSITORY_URL
cd core-web
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`. The site works with neutral defaults; integrations remain inactive until configured.

## Make it yours

1. Edit the public values in `.env.local`.
2. Replace `public/brand-mark.svg` with your own mark.
3. Update `src/lib/site-config.ts` and `src/lib/me-config.ts` defaults if desired.
4. Rewrite the example About, Uses, Contact, and legal pages.
5. Remove routes and dependencies you do not need.
6. Review `next.config.ts`, especially CSP sources, before deploying.

See [CUSTOMIZATION.md](docs/CUSTOMIZATION.md) for the detailed checklist and [DEPLOYMENT.md](docs/DEPLOYMENT.md) for production guidance.

## Commands

```bash
npm run dev       # local development
npm run lint      # ESLint
npm run build     # production build
npm run start     # serve the production build
npm audit         # dependency advisory check
```

## Public tools

- `/tools/whatismyip` — request and network details
- `/tools/portcheck` — guarded single-port TCP reachability checks for authorized public hosts
- `/tools/mailfy` — email syntax and MX diagnostics
- `/tools/dns` — DNS-over-HTTPS and registration summaries
- `/tools/fontui` — font previews from the Google Fonts catalog
- `/tools/spotmp3` — official Spotify embeds only; no downloading or media conversion
- `/tools/quote` — random quote viewer
- `/tools/keytest` — interactive keyboard testing

Results are informational. Network-facing tools reject private or reserved destinations and should not be presented as security guarantees.

## Security

Never commit `.env.local` or real credentials. Rotate any secret that is accidentally exposed. Review [SECURITY.md](SECURITY.md) before opening a public deployment and keep framework and integration dependencies current.

## License

MIT. Third-party icons, fonts, services, and content retain their respective licenses and terms.
