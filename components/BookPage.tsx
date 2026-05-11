"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { BOOKS_BASE_URL, statusLabel, type Book } from "../data/books";
import { Container } from "../components/Container";
import { cn } from "../lib/cn";

function statusBadgeClass(status: Book["status"]) {
  switch (status) {
    case "done": return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "wip": return "bg-amber-50 text-amber-800 border-amber-200";
    case "edit": return "bg-sky-50 text-sky-800 border-sky-200";
    case "pause": return "bg-neutral-100 text-neutral-500 border-neutral-200";
  }
}

interface BookPageProps {
  book: Book;
}

export function BookPage({ book }: BookPageProps) {
  const coverUrl = book.cover ? `${BOOKS_BASE_URL}${book.cover}` : null;

  return (
    <div className="min-h-screen bg-[color:var(--surface)]">
      {/* Back nav */}
      <div className="border-b border-[color:var(--border)] bg-white">
        <Container>
          <div className="flex h-11 items-center">
            <Link
              href="/#biblioteka"
              className="flex items-center gap-1.5 font-mono text-[12px] tracking-[0.04em] text-neutral-400 hover:text-neutral-700 transition-colors uppercase"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Библиотека
            </Link>
          </div>
        </Container>
      </div>

      <Container>
        {/* Hero */}
        <div className="py-12 sm:py-16">
          <div className="grid gap-10 sm:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
            {/* Cover */}
            <div className="flex justify-center sm:block">
              {coverUrl ? (
                <img src={coverUrl} alt={book.ru} className="w-40 sm:w-full rounded-xl shadow-lg object-cover" />
              ) : (
                <div className="flex w-40 sm:w-full aspect-[2/3] items-center justify-center rounded-xl bg-neutral-100 text-4xl text-neutral-300 shadow-lg">📖</div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-5">
              {/* Status + tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn("rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium", statusBadgeClass(book.status))}>
                  {statusLabel[book.status]}
                </span>
                {book.tags.map((t) => (
                  <span key={t} className="rounded-full bg-[#EEEDFE] px-2.5 py-1 text-[12px] font-semibold text-[#3C3489]">
                    {t}
                  </span>
                ))}
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl font-bold leading-tight tracking-[-0.025em] text-neutral-950 sm:text-3xl lg:text-[2.5rem]">
                  {book.ru}
                </h1>
                <p className="mt-2 font-mono text-[12px] tracking-[0.02em] text-neutral-400">{book.orig}</p>
                <p className="mt-1.5 text-[14px] font-medium text-neutral-600">{book.authors}</p>
              </div>

              {book.description && (
                <p className="text-[15px] leading-relaxed text-neutral-600 max-w-xl">
                  {book.description}
                </p>
              )}

              {/* Download buttons */}
              <div className="flex flex-wrap gap-2">
                {book.epub && (
                  <a href={book.epub} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--foreground)] bg-[color:var(--foreground)] px-4 py-2.5 text-[13px] font-medium text-white hover:bg-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v8M3.5 6l3 3 3-3M1 11h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    EPUB
                  </a>
                )}
                {book.pdf && (
                  <a href={book.pdf} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--foreground)] bg-[color:var(--foreground)] px-4 py-2.5 text-[13px] font-medium text-white hover:bg-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v8M3.5 6l3 3 3-3M1 11h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    PDF
                  </a>
                )}
                {book.tt && (
                  <a href={book.tt} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--border)] bg-white px-4 py-2.5 text-[13px] font-medium text-neutral-700 hover:border-neutral-400 transition-colors">
                    Читать на Teletype →
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pb-16 grid gap-5 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2 flex flex-col gap-5 order-2 lg:order-none">
            {book.quote && (
              <blockquote className="rounded-xl border-l-[3px] border-[color:var(--accent)] bg-white p-7">
                <p className="text-[15px] font-normal leading-relaxed text-neutral-700 italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {book.quote}
                </p>
              </blockquote>
            )}
            {(book.about || book.bullets) && (
              <section className="rounded-xl border border-[color:var(--border)] bg-white p-7 sm:p-8">
                <h2 className="font-mono text-[11px] tracking-[0.1em] text-neutral-400 uppercase mb-4">О книге</h2>
                <div className="space-y-3 text-[14px] leading-relaxed text-neutral-700">
                  {book.about?.map((para, i) => <p key={i}>{para}</p>)}
                </div>
                {book.bullets && book.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {book.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[14px] text-neutral-700">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--accent)]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}



            {book.related && book.related.length > 0 && (
              <aside className="rounded-xl border border-[color:var(--border)] bg-white p-6">
                <h3 className="font-mono text-[11px] tracking-[0.1em] text-neutral-400 uppercase mb-4">Связанные переводы</h3>
                <ul className="space-y-2">
                  {book.related.map((rel) => (
                    <li key={rel.slug}>
                      <Link href={`/books/${rel.slug}`}
                        className="group flex items-start gap-2 text-[13px] font-medium text-neutral-600 hover:text-[color:var(--accent)] transition-colors">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-300 group-hover:bg-[color:var(--accent)] transition-colors" />
                        {rel.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}


          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4 order-1 lg:order-none ">
            <aside className="rounded-xl border border-[color:var(--border)] bg-white p-6">
              <h3 className="font-mono text-[11px] tracking-[0.1em] text-neutral-400 uppercase mb-4">Детали</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.08em] text-neutral-400 uppercase">Автор</dt>
                  <dd className="mt-1 text-[13px] font-medium text-neutral-800">{book.authors}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.08em] text-neutral-400 uppercase">Оригинал</dt>
                  <dd className="mt-1 text-[13px] text-neutral-600">{book.orig}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.08em] text-neutral-400 uppercase">Статус</dt>
                  <dd className="mt-1.5">
                    <span className={cn("rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium", statusBadgeClass(book.status))}>
                      {statusLabel[book.status]}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.08em] text-neutral-400 uppercase mb-1.5">Темы</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {book.tags.map((t) => (
                      <span key={t} className="rounded-full bg-[#EEEDFE] px-2.5 py-1 text-[11px] font-semibold text-[#3C3489]">{t}</span>
                    ))}
                  </dd>
                </div>
              </dl>
            </aside>



            {book.whyImportant && book.whyImportant.length > 0 && (
              <section className="rounded-xl border border-[color:var(--border)] bg-white p-7 sm:p-8 hidden lg:block">
                <h2 className="font-mono text-[11px] tracking-[0.1em] text-neutral-400 uppercase mb-4">Почему книга важна</h2>
                <ul className="flex flex-wrap gap-2">
                  {book.whyImportant.map((item, i) => (
                    <li key={i} className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1.5 text-[13px] text-neutral-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* {(book.epub || book.pdf || book.tt) && (
              <aside className="rounded-xl border border-[color:var(--border)] bg-white p-6">
                <h3 className="font-mono text-[11px] tracking-[0.1em] text-neutral-400 uppercase mb-4">Читать</h3>
                <div className="flex flex-col gap-2">
                  {book.epub && (
                    <a href={book.epub} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg border border-[color:var(--border)] px-4 py-2.5 text-[13px] font-medium text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 transition-all">
                      EPUB
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5h9M7 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </a>
                  )}
                  {book.pdf && (
                    <a href={book.pdf} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg border border-[color:var(--border)] px-4 py-2.5 text-[13px] font-medium text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 transition-all">
                      PDF
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5h9M7 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </a>
                  )}
                  {book.tt && (
                    <a href={book.tt} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-[13px] font-medium text-emerald-800 hover:bg-emerald-100 transition-all">
                      Teletype
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5h9M7 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </a>
                  )}
                </div>
              </aside>
            )} */}
          </div>
        </div>
      </Container>
    </div>
  );
}
