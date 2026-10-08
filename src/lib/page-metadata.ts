import type { Metadata } from 'next';
import { ogSize } from '@/lib/og-image';
import { siteConfig } from '@/lib/site-config';

type PageMetadataInput = {
  title: string;
  description: string;
  keywords?: string[];
  noIndex?: boolean;
  path?: string;
};

function withSiteSuffix(title: string) {
  const normalized = title.trim();
  if (!normalized) return siteConfig.name;
  if (normalized.toLowerCase().includes(siteConfig.name.toLowerCase())) return normalized;
  return `${normalized} | ${siteConfig.name}`;
}

export function buildPageMetadata({
  title,
  description,
  keywords,
  noIndex,
  path,
}: PageMetadataInput): Metadata {
  const fullTitle = withSiteSuffix(title);
  const normalizedDescription = description.trim();

  const normalizedPath = path?.trim();
  const effectivePath = normalizedPath && normalizedPath.startsWith('/') ? normalizedPath : undefined;
  const canonicalUrl = effectivePath ? new URL(effectivePath, siteConfig.url).toString() : undefined;
  const ogVersion =
    process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) ||
    process.env.VERCEL_DEPLOYMENT_ID ||
    process.env.NEXT_PUBLIC_OG_VERSION ||
    'dev';

  const imageUrl = effectivePath
    ? `/api/og?${new URLSearchParams({ path: effectivePath, v: ogVersion }).toString()}`
    : '/opengraph-image';

  const openGraphImage = {
    url: imageUrl,
    width: ogSize.width,
    height: ogSize.height,
    alt: `${fullTitle} — social preview`,
  } as const;

  const metadata: Metadata = {
    title: fullTitle,
    description: normalizedDescription,
    keywords,
    authors: [{ name: siteConfig.author, url: '/about' }],
    creator: siteConfig.author,
    publisher: siteConfig.name,
    ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      title: fullTitle,
      description: normalizedDescription,
      type: 'website',
      siteName: siteConfig.name,
      locale: 'en_US',
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      images: [openGraphImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: normalizedDescription,
      images: [
        {
          url: imageUrl,
          width: ogSize.width,
          height: ogSize.height,
          alt: `${fullTitle} — social preview`,
        },
      ],
    },
  };

  return metadata;
}

