const normalizeUrl = (value: string) => value.replace(/\/$/, '');

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME?.trim() || 'Core Web',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE?.trim() || 'A personal corner of the web.',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION?.trim() || 'A polished, privacy-conscious personal website starter built with Next.js.',
  url: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:3000'),
  author: process.env.NEXT_PUBLIC_AUTHOR_NAME?.trim() || 'Your Name',
  handle: process.env.NEXT_PUBLIC_AUTHOR_HANDLE?.trim() || '@yourhandle',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'hello@example.com',
  location: process.env.NEXT_PUBLIC_AUTHOR_LOCATION?.trim() || 'Your Location',
  github: process.env.NEXT_PUBLIC_GITHUB_URL?.trim() || 'https://github.com/yourhandle',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || 'https://instagram.com/yourhandle',
  statusUrl: process.env.NEXT_PUBLIC_STATUS_URL?.trim() || '',
} as const;

export const absoluteUrl = (path = '/') => `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
