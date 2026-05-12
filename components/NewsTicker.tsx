"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { news } from "../data/news";

const DURATION = 6000;

export default function NewsTicker() {
    const sorted = [...news].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const [cur, setCur] = useState(0);
    const [exiting, setExiting] = useState<number | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const barRef = useRef<HTMLDivElement>(null);

    const go = (next: number) => {
        clearTimeout(timerRef.current);
        setExiting(cur);
        setTimeout(() => setExiting(null), 500);
        setCur(next);
    };

    useEffect(() => {
        // restart progress bar animation
        if (barRef.current) {
            barRef.current.style.transition = "none";
            barRef.current.style.width = "0%";
            requestAnimationFrame(() => {
                if (barRef.current) {
                    barRef.current.style.transition = `width ${DURATION}ms linear`;
                    barRef.current.style.width = "100%";
                }
            });
        }
        timerRef.current = setTimeout(
            () => setCur((c) => (c + 1) % sorted.length),
            DURATION
        );
        return () => clearTimeout(timerRef.current);
    }, [cur, sorted.length]);

    const item = sorted[cur];

    const fmt = (d: string) =>
        new Date(d).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    return (
        <div className="py-0">
            {/* label */}
            <p className="text-[11px] font-medium tracking-widest uppercase text-neutral-400 mb-2.5">
                новости
            </p>

            {/* main area */}
            <div className="border-t border-b border-neutral-100 py-3.5 min-h-[60px] relative overflow-hidden">
                {sorted.map((it, i) => (
                    <div
                        key={it.slug}
                        className={`
            transition-all duration-500
            ${i === cur ? "opacity-100 translate-y-0 relative pointer-events-auto" : ""}
            ${i !== cur && exiting !== i ? "opacity-0 translate-y-2.5 absolute inset-0 pointer-events-none" : ""}
            ${exiting === i ? "opacity-0 -translate-y-2.5 absolute inset-0 pointer-events-none" : ""}
          `}
                    >
                        <p className="text-[11px] text-neutral-400 mb-1 tabular-nums">
                            {fmt(it.date)}
                        </p>
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <span className="inline-flex gap-1 flex-wrap">
                                {it.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] px-1.5 py-0.5 rounded-sm bg-neutral-100 text-neutral-500 border border-neutral-200"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </span>
                            {/* Кликабельное название новости */}
                            <Link
                                href={`/news/${it.slug}`}
                                className="text-sm font-medium text-neutral-900 leading-snug hover:text-neutral-600 transition-colors"
                            >
                                {it.title}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* progress bar */}
            <div className="h-px bg-neutral-100 mt-3 overflow-hidden rounded-full">
                <div ref={barRef} className="h-full bg-neutral-400 w-0" />
            </div>

            {/* footer: dots + link */}
            <div className="flex items-center justify-between mt-2.5">
                <div className="flex gap-1.5">
                    {sorted.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => go(i)}
                            aria-label={`Новость ${i + 1}`}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === cur ? "bg-neutral-500" : "bg-neutral-200 hover:bg-neutral-300"
                                }`}
                        />
                    ))}
                </div>
                <Link
                    href="/news"
                    className="text-xs text-neutral-400 hover:text-neutral-600"
                >
                    все новости →
                </Link>
            </div>
        </div>
    );
}