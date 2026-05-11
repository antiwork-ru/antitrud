"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BOOKS_BASE_URL,
  books,
  statusLabel,
  type Book,
  type BookStatus,
} from "../data/books";
import { Container } from "../components/Container";
import { cn } from "../lib/cn";

const statusOrder: Array<BookStatus | ""> = ["", "done", "wip", "edit", "pause"];

function statusBadgeClass(status: BookStatus) {
  switch (status) {
    case "done": return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "wip": return "bg-amber-50 text-amber-800 border-amber-200";
    case "edit": return "bg-sky-50 text-sky-800 border-sky-200";
    case "pause": return "bg-neutral-100 text-neutral-500 border-neutral-200";
  }
}

function matchesQuery(b: Book, q: string) {
  if (!q) return true;
  const s = q.toLowerCase();
  return (
    b.ru.toLowerCase().includes(s) ||
    b.authors.toLowerCase().includes(s) ||
    b.orig.toLowerCase().includes(s)
  );
}

export function LibrarySection() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<BookStatus | "">("");
  const [tags, setTags] = useState<Set<string>>(new Set());

  const allTags = useMemo(() => {
    return [...new Set(books.flatMap((b) => b.tags))].sort((a, b) =>
      a.localeCompare(b, "ru"),
    );
  }, []);

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const okQuery = matchesQuery(b, query);
      const okStatus = !status || b.status === status;
      const okTags = tags.size === 0 || [...tags].every((t) => b.tags.includes(t));
      return okQuery && okStatus && okTags;
    });
  }, [query, status, tags]);

  const stats = useMemo(() => {
    const done = books.filter((b) => b.status === "done").length;
    const wip = books.filter((b) => b.status === "wip").length;
    const edit = books.filter((b) => b.status === "edit").length;
    return { total: books.length, done, inWork: wip + edit, shown: filtered.length };
  }, [filtered.length]);

  return (
    <section id="biblioteka" className="py-8 sm:py-16">
      <Container>
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div>
            <div className="font-mono text-[11px] tracking-[0.1em] text-neutral-400 uppercase mb-2">
              Каталог
            </div>
            <h2 className="text-xl font-bold tracking-[-0.02em] text-neutral-950">
              Библиотека
            </h2>
          </div>

          {/* Stats pills */}
          <div className="flex items-center gap-1 bg-[color:var(--surface)] border border-[color:var(--border)] rounded-lg p-1 bg-white divide-x divide-gray-200">
            {[
              { value: stats.total, label: "всего" },
              { value: stats.done, label: "готово" },
              { value: stats.inWork, label: "в работе" },
              { value: stats.shown, label: "показано" },
            ].map((s) => (
              <div key={s.label} className="px-4 py-2 text-center min-w-[64px]">
                <div className="text-base font-bold tracking-tight text-neutral-950">{s.value}</div>
                <div className="font-mono text-[10px] tracking-[0.06em] text-neutral-400 uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-8">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M6.5 11a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM13 13l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по названию, автору или оригинальному названию…"
              className="h-10 w-full rounded-lg border border-[color:var(--border)] bg-white pl-9 pr-4 text-[13px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400 transition-colors"
            />
          </div>

          {/* Status filters */}
          <div className="flex flex-wrap gap-1.5">
            {statusOrder.map((s) => (
              <button
                key={s || "all"}
                type="button"
                onClick={() => setStatus(s as BookStatus | "")}
                className={cn(
                  "rounded-md border px-3 py-1.5 font-mono text-[11px] tracking-[0.04em] uppercase font-medium transition-all",
                  s === status
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-[color:var(--border)] bg-white text-neutral-500 hover:border-neutral-400 hover:text-neutral-800",
                )}
              >
                {s === "" ? "Все" : s === "done" ? "Готово" : s === "wip" ? "В процессе" : s === "edit" ? "На редактуре" : "Пауза"}
              </button>
            ))}
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap gap-1.5">
            {allTags.map((t) => {
              const on = tags.has(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() =>
                    setTags((prev) => {
                      const next = new Set(prev);
                      next.has(t) ? next.delete(t) : next.add(t);
                      return next;
                    })
                  }
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[12px] font-medium transition-all",
                    on
                      ? "border-red-300 bg-[color:var(--accent-subtle)] text-[color:var(--accent)]"
                      : "border-[color:var(--border)] bg-white text-neutral-500 hover:border-neutral-300 hover:text-neutral-700",
                  )}
                >
                  {t}
                </button>
              );
            })}
            {tags.size > 0 && (
              <button
                type="button"
                onClick={() => setTags(new Set())}
                className="rounded-full border border-dashed border-neutral-300 bg-white px-2.5 py-1 text-[12px] text-neutral-400 hover:border-neutral-400 hover:text-neutral-600 transition-all"
              >
                × Сбросить
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.length === 0 ? (
            <div className="col-span-full rounded-xl border border-[color:var(--border)] bg-white p-10 text-center font-mono text-[12px] text-neutral-400">
              Ничего не найдено — попробуйте изменить фильтры
            </div>
          ) : null}

          {filtered.map((b) => {
            const coverUrl = b.cover ? `${BOOKS_BASE_URL}${b.cover}` : null;
            const internalSlug = b.slug ?? b.url ?? null;
            const internalHref = internalSlug ? `/books/${internalSlug}` : null;

            return (
              <article
                key={`${b.ru}-${b.authors}`}
                className="group overflow-hidden rounded-xl border border-[color:var(--border)] bg-white transition-all hover:border-neutral-300 hover:shadow-sm"
              >
                {/* Cover */}
                {internalHref ? (
                  <Link href={internalHref} className="block ">
                    {coverUrl ? (
                      <img src={coverUrl} alt={b.ru} className="aspect-[2/3] w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="flex aspect-[2/3] w-full items-center justify-center bg-neutral-50 text-3xl text-neutral-200">📖</div>
                    )}
                  </Link>
                ) : coverUrl ? (
                  <img src={coverUrl} alt={b.ru} className="aspect-[2/3] w-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex aspect-[2/3] w-full items-center justify-center bg-neutral-50 text-3xl text-neutral-200">📖</div>
                )}

                {/* Info */}
                <div className="p-4 flex flex-col gap-2">
                  {/* Status + tags row */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex flex-wrap gap-1">
                      {b.tags.slice(0, 2).map((t) => (
                        <span key={t} className="rounded-full bg-[#EEEDFE] px-2 py-0.5 text-[10px] font-semibold text-[#3C3489]">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className={cn("shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium", statusBadgeClass(b.status))}>
                      {statusLabel[b.status]}
                    </span>
                  </div>

                  {/* Title & author */}
                  <div>
                    <div className="text-[13px] font-bold leading-snug tracking-tight text-neutral-950">
                      {internalHref ? (
                        <Link href={internalHref} className="hover:text-[color:var(--accent)] transition-colors">
                          {b.ru}
                        </Link>
                      ) : b.ru}
                    </div>
                    <div className="mt-0.5 font-mono text-[11px] text-neutral-400">{b.authors}</div>
                  </div>

                  {/* Download links */}
                  {(b.epub || b.pdf || b.tt) && (
                    <div className="flex flex-wrap gap-1.5 pt-1 mt-auto">
                      {b.epub && (
                        <a href={b.epub} target="_blank" rel="noopener noreferrer"
                          className="rounded border border-red-200 px-2 py-1 font-mono text-[10px] font-medium text-red-700 hover:bg-red-50 transition-colors">
                          EPUB
                        </a>
                      )}
                      {b.pdf && (
                        <a href={b.pdf} target="_blank" rel="noopener noreferrer"
                          className="rounded border border-red-200 px-2 py-1 font-mono text-[10px] font-medium text-red-700 hover:bg-red-50 transition-colors">
                          PDF
                        </a>
                      )}
                      {b.tt && (
                        <a href={b.tt} target="_blank" rel="noopener noreferrer"
                          className="rounded border border-emerald-200 px-2 py-1 font-mono text-[10px] font-medium text-emerald-700 hover:bg-emerald-50 transition-colors">
                          Teletype
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
