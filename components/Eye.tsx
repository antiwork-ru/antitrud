'use client';

import { useEffect, useRef } from 'react';

export const Eye = () => {
    const eyeRef = useRef<HTMLDivElement>(null);

    const pupilRef = useRef<SVGGElement>(null);
    const whiteRef = useRef<SVGGElement>(null);
    const shineRef = useRef<SVGGElement>(null);
    const shellRef = useRef<SVGGElement>(null);

    const current = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let raf = 0;

        const handleMouseMove = (e: MouseEvent) => {
            if (!eyeRef.current) return;

            const rect = eyeRef.current.getBoundingClientRect();

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;

            const distance = Math.hypot(dx, dy);
            const maxMove = 7;

            if (distance > 0) {
                target.current.x = (dx / distance) * maxMove;
                target.current.y = (dy / distance) * maxMove;
            }
        };

        const animate = () => {
            // более мягкий easing (лучше чем 0.08 в большинстве UI случаев)
            const ease = 0.12;

            current.current.x += (target.current.x - current.current.x) * ease;
            current.current.y += (target.current.y - current.current.y) * ease;

            const x = current.current.x;
            const y = current.current.y;

            // Вся глазная масса (очень лёгкое движение)
            if (shellRef.current) {
                shellRef.current.style.transform = `translate(${x * 0.03}px, ${y * 0.03}px)`;
            }

            // Белок
            if (whiteRef.current) {
                whiteRef.current.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
            }

            // Зрачок
            if (pupilRef.current) {
                pupilRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }

            // Блик (чуть более “инертный”)
            if (shineRef.current) {
                shineRef.current.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
            }

            raf = requestAnimationFrame(animate);
        };

        animate();
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div ref={eyeRef} className="relative h-full w-full">
            <svg
                viewBox="0 0 100 100"
                className="h-full w-full"
                shapeRendering="geometricPrecision"
            >
                <defs>
                    <clipPath id="eye-clip">
                        <circle cx="50" cy="50" r="25" />
                    </clipPath>
                </defs>

                {/* Внешняя оболочка */}
                <g ref={shellRef}>
                    <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="#000"
                        stroke="#000"
                        strokeWidth="0.6"
                    />
                </g>

                {/* Внутренние элементы */}
                <g clipPath="url(#eye-clip)">
                    {/* Белок */}
                    <g ref={whiteRef}>
                        <circle cx="50" cy="50" r="22" fill="white" />
                    </g>

                    {/* Зрачок */}
                    <g ref={pupilRef}>
                        <circle cx="50" cy="50" r="11" fill="black" />
                    </g>

                    {/* Блик */}
                    <g ref={shineRef}>
                        <circle
                            cx="50"
                            cy="50"
                            r="5"
                            fill="red"
                            fillOpacity="0.9"
                        />
                    </g>
                </g>
            </svg>
        </div>
    );
};