# Core Web

A production-minded, open-source personal website starter built with Next.js. It combines an editorial portfolio, profile hub, documentation system, newsletter, optional Spotify dashboard, useful public tools, social preview generation, legal templates, and secure defaults in one monochrome interface.

The repository contains neutral placeholder content only. Fork it, replace the identity and policy copy, and enable only the integrations you need.

## Contents

- [Features](#features)
- [Technology](#technology)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Environment configuration](#environment-configuration)
- [Supabase setup](#supabase-setup)
- [Authentication and admin setup](#authentication-and-admin-setup)
- [Spotify setup](#spotify-setup)
- [Email and newsletter setup](#email-and-newsletter-setup)
- [Cloudflare R2 setup](#cloudflare-r2-setup)
- [Status and monitoring](#status-and-monitoring)
- [Deployment](#deployment)
- [Customization checklist](#customization-checklist)
- [Security](#security)
- [Troubleshooting](#troubleshooting)

## Features

### Pages and publishing

- Responsive home, About, Uses, Contact, Gallery, Profile, Subscribe, and legal pages
- Supabase-backed Markdown documentation with draft and published states
- Admin interfaces for profile configuration, documents, media, Spotify, and broadcasts
- Dynamic sitemap, robots file, canonical metadata, and per-route Open Graph images
- Cookie notice, Ask AI handoff, status badge, Vercel Analytics, and Speed Insights
- Accessible keyboard navigation, focus states, reduced-motion support, and mobile layouts

### Included browser tools

| Route | Purpose |
| --- | --- |
| `/tools/whatismyip` | Public IP, country, ISP, ASN, and request details |
| `/tools/portcheck` | Guarded TCP reachability check for authorized public hosts |
| `/tools/mailfy` | Email syntax, domain, and MX diagnostics |
| `/tools/dns` | DNS-over-HTTPS records and optional RDAP registration summary |
| `/tools/fontui` | Google Fonts previews with copy controls |
| `/tools/spotmp3` | Official Spotify embed playback; it does not download audio |
| `/tools/quote` | Random quote viewer |
| `/tools/keytest` | Interactive keyboard and RGB response tester |

Tool results are informational. The network routes reject private/reserved targets, validate inputs, limit body size, and apply rate limits.

## Technology

| Area | Tools |
| --- | --- |
| Application | Next.js 16 App Router, React 19, TypeScript |
| UI | Tailwind CSS 4, Framer Motion, Lucide, React Icons |
| Data | Supabase Postgres, Realtime, Row Level Security |
| Authentication | OpenAuth with optional Discord and GitHub providers |
| Storage | Optional Cloudflare R2 through the S3-compatible SDK |
| Email | Resend for subscriptions/broadcasts; optional Gmail SMTP contact relay |
| Music | Spotify Web API Authorization Code flow |
| Edge | Optional Cloudflare Workers for auth, API gateway, status/media helpers, and unsubscribe links |
| Observability | Vercel Analytics, Speed Insights, optional Better Stack |

## Requirements

For the base site:

- Node.js 20 or newer
- npm 10 or newer
- Git

For the full stack:

- A Supabase project
- A Vercel account or another Node.js-compatible host
- Optional accounts for Spotify, Resend, Cloudflare, Better Stack, Discord, GitHub OAuth, Gmail, and Razorpay
- Supabase CLI for migrations and Edge Functions
- Wrangler CLI (included as a dev dependency) for Cloudflare Workers

The static pages and tools can run without Supabase or any optional provider. Unconfigured integrations return safe empty or unavailable states.

## Quick start

```bash
git clone YOUR_FORK_URL
cd YOUR_REPOSITORY_DIRECTORY
npm install
```

Create your local environment file:

```bash
# macOS / Linux
cp .env.example .env.local

# Windows PowerShell
Copy-Item .env.example .env.local
```

Start development:

```bash
npm run dev
```

Open `http://localhost:3000`. For local Spotify OAuth, use `http://127.0.0.1:3000` and the redirect URI described below.

Before committing changes:

```bash
npm run lint
npm run build
npm audit --omit=dev
```

## Environment configuration

Copy `.env.example` to `.env.local`. Values prefixed with `NEXT_PUBLIC_` are exposed to browser code; never place a secret in them.

### Identity and metadata

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_NAME` | Yes | Display name used in navigation and metadata |
| `NEXT_PUBLIC_SITE_TAGLINE` | Yes | Short home-page statement |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | Yes | Default SEO and profile description |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical origin, with no trailing slash |
| `NEXT_PUBLIC_AUTHOR_NAME` | Yes | Public author name |
| `NEXT_PUBLIC_AUTHOR_HANDLE` | Yes | Public handle, including `@` if desired |
| `NEXT_PUBLIC_AUTHOR_LOCATION` | No | Location shown on the About/profile pages |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Yes | Public contact address |
| `NEXT_PUBLIC_GITHUB_URL` | No | Public GitHub profile |
| `NEXT_PUBLIC_INSTAGRAM_URL` | No | Public Instagram profile |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Google Search Console verification value |
| `NEXT_PUBLIC_OG_VERSION` | No | Cache-busting value for social images |

### Core services

| Variable | Required for | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Database features | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public reads | Supabase publishable/anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin writes | Server-only service-role key; never expose it |
| `OPENAUTH_ISSUER_URL` | Admin login | Deployed OpenAuth issuer URL |
| `NEXT_PUBLIC_OPENAUTH_CLIENT_ID` | Admin login | Client identifier shared with the auth worker |
| `AUTH_CALLBACK_ORIGIN` | OAuth | Public application origin used for callbacks |
| `NEXT_PUBLIC_API_URL` | API worker | Optional external API gateway origin |
| `NEXT_PUBLIC_EDGE_BASE_URL` | Edge helpers | Optional edge API origin |

### Optional integrations

The remaining variables are grouped and documented in `.env.example`: Spotify, R2, Resend/newsletter, Gmail SMTP, Razorpay, Better Stack, Discord, and YouTube. Leave an integration blank if you do not use it.

## Supabase setup

Supabase powers documents, editable profile configuration, Spotify token storage/history, newsletter unsubscribe tokens, and live playback status.

### 1. Create and link a project

Create a Supabase project and copy these values from its API settings into `.env.local`:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_OR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

The service-role key bypasses RLS. Keep it only in server-side environment settings and never commit it.

Authenticate and link the Supabase CLI:

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
```

### 2. Apply the database schema

Preview and apply the included migrations:

```bash
npx supabase db push --dry-run
npx supabase db push
```

The migrations create:

| Table | Purpose | Public access |
| --- | --- | --- |
| `documents` | Markdown articles, drafts, metadata, tags | Published rows are readable |
| `me_config` | Profile, links, gallery, widgets, maintenance state | Readable; service role writes |
| `spotify_tokens` | Spotify access and refresh tokens | No client access |
| `spotify_history` | Recently played track cache | No client access |
| `spotify_status` | Single-row live playback signal | Readable through RLS/Realtime |
| `newsletter_unsubscribe_tokens` | Hashed unsubscribe lookup tokens | No client access |

RLS is enabled on every table. Public users can read only published documents, profile configuration, and the playback status. Admin mutations use the service-role client after server-side authorization.

You can also run the SQL files in filename order through the Supabase Dashboard SQL editor if you do not use the CLI.

### 3. Realtime

The base migration adds `spotify_status` to the `supabase_realtime` publication. Confirm it appears under Database → Publications if live profile playback does not update.

### 4. Optional Spotify Edge Function

Set function secrets, then deploy:

```bash
npx supabase secrets set SPOTIFY_CLIENT_ID=YOUR_ID SPOTIFY_CLIENT_SECRET=YOUR_SECRET
npx supabase functions deploy v2-now-playing
```

Supabase automatically supplies `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to hosted Edge Functions. If you proxy the function through `cloudflare/edge-api`, set `SPOTIFY_NOW_PLAYING_UPSTREAM` to its public function URL.

### 5. Verify Supabase

Visit `/api/health` after deployment. The response reports whether Supabase, Spotify credentials, Resend, DNS, and the optional status provider are reachable.

## Authentication and admin setup

The protected `/me/admin`, `/docs/admin`, and broadcast interfaces use an OpenAuth issuer deployed as a Cloudflare Worker.

1. Replace domains, worker names, KV IDs, and placeholder values in `wrangler.jsonc`.
2. Create a Workers KV namespace and bind it as `OPENAUTH_STORAGE`.
3. Set `OPENAUTH_CLIENT_ID` to the same value as `NEXT_PUBLIC_OPENAUTH_CLIENT_ID`.
4. Set `ALLOWED_REDIRECT_HOSTS` to a comma-separated list of your production and local hostnames.
5. Create Discord and/or GitHub OAuth apps and register the callback URLs shown by your deployed issuer.
6. Add worker secrets:

```bash
npx wrangler secret put DISCORD_CLIENT_ID
npx wrangler secret put DISCORD_CLIENT_SECRET
npx wrangler secret put DISCORD_TOKEN
npx wrangler secret put DISCORD_GUILD_ID
npx wrangler secret put DISCORD_ROLE_ID
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

7. Put your Discord user ID in `DISCORD_ADMIN_USER_ID`. Admin authorization currently requires the authenticated Discord identity to receive `admin: true` from the issuer.
8. Deploy with `npm run auth:deploy`, then set `OPENAUTH_ISSUER_URL` in the web deployment.

If you do not need browser-admin features, remove the admin/auth routes and manage content directly in source or Supabase.

## Spotify setup

1. Create an app in the Spotify Developer Dashboard.
2. Add these exact redirect URIs:
   - Local: `http://127.0.0.1:3000/api/spotify/callback`
   - Production: `https://YOUR_DOMAIN/api/spotify/callback`
3. Set:

```dotenv
SPOTIFY_CLIENT_ID=YOUR_CLIENT_ID
SPOTIFY_CLIENT_SECRET=YOUR_CLIENT_SECRET
SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/api/spotify/callback
```

Use the production HTTPS callback in deployed environment variables. Spotify requires the redirect URI to match exactly and does not accept `localhost`; use the explicit `127.0.0.1` loopback address locally.

After OpenAuth and Supabase are working, sign in as the configured admin, open `/me/admin`, and connect Spotify. Tokens are stored only in the private `spotify_tokens` table. The requested scopes support current playback, playback state, recent tracks, top items, liked-song totals, and private/collaborative playlists.

## Email and newsletter setup

### Resend

1. Verify a sending domain in Resend.
2. Create an Audience and copy its ID.
3. Configure:

```dotenv
RESEND_API_KEY=re_...
RESEND_AUDIENCE_ID=...
RESEND_DEFAULT_FROM=Site Updates <newsletter@your-domain.com>
RESEND_FROM_DOMAINS=your-domain.com
NEWSLETTER_UNSUBSCRIBE_BASE_URL=https://unsub.your-domain.com
```

The Subscribe pages add contacts to the configured audience. The broadcast editor provisions per-contact unsubscribe tokens before sending. See `NEWSLETTER_BROADCASTS.md` for the operational flow.

### Unsubscribe worker

Edit `unsubscribe-worker/wrangler.jsonc`, replace the custom domain and rate-limit namespace IDs, set its three secrets, and deploy:

```bash
npx wrangler secret put SUPABASE_URL --config unsubscribe-worker/wrangler.jsonc
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY --config unsubscribe-worker/wrangler.jsonc
npx wrangler secret put RESEND_API_KEY --config unsubscribe-worker/wrangler.jsonc
npm run unsubscribe:deploy
```

### Contact form

The included contact relay uses Gmail SMTP. Create a Google app password and set:

```dotenv
ADMIN_GMAIL_ID=you@gmail.com
GMAIL_APP_PASSWORD=YOUR_APP_PASSWORD
```

For another provider, replace the Nodemailer transport in `src/app/api/contact/route.ts`.

## Cloudflare R2 setup

R2 is optional and supports profile/gallery uploads from the admin interface.

1. Create an R2 bucket and an API token with object read/write permissions for that bucket.
2. Attach a public custom domain or approved public delivery URL.
3. Configure the endpoint, credentials, bucket, and public media domains in `.env.local`.
4. Update and apply `cloudflare/r2-cors.json` to allow only your site origins.

```dotenv
R2_ENDPOINT=https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=...
NEXT_PUBLIC_R2_DOMAIN=https://cdn.your-domain.com
NEXT_PUBLIC_R2_IMAGE_DOMAIN=https://cdn.your-domain.com
NEXT_PUBLIC_R2_VIDEO_DOMAIN=https://cdn.your-domain.com
```

See `CLOUDFLARE_R2.md` for the upload path and CORS details.

## Status and monitoring

Set `NEXT_PUBLIC_STATUS_URL` to show a linked status badge. For Better Stack API-backed status details, also set `BETTERSTACK_API_KEY` and `BETTERSTACK_STATUS_PAGE_ID`. Leave all three blank to show the safe “integration optional” state.

`@vercel/analytics` and `@vercel/speed-insights` are already mounted in `src/app/layout.tsx`. They begin reporting after a Vercel deployment receives real page views and the products are enabled for the project.

## Deployment

### Vercel

1. Fork or import this repository into Vercel.
2. Add the environment variables for the features you enabled to Development, Preview, and Production as appropriate.
3. Set `NEXT_PUBLIC_SITE_URL` and `AUTH_CALLBACK_ORIGIN` to the final HTTPS origin.
4. Set the production Spotify callback to the exact deployed callback URL.
5. Deploy, then visit `/api/health`, `/robots.txt`, `/sitemap.xml`, and `/api/og?path=/`.
6. Add the final domain to OAuth allowlists, R2 CORS, worker origin allowlists, Resend, and your status provider.

Vercel builds with:

```bash
npm run build
```

No custom output directory is required.

### Other Node.js hosts

Use a Node.js runtime capable of running Next.js server routes:

```bash
npm install
npm run build
npm run start
```

A static export is not supported without removing or replacing dynamic API, authentication, sitemap, and social-image routes.

### Optional Cloudflare workers

The repository includes separate worker configurations for authentication, API gateway, edge helpers, and newsletter unsubscribe handling. Replace every `example.com` domain and every `replace-with-*` value before deployment. Keep production secrets in `wrangler secret`, not the JSON configuration files.

## Customization checklist

- Replace `public/brand-mark.svg` with a mark you own.
- Update all identity values in `.env.local`.
- Rewrite About, Uses, Contact, profile defaults, email templates, and legal policies.
- Search the repository for `example.com`, `yourhandle`, `Your Name`, and `replace-with-`.
- Remove unused routes, workers, dependencies, and environment variables.
- Review `next.config.ts` CSP sources and narrow them to the providers you use.
- Confirm every OAuth callback, CORS origin, public domain, and email sender.
- Test keyboard navigation, reduced motion, mobile breakpoints, and screen-reader labels.
- Validate metadata and previews on the final production domain.

More detail is available in [CUSTOMIZATION.md](docs/CUSTOMIZATION.md) and [DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Project structure

```text
src/app/                 Next.js pages, route handlers, metadata, sitemap
src/components/          Shared interface and tool components
src/lib/                 Integrations, validation, configuration, OG rendering
supabase/migrations/     Reproducible database schema and RLS policies
supabase/functions/      Optional Spotify now-playing Edge Function
auth-worker/             OpenAuth issuer
api-worker/              Optional public API gateway and AI email helper
unsubscribe-worker/      Newsletter unsubscribe service
cloudflare/              R2 CORS and edge helper examples
public/                  Replaceable public assets
docs/                    Extended customization and deployment notes
```

## Security

- Never commit `.env.local`, provider tokens, OAuth secrets, app passwords, or service-role keys.
- The Supabase service-role key must remain server-only.
- Review RLS after every schema change.
- Restrict CORS, CSP, OAuth callbacks, and worker allowed hosts to domains you control.
- Keep private-network protections in the port and link-preview tools.
- Run `npm audit --omit=dev` and update dependencies regularly.
- Replace `SECURITY.md` with a monitored private disclosure address before production use.

See [SECURITY.md](SECURITY.md) for the disclosure template.

## Troubleshooting

### The site builds, but docs/profile data are empty

Confirm all three Supabase variables are set and run `npx supabase db push`. The base UI intentionally falls back to neutral content when Supabase is absent.

### Admin pages redirect to login or unauthorized

Confirm the issuer is deployed, `OPENAUTH_ISSUER_URL` is correct, client IDs match, the callback hostname is allowed, and your Discord ID is configured as the admin identity.

### Spotify returns a callback or state error

Use the exact same redirect URI in Spotify and `SPOTIFY_REDIRECT_URI`. Use `127.0.0.1`, not `localhost`, for local Spotify OAuth. Begin the connection from `/me/admin` so the state cookie is created.

### Images upload but do not load

Check the public R2 domain, bucket CORS, CSP `img-src`/`media-src`, and that the generated object path begins with `i/` or `v/`.

### Newsletter subscription works but broadcasts cannot send

Verify the Resend audience, sending domain, allowed sender domains, unsubscribe worker, Supabase migration, and service-role access.

### CSP blocks a trusted provider

Add only the provider's documented origin to the narrowest relevant directive in `next.config.ts`. Do not add broad wildcards or untrusted sources.

## License

Released under the [MIT License](LICENSE). Third-party icons, fonts, services, and content retain their respective licenses and terms.

Contributions are welcome; see [CONTRIBUTING.md](CONTRIBUTING.md).
