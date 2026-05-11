"use client";

import Link from "next/link";

export function QuizStrip() {
    return (
        <Link
            href="/quiz"
            className="group mt-8 flex items-center justify-between gap-4 rounded-xl border border-[color:var(--border)] bg-white px-5 py-4 hover:border-neutral-300 hover:shadow-sm transition-all"
        >
            <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--accent-subtle)] border border-red-100">
                    <span className="text-lg">🧠</span>
                </div>

                {/* Text */}
                <div>
                    <p className="text-[13px] font-semibold text-neutral-900 leading-snug">
                        Насколько трудовая этика отравила вам душу?
                    </p>
                    <p className="font-mono text-[11px] text-neutral-400 mt-0.5">
                        Тест · 8 вопросов · 2 минуты
                    </p>
                </div>
            </div>

            {/* Arrow */}
            <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border border-[color:var(--border)] text-neutral-400 group-hover:border-[color:var(--accent)] group-hover:text-[color:var(--accent)] transition-all">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M1 6.5h10M8 4l2.5 2.5L8 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </Link>
    );
}
