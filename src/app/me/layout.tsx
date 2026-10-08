import type { Metadata } from "next";

export const metadata: Metadata = {
    icons: { icon: '/brand-mark.svg' },
};

export default function MeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
