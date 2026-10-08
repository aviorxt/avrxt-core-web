# Deployment

## Vercel

Import the repository, add only the environment variables for enabled integrations, and deploy. Analytics and Speed Insights begin collecting after the deployed site receives traffic and the corresponding Vercel features are enabled.

## Other Node.js hosts

Use `npm run build` followed by `npm run start`. The host must support the Next.js runtime used by enabled routes.

## Optional edge services

Cloudflare Worker examples are included for authentication, API gateway, and unsubscribe flows. Rename each worker, configure secrets with the provider's secret store, restrict allowed origins, and test in a non-production account before deployment.

Never copy placeholder domains into production without reviewing every callback URL, CORS rule, CSP source, webhook, and email sender.
