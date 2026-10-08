import type { Metadata } from 'next';
import { connection } from 'next/server';
import { getMeConfigAction } from '@/app/actions/me';
import { buildPageMetadata } from '@/lib/page-metadata';
import MeClient from './MeClient';

type PageProps = {
    searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    await Promise.resolve(searchParams ?? {});

    return buildPageMetadata({
        title: "Profile & Link's",
        description: "A configurable profile page for links, updates, resources, and optional live integrations.",
        keywords: ['profile', 'links', 'portfolio', 'personal website'],
        path: '/me',
    });
}

export default async function MePage() {
    // The profile action reads Supabase session cookies; keep it out of static prerendering.
    await connection();
    const config = await getMeConfigAction();
    return <MeClient config={config} />;
}
