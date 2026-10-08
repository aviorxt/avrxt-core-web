'use client';

import { useState, useEffect } from 'react';

const phrases = ["API Development", "AI Automation", "Full Stack Solutions", "Cloud Infrastructure"];

export default function TypingText() {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(100);

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % phrases.length;
            const fullText = phrases[i];

            setText(
                isDeleting
                    ? fullText.substring(0, text.length - 1)
                    : fullText.substring(0, text.length + 1)
            );

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }

            setTypingSpeed(isDeleting ? 50 : 100);
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed]);

    return (
        <p className="text-xl md:text-2xl text-zinc-500 font-mono mb-12">
            <span className="text-white mr-2">➜</span>
            <span>{text}</span>
            <span className="animate-pulse">|</span>
        </p>
    );
}
