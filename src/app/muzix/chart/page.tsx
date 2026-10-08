import { buildPageMetadata } from '@/lib/page-metadata';
import MuzixChartClient from './MuzixChartClient';

export const metadata = buildPageMetadata({
  title: 'Muzix Chart — core-web’s Spotify Listening Dashboard',
  description: 'Explore core-web’s current Spotify track, public playlists, top artists, top songs, recent rotation, liked-song count, and monthly music capsule.',
  keywords: ['core-web muzix', 'yourhandle music', 'Spotify chart', 'top artists', 'top tracks', 'music capsule', 'now playing'],
  path: '/muzix/chart',
});

export default function MuzixChartPage() {
  return <MuzixChartClient />;
}
