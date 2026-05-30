"use client";

import { useState } from "react";
import { news } from "../../data/news";
import Link from "next/link";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

export function NewsList() {
    const [activeTag, setActiveTag] = useState<string | null>(null);

    // Собираем все уникальные теги и сортируем по алфавиту
    const allTags = Array.from(
        new Set(news.flatMap((item) => item.tags))
    ).sort((a, b) => a.localeCompare(b, "ru"));

    // Фильтруем и сортируем новости
    const filtered = activeTag
        ? news.filter((item) => item.tags.includes(activeTag))
        : news;
    const sorted = [...filtered].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const handleTagClick = (tag: string) => {
        // Если кликнули по уже активному тегу — сбрасываем фильтр
        setActiveTag((prev) => (prev === tag ? null : tag));
    };

    return (
        <div className="bg-[color:var(--surface)]">
            <SiteHeader />
            <main className="max-w-2xl mx-auto px-4 py-8 ">
                {/* Кнопка «На главную» */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--accent)] hover:underline mb-6"
                >
                    ← На главную
                </Link>

                <h1 className="text-3xl font-bold mb-2">Новости</h1>
                <p className="text-neutral-500 mb-8 text-sm">
                    Что происходит в мире антитруда (антиработы), базового дохода и автоматизации
                </p>

                {/* Фильтры по тегам */}
                <div className="flex flex-wrap gap-2 mb-10">
                    <button
                        onClick={() => setActiveTag(null)}
                        className={`text-xs rounded px-2.5 py-1 transition-colors ${activeTag === null
                            ? "bg-neutral-800 text-white"
                            : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                            }`}
                    >
                        Все
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`text-xs rounded px-2.5 py-1 transition-colors ${activeTag === tag
                                ? "bg-neutral-800 text-white"
                                : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Список новостей */}
                <div className="flex flex-col gap-10">
                    {sorted.map((item) => (
                        <article key={item.slug} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                            {/* Картинка */}
                            {item.image && (
                                <div className="shrink-0 w-full sm:w-40 md:w-48">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-28 sm:h-32 object-cover rounded-lg mt-10"
                                        loading="lazy"
                                    />
                                </div>
                            )}

                            {/* Текст новости */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <time dateTime={item.date} className="text-xs text-neutral-400">
                                        {formatDate(item.date)}
                                    </time>
                                    <div className="flex gap-1 flex-wrap">
                                        {item.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs bg-neutral-100 text-neutral-500 rounded px-2 py-0.5"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <Link href={`/news/${item.slug}`} className="group">
                                    <h2 className="text-lg font-semibold group-hover:underline mb-1">
                                        {item.title}
                                    </h2>
                                </Link>
                                <p className="text-sm text-neutral-600 leading-relaxed">
                                    {item.summary}
                                </p>
                                {item.source && (
                                    <p className="text-xs text-neutral-400 mt-2">
                                        Источник:{" "}
                                        {item.sourceUrl ? (
                                            <a
                                                href={item.sourceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline"
                                            >
                                                {item.source}
                                            </a>
                                        ) : (
                                            item.source
                                        )}
                                    </p>
                                )}
                                <Link
                                    href={`/news/${item.slug}`}
                                    className="text-xs mt-2 inline-block underline text-neutral-500"
                                >
                                    Читать →
                                </Link>
                            </div>
                        </article>
                    ))}

                </div>
            </main>
            <SiteFooter />
        </div>
    );
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}