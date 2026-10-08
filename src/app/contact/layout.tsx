import { buildPageMetadata } from '@/lib/page-metadata';

export const metadata = buildPageMetadata({
    title: 'Contact',
    description:
        "Direct uplink to core-web for technical consultations, project inquiries, or architectural discussions. Let's build something exceptional.",
    keywords: ['contact developer', 'technical consultation', 'hire core-web', 'software engineering help', 'get in touch'],
    path: '/contact',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
