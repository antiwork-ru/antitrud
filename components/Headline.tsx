'use client';

import { motion, type Variants } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

const line: Variants = {
    hidden: { opacity: 0, y: 36, filter: 'blur(14px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 1, ease: EASE },
    },
};

const HEADLINE =
    'text-[clamp(2.25rem,10.5vw,5.5rem)] font-bold leading-[1.08] tracking-[-0.03em] [word-spacing:-0.04em] text-neutral-950 [text-wrap:balance] sm:leading-[1.02] sm:tracking-[-0.035em]';

export default function Headline() {
    return (
        <div className="relative isolate overflow-hidden bg-[color:var(--surface)]">
            {/* ── Только сетка. Нейтральная, без блобов и прожектора ── */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.07] [color:#0a0a0a] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:48px_48px] sm:opacity-[0.08] sm:[background-size:64px_64px]"
                style={{
                    maskImage:
                        'radial-gradient(ellipse 90% 75% at 50% 40%, black 25%, transparent 95%)',
                    WebkitMaskImage:
                        'radial-gradient(ellipse 90% 75% at 50% 40%, black 25%, transparent 95%)',
                }}
            />

            {/* ── Верхний и нижний хайрлайны — рамка-разделитель ── */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-900/15 to-transparent"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-900/15 to-transparent"
            />

            <section className="relative mx-auto w-full max-w-[75rem] px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-12 lg:px-12 lg:pb-24 lg:pt-16">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="flex flex-col gap-1 sm:gap-3"
                >
                    {/* Надзаголовок */}
                    <motion.div
                        variants={line}
                        className="mb-5 inline-flex items-center gap-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-neutral-500 sm:mb-8 sm:gap-3 sm:text-xs sm:tracking-[0.3em]"
                    >
                        <span className="relative flex h-2 w-2 shrink-0">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--accent)] opacity-60 motion-reduce:animate-none" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                        </span>
                        <span className="whitespace-nowrap">Независимый проект</span>
                        <span className="hidden h-px w-10 bg-neutral-300 sm:block" aria-hidden />
                    </motion.div>

                    {/* Строка 1 */}
                    <motion.h1
                        variants={line}
                        className={`m-0 text-center md:self-start md:text-left ${HEADLINE}`}
                    >
                        Размышляем
                    </motion.h1>

                    {/* Строка 2 — акцент с рисующимся подчёркиванием */}
                    <motion.div
                        variants={line}
                        className={`relative self-center text-center ${HEADLINE}`}
                    >
                        <span className="relative inline-block">
                            <span className="relative z-10 text-[color:var(--accent)]">
                                о мире без работы
                            </span>
                            <svg
                                aria-hidden
                                viewBox="0 0 320 14"
                                preserveAspectRatio="none"
                                className="pointer-events-none absolute -bottom-[0.15em] left-0 h-[0.22em] w-full"
                                fill="none"
                            >
                                <motion.path
                                    d="M3 9 Q 80 2 160 7 T 317 6"
                                    stroke="var(--accent)"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 0.9 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.6, ease: EASE, delay: 0.8 }}
                                />
                            </svg>
                        </span>
                    </motion.div>

                    {/* Строка 3 */}
                    <motion.div
                        variants={line}
                        className={`text-center md:self-end md:text-right ${HEADLINE}`}
                    >
                        и нашем будущем
                    </motion.div>

                    {/* Мета-строка */}
                    <motion.div
                        variants={line}
                        className="mt-8 flex flex-col gap-2.5 border-t border-neutral-200/70 pt-5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-neutral-500 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-[0.7rem] sm:tracking-[0.22em]"
                    >
                        <span>Est. 2023</span>
                        <span className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-[color:var(--accent)]" />
                            Обновляется еженедельно
                        </span>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}