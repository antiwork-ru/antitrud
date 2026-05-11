"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "../components/Container";
import { GlossaryCard } from "../components/GlossaryCard";
import { articles } from "../data/articles";
import { cn } from "../lib/cn";
import { motion } from 'framer-motion';

type Filter = "all" | "a" | "r" | "p" | "l" | "i";

const filters: Array<{ key: Filter; label: string }> = [
    { key: "all", label: "Все" },
    { key: "a", label: "Статьи" },
    { key: "r", label: "Доклады" },
    { key: "p", label: "Подкасты" },
    { key: "l", label: "Письма" },
    { key: "i", label: "Интервью" },
];

function typeBadgeClass(type: string) {
    switch (type) {
        case "a": return "bg-sky-50 text-sky-800 border-sky-200";
        case "r": return "bg-emerald-50 text-emerald-800 border-emerald-200";
        case "p": return "bg-amber-50 text-amber-800 border-amber-200";
        case "l": return "bg-violet-50 text-violet-800 border-violet-200";
        case "i": return "bg-red-50 text-red-800 border-red-200";
        default: return "bg-neutral-100 text-neutral-600 border-neutral-200";
    }
}

export function ArticlesLanding() {
    const [filter, setFilter] = useState<Filter>("all");

    const items = useMemo(() => {
        if (filter === "all") return articles;
        return articles.filter((a) => a.type === filter);
    }, [filter]);

    return (
        <>
            {/* ─── Page header ─────────────────────────────────────── */}
            <section className="border-b border-[color:var(--border)]">
                <Container>
                    <div className="pt-6 pb-7 sm:pt-6 sm:pb-16">
                        {/* Meta */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="font-mono text-[11px] tracking-[0.1em] text-neutral-400 uppercase">
                                Статьи и публикации
                            </span>
                            <span className="h-px w-6 bg-neutral-200" />
                        </div>

                        {/* Headline + glossary */}
                        <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-16">
                            <div>
                                <h1 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-neutral-950">
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                        className="text-[clamp(2rem,5vw,3.75rem)] text-center md:text-left md:self-start w-full md:w-auto"
                                    > Тексты об{" "}
                                        <em className="not-italic text-[color:var(--accent)]">
                                            антитруде
                                        </em>{" "}</motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.5 }}
                                        className="text-[clamp(2rem,5vw,3.75rem)] text-center md:text-left md:self-start w-full md:w-auto"
                                    > — и не только</motion.div>
                                </h1>

                                <p className="mt-5 max-w-[600px] text-[14px] leading-relaxed text-neutral-500 font-light">
                                    Переводы статей, эссе, докладов и других коротких текстов, а также
                                    оригинальные материалы о критике труда, посттрудовом обществе,
                                    базовом доходе и автоматизации.
                                </p>

                                {/* Filter buttons */}
                                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                                    {filters.map((f) => {
                                        const active = f.key === filter;
                                        return (
                                            <button
                                                key={f.key}
                                                type="button"
                                                onClick={() => setFilter(f.key)}
                                                className={cn(
                                                    // Добавьте w-full и h-full, чтобы кнопка занимала всю ячейку
                                                    "w-full h-full flex items-center justify-center",
                                                    "rounded-md border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.04em] uppercase font-medium transition-all",
                                                    active
                                                        ? f.key === "all"
                                                            ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
                                                            : "border-neutral-900 bg-neutral-900 text-white"
                                                        : "border-[color:var(--border)] bg-white text-neutral-500 hover:border-neutral-400 hover:text-neutral-800"
                                                )}
                                            >
                                                {f.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Glossary — sidebar on lg */}
                            <div className="hidden lg:block">
                                <GlossaryCard />
                            </div>
                        </div>
                    </div>
                </Container>
            </section >

            {/* ─── Articles grid ───────────────────────────────────── */}
            < section className="py-6 sm:py-12" >
                <Container>
                    <div className="flex items-center justify-between mb-6">
                        <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-neutral-400">
                            Все материалы
                        </div>
                        <div className="font-mono text-[11px] text-neutral-400">
                            {items.length} {items.length === 1 ? "материал" : "материалов"}
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {items.length === 0 ? (
                            <div className="col-span-full rounded-xl border border-[color:var(--border)] bg-white p-10 text-center font-mono text-[12px] text-neutral-400">
                                Материалов по этой категории пока нет.
                            </div>
                        ) : null}

                        {items.map((a) => (
                            <article
                                key={a.slug}
                                className="group overflow-hidden rounded-xl border border-[color:var(--border)] bg-white transition-all hover:border-neutral-300 hover:shadow-sm"
                            >
                                {/* Thumbnail */}
                                <Link href={`/articles/${a.slug}`}>
                                    <div className="relative aspect-[16/9] w-full bg-neutral-50 overflow-hidden">
                                        <Image
                                            src={a.imageUrl}
                                            alt={a.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                            sizes="(max-width: 1024px) 100vw, 33vw"
                                        />
                                    </div>
                                </Link>

                                <div className="flex flex-col gap-3 p-5">
                                    {/* Meta row */}
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium", typeBadgeClass(a.type))}>
                                            {a.typeLabel}
                                        </span>
                                        <span className="font-mono text-[11px] text-neutral-400">{a.dateLabel}</span>
                                        <span className="font-mono text-[11px] text-neutral-300">·</span>
                                        <span className="font-mono text-[11px] text-neutral-400">{a.source}</span>
                                    </div>

                                    {/* Title */}
                                    <div className="text-[13px] font-bold leading-snug tracking-tight text-neutral-950">
                                        <Link href={`/articles/${a.slug}`} className="hover:text-[color:var(--accent)] transition-colors">
                                            {a.title}
                                        </Link>
                                    </div>

                                    {/* Description */}
                                    <p className="text-[13px] leading-relaxed text-neutral-500 line-clamp-3">
                                        {a.description}
                                    </p>

                                    {/* Links */}
                                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                                        <Link
                                            href={`/articles/${a.slug}`}
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--border)] px-3 py-1.5 font-mono text-[11px] text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 transition-all"
                                        >
                                            Читать
                                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                                <path d="M1 5.5h8M6 3l2.5 2.5L6 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Link>
                                        {a.externalUrl && (
                                            <a
                                                href={a.externalUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 px-3 py-1.5 font-mono text-[11px] text-emerald-700 hover:bg-emerald-50 transition-all"
                                            >
                                                Teletype →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </Container>
            </section >
        </>
    );
}
