import { buildPageMetadata } from '@/lib/page-metadata';

export const metadata = buildPageMetadata({
  title: 'Gallery',
  description: 'A visual archive of moments, places, and artifacts from the digital frontier.',
  keywords: ['gallery', 'core-web', 'photos', 'visual archive'],
  path: '/gallery',
});

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

