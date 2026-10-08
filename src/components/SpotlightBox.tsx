'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightBoxProps {
    children: React.ReactNode;
    className?: string;
}

export default function SpotlightBox({ children, className }: SpotlightBoxProps) {
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const box = boxRef.current;
        if (!box) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = box.getBoundingClientRect();
            box.style.setProperty('--x', `${e.clientX - rect.left}px`);
            box.style.setProperty('--y', `${e.clientY - rect.top}px`);
        };

        box.addEventListener('mousemove', handleMouseMove);
        return () => box.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={boxRef}
            className={cn(
                "resend-card spotlight-box rounded-[2rem] p-8 md:p-16 relative",
                "before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),_rgba(255,255,255,0.08)_0%,_transparent_50%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none",
                className
            )}
        >
            {children}
        </div>
    );
}
