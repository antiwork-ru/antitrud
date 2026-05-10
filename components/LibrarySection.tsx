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
    case "done":
      return "bg-emerald-50 text-emerald-800 border-emerald-200";
    case "wip":
      return "bg-amber-50 text-amber-900 border-amber-200";
    case "edit":
      return "bg-sky-50 text-sky-900 border-sky-200";
    case "pause":
      return "bg-neutral-100 text-neutral-700 border-neutral-200";
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
    <section id="biblioteka" className="py-14">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
              Библиотека
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Поиск, статусы и теги – чтобы быстро найти нужное.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="rounded-xl border border-[color:var(--border)] bg-white px-4 py-3 text-center">
              <div className="text-xl font-semibold text-neutral-950">
                {stats.total}
              </div>
              <div className="text-xs text-neutral-500">всего книг</div>
            </div>
            <div className="rounded-xl border border-[color:var(--border)] bg-white px-4 py-3 text-center">
              <div className="text-xl font-semibold text-neutral-950">
                {stats.done}
              </div>
              <div className="text-xs text-neutral-500">готово</div>
            </div>
            <div className="rounded-xl border border-[color:var(--border)] bg-white px-4 py-3 text-center">
              <div className="text-xl font-semibold text-neutral-950">
                {stats.inWork}
              </div>
              <div className="text-xs text-neutral-500">в работе</div>
            </div>
            <div className="rounded-xl border border-[color:var(--border)] bg-white px-4 py-3 text-center">
              <div className="text-xl font-semibold text-neutral-950">
                {stats.shown}
              </div>
              <div className="text-xs text-neutral-500">показано</div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию, автору или оригинальному названию…"
            className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-white px-4 text-sm outline-none focus:border-neutral-300"
          />

          <div className="flex flex-wrap gap-2">
            {statusOrder.map((s) => (
              <button
                key={s || "all"}
                type="button"
                onClick={() => setStatus(s as BookStatus | "")}
                className={cn(
                  "rounded-xl border px-3 py-2 text-sm font-semibold transition",
                  s === status
                    ? "border-neutral-400 bg-white text-neutral-950"
                    : "border-[color:var(--border)] bg-transparent text-neutral-600 hover:border-neutral-300 hover:bg-white",
                )}
              >
                {s === ""
                  ? "Все"
                  : s === "done"
                    ? "✓ Готово"
                    : s === "wip"
                      ? "⏳ В процессе"
                      : s === "edit"
                        ? "✏️ На редактуре"
                        : "⏸ Пауза"}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
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
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                    on
                      ? "border-red-200 bg-red-50 text-red-800"
                      : "border-[color:var(--border)] bg-white text-neutral-600 hover:border-neutral-300",
                  )}
                >
                  {t}
                </button>
              );
            })}

            {tags.size > 0 ? (
              <button
                type="button"
                onClick={() => setTags(new Set())}
                className="rounded-full border border-[color:var(--border)] bg-white px-3 py-1.5 text-xs font-semibold text-neutral-500 hover:border-neutral-300 hover:text-neutral-800"
              >
                Сбросить теги
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-[color:var(--border)] bg-white p-10 text-center text-sm text-neutral-500">
              Ничего не найдено – попробуйте изменить фильтры.
            </div>
          ) : null}

          {filtered.map((b) => {
            const coverUrl = b.cover ? `${BOOKS_BASE_URL}${b.cover}` : null;
            const internalSlug = b.slug ?? b.url ?? null;
            const internalHref = internalSlug ? `/books/${internalSlug}` : null;

            return (
              <article
                key={`${b.ru}-${b.authors}`}
                className="group overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white transition hover:-translate-y-0.5 hover:border-neutral-300"
              >
                {/* Cover */}
                {internalHref ? (
                  <Link href={internalHref} className="block">
                    {coverUrl ? (
                      <img
                        src={coverUrl}
                        alt={b.ru}
                        className="aspect-[2/3] w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex aspect-[2/3] w-full items-center justify-center bg-neutral-50 text-4xl text-neutral-300">
                        📖
                      </div>
                    )}
                  </Link>
                ) : coverUrl ? (
                  <img
                    src={coverUrl}
                    alt={b.ru}
                    className="aspect-[2/3] w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex aspect-[2/3] w-full items-center justify-center bg-neutral-50 text-4xl text-neutral-300">
                    📖
                  </div>
                )}

                <div className="flex flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {b.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-[#EEEDFE] px-2 py-1 text-[11px] font-semibold text-[#3C3489]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold",
                        statusBadgeClass(b.status),
                      )}
                    >
                      {statusLabel[b.status]}
                    </span>
                  </div>

                  <div>
                    <div className="text-sm font-bold leading-snug text-neutral-950">
                      {internalHref ? (
                        <Link href={internalHref} className="hover:underline">
                          {b.ru}
                        </Link>
                      ) : (
                        b.ru
                      )}
                    </div>
                    <div className="mt-1 text-sm text-neutral-500">
                      {b.authors}
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2 pt-1">
                    {b.epub ? (
                      <a
                        href={b.epub}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-800 hover:bg-red-50"
                      >
                        EPUB
                      </a>
                    ) : null}
                    {b.pdf ? (
                      <a
                        href={b.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-800 hover:bg-red-50"
                      >
                        PDF
                      </a>
                    ) : null}
                    {b.tt ? (
                      <a
                        href={b.tt}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
                      >
                        Teletype
                      </a>
                    ) : null}
                    {/* {internalHref && (
                      <Link
                        href={internalHref}
                        className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
                      >
                        О книге →
                      </Link>
                    )} */}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
