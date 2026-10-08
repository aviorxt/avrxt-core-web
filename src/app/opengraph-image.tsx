import { ogContentType, ogSize, renderOgImage } from '@/lib/og-image';
import { getOgFonts } from '@/app/_og/fonts';

export const runtime = 'nodejs';
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const fonts = await getOgFonts();
  return renderOgImage(
    {
      title: 'core-web',
      description: 'Full Stack Developer & Tech Innovator',
    },
    { fonts }
  );
}
