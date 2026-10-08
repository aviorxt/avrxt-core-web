export function getSpotifyRedirectUri(requestUrl: string) {
  const configured = process.env.SPOTIFY_REDIRECT_URI?.trim();
  if (configured) return configured;
  const request = new URL(requestUrl);
  if (request.hostname === '127.0.0.1') return `${request.origin}/api/spotify/callback`;
  const siteOrigin = process.env.AUTH_CALLBACK_ORIGIN || 'https://example.com';
  return new URL('/api/spotify/callback', siteOrigin).toString();
}
