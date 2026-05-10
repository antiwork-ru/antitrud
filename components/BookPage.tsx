"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { BOOKS_BASE_URL, statusLabel, type Book } from "../data/books";
import { Container } from "../components/Container";
import { cn } from "../lib/cn";

function statusBadgeClass(status: Book["status"]) {
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

interface BookPageProps {
  book: Book;
}

export function BookPage({ book }: BookPageProps) {
  const coverUrl = book.cover ? `${BOOKS_BASE_URL}${book.cover}` : null;

  return (
    <div className="min-h-screen bg-[color:var(--surface)]">
      {/* Back link */}
      <div className="border-b border-[color:var(--border)] bg-white">
        <Container>
          <div className="flex h-12 items-center">
            <Link
              href="/#biblioteka"
              className="flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M10 12L6 8l4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Назад к библиотеке
            </Link>
          </div>
        </Container>
      </div>

      <Container>
        {/* Hero */}
        <div className="py-10 sm:py-14">
          <div className="grid gap-8 sm:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
            {/* Cover */}
            <div className="flex justify-center sm:block">
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt={book.ru}
                  className="w-44 sm:w-full rounded-2xl shadow-xl object-cover"
                />
              ) : (
                <div className="flex w-44 sm:w-full aspect-[2/3] items-center justify-center rounded-2xl bg-neutral-100 text-5xl text-neutral-300 shadow-xl">
                  📖
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4">
              {/* Status + tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full border-[0.5px] px-2.5 py-1 text-xs font-bold",
                    statusBadgeClass(book.status),
                  )}
                >
                  {statusLabel[book.status]}
                </span>
                {book.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[#EEEDFE] px-2.5 py-1 text-xs font-semibold text-[#3C3489]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-neutral-950 sm:text-3xl lg:text-4xl">
                  {book.ru}
                </h1>
                <p className="mt-2 text-base text-neutral-500">{book.orig}</p>
                <p className="mt-1 text-sm font-semibold text-neutral-700">
                  {book.authors}
                </p>
              </div>

              {/* Description */}
              {book.description && (
                <p className="text-base leading-relaxed text-neutral-700">
                  {book.description}
                </p>
              )}

              {/* Download buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {book.epub && (
                  <a
                    href={book.epub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-800 transition hover:bg-red-100"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1v8M4 6l3 3 3-3M2 11h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    EPUB
                  </a>
                )}
                {book.pdf && (
                  <a
                    href={book.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-800 transition hover:bg-red-100"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1v8M4 6l3 3 3-3M2 11h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    PDF
                  </a>
                )}
                {book.tt && (
                  <a
                    href={book.tt}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
                  >
                    Читать на Teletype
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className="pb-16 grid gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* О книге */}
            {(book.about || book.bullets) && (
              <section className="rounded-2xl border border-[color:var(--border)] bg-white p-6 sm:p-8">
                <h2 className="text-lg font-extrabold text-neutral-950">О книге</h2>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-700">
                  {book.about?.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                {book.bullets && book.bullets.length > 0 && (
                  <ul className="mt-4 space-y-1.5">
                    {book.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {/* Pull quote */}
            {book.quote && (
              <blockquote className="rounded-2xl border-l-4 border-[color:var(--accent)] bg-white p-6 sm:p-8">
                <p className="text-base font-medium leading-relaxed text-neutral-800 italic">
                  {book.quote}
                </p>
              </blockquote>
            )}

            {/* Почему книга важна */}
            {book.whyImportant && book.whyImportant.length > 0 && (
              <section className="rounded-2xl border border-[color:var(--border)] bg-white p-6 sm:p-8">
                <h2 className="text-lg font-extrabold text-neutral-950">
                  Почему книга важна
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {book.whyImportant.map((item, i) => (
                    <li
                      key={i}
                      className="rounded-full border border-[color:var(--border)] bg-neutral-50 px-3 py-1.5 text-sm text-neutral-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Book details card */}
            <aside className="rounded-2xl border border-[color:var(--border)] bg-white p-6">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-neutral-400">
                Детали
              </h3>
              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="text-xs font-semibold text-neutral-400">Автор</dt>
                  <dd className="mt-0.5 text-sm font-medium text-neutral-800">{book.authors}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-neutral-400">Оригинальное название</dt>
                  <dd className="mt-0.5 text-sm text-neutral-700">{book.orig}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-neutral-400">Статус перевода</dt>
                  <dd className="mt-1">
                    <span
                      className={cn(
                        "rounded-full border-[0.5px] px-2.5 py-1 text-xs font-bold",
                        statusBadgeClass(book.status),
                      )}
                    >
                      {statusLabel[book.status]}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-neutral-400">Темы</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {book.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-[#EEEDFE] px-2.5 py-1 text-xs font-semibold text-[#3C3489]"
                      >
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </aside>

            {/* Related books */}
            {book.related && book.related.length > 0 && (
              <aside className="rounded-2xl border border-[color:var(--border)] bg-white p-6">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-neutral-400">
                  Связанные переводы
                </h3>
                <ul className="mt-4 space-y-2">
                  {book.related.map((rel) => (
                    <li key={rel.slug}>
                      <Link
                        href={`/books/${rel.slug}`}
                        className="group flex items-start gap-2 text-sm font-medium text-neutral-700 hover:text-[color:var(--accent)] transition-colors"
                      >
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300 group-hover:bg-[color:var(--accent)] transition-colors" />
                        {rel.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            {/* Read links */}
            {(book.epub || book.pdf || book.tt) && (
              <aside className="rounded-2xl border border-[color:var(--border)] bg-white p-6">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-neutral-400">
                  Читать
                </h3>
                <div className="mt-4 flex flex-col gap-2">
                  {book.epub && (
                    <a
                      href={book.epub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-800 hover:bg-red-50 transition-colors"
                    >
                      EPUB
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M1 7h10M8 4l3 3-3 3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  )}
                  {book.pdf && (
                    <a
                      href={book.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-800 hover:bg-red-50 transition-colors"
                    >
                      PDF
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M1 7h10M8 4l3 3-3 3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  )}
                  {book.tt && (
                    <a
                      href={book.tt}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-emerald-200 px-4 py-2.5 text-sm font-bold text-emerald-800 hover:bg-emerald-50 transition-colors"
                    >
                      Teletype
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M1 7h10M8 4l3 3-3 3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </aside>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
