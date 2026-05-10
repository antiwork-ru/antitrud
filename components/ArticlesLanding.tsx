"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "../components/Container";
import { GlossaryCard } from "../components/GlossaryCard";
import { articles } from "../data/articles";
import { cn } from "../lib/cn";

type Filter = "all" | "a" | "r" | "p" | "l" | "i";

const filters: Array<{ key: Filter; label: string; variant?: "red" }> = [
    { key: "all", label: "Все", variant: "red" },
    { key: "a", label: "Статьи" },
    { key: "r", label: "Доклады" },
    { key: "p", label: "Подкасты" },
    { key: "l", label: "Письма" },
    { key: "i", label: "Интервью" },
];

function typeBadgeClass(type: string) {
    switch (type) {
        case "a":
            return "bg-sky-50 text-sky-900 border-sky-200";
        case "r":
            return "bg-emerald-50 text-emerald-800 border-emerald-200";
        case "p":
            return "bg-amber-50 text-amber-900 border-amber-200";
        case "l":
            return "bg-violet-50 text-violet-900 border-violet-200";
        case "i":
            return "bg-red-50 text-red-800 border-red-200";
        default:
            return "bg-neutral-100 text-neutral-700 border-neutral-200";
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
            <section className="py-10 sm:py-7">
                <Container>
                    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white p-7 sm:p-10">
                            <div className="absolute inset-y-0 left-0 w-1.5 bg-[color:var(--accent)]" />
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
                                Статьи и публикации
                            </p>
                            <h1 className="mt-3 text-balance text-2xl font-extrabold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
                                Тексты об{" "}
                                <span className="text-[color:var(--accent)]">антитруде</span> — и
                                не только
                            </h1>
                            <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-neutral-600 sm:text-base">
                                Здесь собраны переводы статей, эссе, докладов и других коротких
                                текстов, а также оригинальные материалы о критике труда,
                                посттрудовом обществе, базовом доходе, автоматизации и прочих
                                вопросах.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {filters.map((f) => {
                                    const active = f.key === filter;
                                    return (
                                        <button
                                            key={f.key}
                                            type="button"
                                            onClick={() => setFilter(f.key)}
                                            className={cn(
                                                "rounded-full border px-4 py-2 text-sm font-semibold transition",
                                                active
                                                    ? f.variant === "red"
                                                        ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
                                                        : "border-neutral-950 bg-neutral-950 text-white"
                                                    : "border-[color:var(--border)] bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900",
                                            )}
                                        >
                                            {f.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <GlossaryCard />
                        </div>
                    </div>
                </Container>
            </section>

            <section className="pb-16">
                <Container>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
                        Все материалы
                    </p>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {items.length === 0 ? (
                            <div className="col-span-full rounded-2xl border border-[color:var(--border)] bg-white p-10 text-center text-sm text-neutral-500">
                                Материалов по этой категории пока нет.
                            </div>
                        ) : null}

                        {items.map((a) => (
                            <article
                                key={a.slug}
                                className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white transition hover:-translate-y-0.5 hover:border-neutral-300"
                            >
                                <Link href={`/articles/${a.slug}`}>
                                    <div className="relative aspect-[16/9] w-full bg-neutral-50">
                                        <Image
                                            src={a.imageUrl}
                                            alt={a.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 33vw"
                                        />
                                    </div>
                                </Link>

                                <div className="flex h-full flex-col gap-3 p-5">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span
                                            className={cn(
                                                "rounded-full border px-2.5 py-1 text-[11px] font-bold",
                                                typeBadgeClass(a.type),
                                            )}
                                        >
                                            {a.typeLabel}
                                        </span>
                                        <span className="text-xs text-neutral-500">
                                            {a.dateLabel}
                                        </span>
                                        <span className="text-xs text-neutral-400">· {a.source}</span>
                                    </div>

                                    <div className="text-sm font-bold leading-snug text-neutral-950">
                                        <Link href={`/articles/${a.slug}`} className="hover:underline">
                                            {a.title}
                                        </Link>
                                    </div>

                                    <p className="text-sm leading-relaxed text-neutral-600">
                                        {a.description}
                                    </p>

                                    <div className="mt-auto flex flex-wrap gap-2 pt-1">
                                        <Link
                                            className="inline-flex w-fit rounded-lg border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-800 hover:bg-neutral-50"
                                            href={`/articles/${a.slug}`}
                                        >
                                            Читать →
                                        </Link>
                                        {a.externalUrl ? (
                                            <a
                                                className="inline-flex w-fit rounded-lg border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
                                                href={a.externalUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Teletype →
                                            </a>
                                        ) : null}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </Container>
            </section>
        </>
    );
}
