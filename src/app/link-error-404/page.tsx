import type { Metadata } from 'next';
import MinimalErrorPage from '@/components/MinimalErrorPage';

export const metadata: Metadata = {
    title: 'Short Link Not Found — core-web',
    description: 'The requested go.example.com short link is unavailable.',
    robots: { index: false, follow: false },
};

export default function LinkError404Page() {
    return (
        <MinimalErrorPage
            code="404"
            title="Short Link Missing"
            message="It seems like you’re trying to open a go.example.com link. It may have been removed, expired, or the path may be incorrect."
            primaryHref="https://example.com/me"
            primaryLabel="Visit example.com/me"
            secondaryHref="mailto:connect@elvnx.org"
            secondaryLabel="connect@elvnx.org"
        />
    );
}
