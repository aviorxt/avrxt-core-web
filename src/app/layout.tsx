import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Inter, Outfit, Space_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import SiteChrome from '@/components/SiteChrome';
import CookieBanner from '@/components/CookieBanner';
import AskAi from '@/components/AskAi';
import { ogSize } from '@/lib/og-image';
import { siteConfig } from '@/lib/site-config';

const inter = Inter({ variable: '--font-sans', subsets: ['latin'] });
const spaceMono = Space_Mono({ variable: '--font-mono', subsets: ['latin'], weight: ['400', '700'] });
const outfit = Outfit({ variable: '--font-outfit', subsets: ['latin'] });
const instrumentSerif = Instrument_Serif({ variable: '--font-accent', subsets: ['latin'], weight: ['400'], style: ['italic'] });

const openGraphImage = { url: '/opengraph-image', width: ogSize.width, height: ogSize.height, alt: `${siteConfig.name} preview image` } as const;
const twitterImage = { ...openGraphImage, url: '/twitter-image' } as const;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: { default: `${siteConfig.author} | ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: ['personal website', 'portfolio', 'developer', 'design', 'web tools'],
  authors: [{ name: siteConfig.author, url: '/about' }],
  creator: siteConfig.author,
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  icons: { icon: '/brand-mark.svg', shortcut: '/brand-mark.svg', apple: '/brand-mark.svg' },
  openGraph: { title: `${siteConfig.author} | ${siteConfig.tagline}`, description: siteConfig.description, type: 'website', url: '/', siteName: siteConfig.name, locale: 'en_US', images: [openGraphImage] },
  twitter: { card: 'summary_large_image', title: `${siteConfig.author} | ${siteConfig.tagline}`, description: siteConfig.description, images: [twitterImage] },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#000000', colorScheme: 'dark' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${siteConfig.url}/#website`, url: `${siteConfig.url}/`, name: siteConfig.name, inLanguage: 'en' };
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${spaceMono.variable} ${outfit.variable} ${instrumentSerif.variable} theme-v7 font-sans bg-[#050505] text-white selection:bg-white/20 overflow-x-clip`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
        <SiteChrome position="before" />
        <main className="relative z-10 min-h-screen">{children}</main>
        <SiteChrome position="after" />
        <CookieBanner />
        <AskAi />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
