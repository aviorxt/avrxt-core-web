export interface MeLink { id: string; name: string; url: string; icon?: string; type: 'social' | 'external' | 'internal' }
export interface MeConfig {
  site?: { maintenanceEnabled: boolean };
  profile: { handle: string; bio: string; avatarUrl: string; logoUrl?: string; bannerUrl?: string; themeColor?: string; status?: { text: string; color: 'green' | 'yellow' | 'red' | 'blue' | 'purple' }; presence?: { mode: 'manual' | 'auto'; discordId?: string; serverTagEnabled?: boolean; badgesEnabled?: boolean; badgesMode?: 'auto' | 'manual'; badgesManual?: Record<string, boolean> }; location?: string; weatherEnabled?: boolean };
  music: { title: string; artist: string; coverUrl: string; audioUrl: string; youtubeVideoId?: string; spotifyEnabled?: boolean; spotifyAmbientEnabled?: boolean };
  links: MeLink[];
  gallery: { id: string; type: 'image' | 'video'; url: string; caption?: string }[];
  resources: { id: string; title: string; url: string; type: 'gallery' | 'doc' | 'post'; previewUrl?: string; meta?: string }[];
  widgets?: { quotesEnabled: boolean; notesEnabled: boolean; note?: { text: string; createdAt: string } };
}

export const defaultMeConfig: MeConfig = {
  site: { maintenanceEnabled: false },
  profile: {
    handle: process.env.NEXT_PUBLIC_AUTHOR_HANDLE || '@yourhandle',
    bio: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Designer, developer, and curious maker.',
    avatarUrl: '/brand-mark.svg',
    logoUrl: '/brand-mark.svg',
    themeColor: '#ffffff',
    status: { text: 'Available', color: 'green' },
    presence: { mode: 'manual', serverTagEnabled: false, badgesEnabled: false, badgesMode: 'manual', badgesManual: {} },
    location: process.env.NEXT_PUBLIC_AUTHOR_LOCATION || 'Your Location',
    weatherEnabled: false,
  },
  music: { title: 'Add a track', artist: 'Connect Spotify or edit this config', coverUrl: '', audioUrl: '', youtubeVideoId: '', spotifyEnabled: false, spotifyAmbientEnabled: false },
  links: [
    { id: '1', name: 'GitHub', url: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/yourhandle', icon: 'Github', type: 'social' },
    { id: '2', name: 'Instagram', url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/yourhandle', icon: 'Instagram', type: 'social' },
    { id: '3', name: 'Email', url: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@example.com'}`, icon: 'Mail', type: 'social' },
  ],
  gallery: [],
  resources: [
    { id: 'r1', title: 'Visual Gallery', url: '/gallery', type: 'gallery' },
    { id: 'r2', title: 'Documentation', url: '/docs', type: 'doc' },
  ],
  widgets: { quotesEnabled: true, notesEnabled: true, note: { text: 'Make this space your own.', createdAt: '2026-01-01T00:00:00.000Z' } },
};
