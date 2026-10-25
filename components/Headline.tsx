'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

const wordReveal = {
    hidden: { y: '110%' },
    show: (i: number) => ({
        y: 0,
        transition: { duration: 0.95, ease: EASE, delay: 0.05 + i * 0.07 },
    }),
};

function Word({
    children,
    i,
    className = '',
}: {
    children: ReactNode;
    i: number;
    className?: string;
}) {
    return (
        <span className="inline-block overflow-hidden align-bottom pb-[0.15em] -mb-[0.15em]">
            <motion.span
                custom={i}
                variants={wordReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className={`inline-block ${className}`}
            >
                {children}
            </motion.span>
        </span>
    );
}

export default function Headline() {
    return (
        <div className="relative overflow-hidden bg-[var(--surface)]">
            {/* Noise overlay */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
            />

            {/* ↓ Только вертикальные отступы уменьшены; горизонтальные (px-6) не тронуты */}
            <section className="relative mx-auto w-full max-w-[75rem] px-6 py-12 md:py-16">
                {/* Top meta row */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="mb-10 flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.22em] text-neutral-500 md:mb-14"
                >
                    <div className="flex items-center gap-3">
                        <span className="inline-block size-1.5 rounded-full bg-[var(--accent)]" />
                        Независимый проект

                    </div>

                    <span className="hidden md:inline">Est. 2023 · ru</span>
                </motion.div>

                {/* Headline */}
                <h1 className="font-bold tracking-[-0.045em] text-neutral-950 text-[clamp(2.5rem,7.2vw,5.5rem)] leading-[0.95]">
                    <span className="block">
                        <Word i={0} className="text-transparent">
                            <span style={{ WebkitTextStroke: '1.5px #171717' }}>Размышляем</span>
                        </Word>
                    </span>

                    <span className="mt-2 block">
                        <Word i={1} className="text">
                            <span style={{ WebkitTextStroke: '1.5px #171717' }}>о мире-</span>
                        </Word>
                        <Word i={1} className="text">
                            <span style={{ WebkitTextStroke: '1.5px #171717', WebkitTextFillColor: 'red', color: 'red' }}>
                                без-работы
                            </span>
                        </Word>
                    </span>

                    <span className="mt-2 block text-neutral-300">
                        <Word i={3} className="text-transparent">
                            <span style={{ WebkitTextStroke: '1.5px #171717' }}>и нашем </span>
                        </Word>
                        &nbsp;
                        <Word i={4} className="text-transparent">
                            <span style={{ WebkitTextStroke: '1.5px #171717' }}>будущем</span>
                        </Word>
                    </span>
                </h1>

                {/* Bottom row */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
                    className="mt-12 flex flex-col gap-6 border-t border-neutral-200 pt-6 md:mt-16"
                >
                    <p className="w-full text-sm leading-relaxed text-neutral-500">
                        Книги и тексты на русском языке о критике труда, посттрудовом
                        обществе, базовом доходе и свободе от принудительной продуктивности, а также многом другом (и это «также» может превалировать): читаем, получаем удовольствие и меняем себя и мир вокруг.
                    </p>
                    {/* <div className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-neutral-500">
                        <span>Scroll</span>
                        <motion.span
                            animate={{ y: [0, 4, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            ↓
                        </motion.span>
                    </div> */}
                </motion.div>
            </section>
        </div>
    );
}