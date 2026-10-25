'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '../components/Container';

const EASE = [0.22, 1, 0.36, 1] as const;

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 14, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: EASE, delay },
});

export function Hero({ quote }: { quote: React.ReactNode }) {
  return (
    <div className="bg-[color:var(--surface)]">
      <section id="hero" className="relative">
        {/* Только нижний хайрлайн — разделитель секций.
                    Верхний не нужен: Headline уже отрисовал свой bottom-0. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-900/12 to-transparent"
        />

        <Container>
          {/* Плотный вертикальный ритм: это «action bar», а не второй hero */}
          <div className="flex flex-col items-center gap-4 py-8 sm:gap-5 sm:py-10 lg:py-12">
            <div className="relative isolate flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
              {/* Единственный штрих: тихое свечение ПОД рядом кнопок.
                                Локальное (inset-x-8), не фон на весь блок. */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-8 -top-6 -bottom-6 -z-10 opacity-80 blur-2xl sm:-inset-x-14"
                style={{
                  background:
                    'radial-gradient(ellipse 55% 90% at 30% 50%, color-mix(in oklab, var(--accent) 16%, transparent), transparent 70%)',
                }}
              />

              {/* Primary */}
              <motion.a
                {...enter(0.05)}
                href="#biblioteka"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:bg-[color:var(--accent)] sm:w-auto sm:px-5 sm:py-2.5"
              >
                <span className="relative z-10">Смотреть библиотеку</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path
                    d="M1 7h10M8 4l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                />
              </motion.a>

              {/* Secondary — снова плотный, без backdrop-blur:
                                он больше не лежит на градиентах, значит не нужен. */}
              <motion.div {...enter(0.13)} className="w-full sm:w-auto">
                <Link
                  href="/articles"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 sm:w-auto sm:px-5 sm:py-2.5"
                >
                  Читать статьи
                </Link>
              </motion.div>

              {/* Ghost */}
              <motion.a
                {...enter(0.21)}
                href="https://t.me/antiwork_ru"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-1.5 rounded-full px-6 py-3 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 sm:w-auto sm:px-4 sm:py-2.5"
              >
                <span>Telegram</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  <path
                    d="M2 10 10 2M4 2h6v6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            </div>


          </div>
        </Container>
      </section>
    </div>
  );
}