"use client";

import { useMemo, useState, useDeferredValue, useCallback, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  BOOKS_BASE_URL,
  books,
  statusLabel,
  type Book,
  type BookStatus,
} from "../data/books";
import { Container } from "../components/Container";
import { cn } from "../lib/cn";
import { useDebouncedValue } from "../lib/useDebouncedValue";

// --- Константы ---
const statusOrder: Array<BookStatus | ""> = ["", "done", "wip", "edit", "pause"];

const sortOptions = [
  { value: "title-asc", label: "Название А–Я" },
  { value: "title-desc", label: "Название Я–А" },
  { value: "author-asc", label: "Автор А–Я" },
  { value: "author-desc", label: "Автор Я–А" },
  { value: "date-desc", label: "Сначала новые" },
  { value: "date-asc", label: "Сначала старые" },
] as const;

type SortOption = (typeof sortOptions)[number]["value"];
type ViewMode = "grid" | "list";

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

// --- Карточка книги с анимацией появления/перестроения ---
const BookCard = ({ book, viewMode, index }: { book: Book; viewMode: ViewMode; index: number }) => {
  const coverUrl = book.cover ? `${BOOKS_BASE_URL}${book.cover}` : null;
  const internalHref = book.slug ?? book.url ?? null;
  const href = internalHref ? `/books/${internalHref}` : null;

  const coverContent = (
    <>
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={book.ru}
          className="aspect-[2/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      ) : (
        <div className="flex aspect-[2/3] w-full items-center justify-center bg-neutral-50 text-3xl text-neutral-200">
          📖
        </div>
      )}
    </>
  );

  const InfoBlock = (
    <div className={cn("flex flex-col gap-2", viewMode === "list" && "flex-1")}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex flex-wrap gap-1">
          {book.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="rounded-full bg-[#EEEDFE] px-2 py-0.5 text-[10px] font-semibold text-[#3C3489]"
            >
              {t}
            </span>
          ))}
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium",
            statusBadgeClass(book.status)
          )}
        >
          {statusLabel[book.status]}
        </span>
      </div>

      {/* {book.status === "wip" && book.progress != null && (
        <div className="w-full bg-neutral-100 rounded-full h-1.5">
          <div
            className="bg-amber-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${book.progress}%` }}
          />
        </div>
      )} */}

      <div>
        <div className="text-[13px] font-bold leading-snug tracking-tight text-neutral-950">
          {href ? (
            <Link
              href={href}
              className="hover:text-[color:var(--accent)] transition-colors"
            >
              {book.ru}
            </Link>
          ) : (
            book.ru
          )}
        </div>
        <div className="mt-0.5 font-mono text-[11px] text-neutral-400">{book.authors}</div>
      </div>

      {/* <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
        {book.year && <span>{book.year}</span>}
        {book.rating && (
          <span className="inline-flex gap-0.5 text-amber-500 text-xs">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>{i < book.rating! ? "★" : "☆"}</span>
            ))}
          </span>
        )}
      </div> */}

      {(book.epub || book.pdf || book.tt) && (
        <div className="flex flex-wrap gap-1.5 pt-1 mt-auto">
          {book.epub && (
            <a
              href={book.epub}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-red-200 px-2 py-1 font-mono text-[10px] font-medium text-red-700 hover:bg-red-50 transition-colors"
            >
              EPUB
            </a>
          )}
          {book.pdf && (
            <a
              href={book.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-red-200 px-2 py-1 font-mono text-[10px] font-medium text-red-700 hover:bg-red-50 transition-colors"
            >
              PDF
            </a>
          )}
          {book.tt && (
            <a
              href={book.tt}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-emerald-200 px-2 py-1 font-mono text-[10px] font-medium text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              Teletype
            </a>
          )}
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: index * 0.03, // stagger
      }}
      className={cn(
        viewMode === "list"
          ? "flex gap-4 rounded-xl border border-[color:var(--border)] bg-white p-4 transition-shadow hover:border-neutral-300 hover:shadow-md hover:-translate-y-[2px]"
          : "overflow-hidden rounded-xl border border-[color:var(--border)] bg-white transition-shadow hover:border-neutral-300 hover:shadow-md hover:-translate-y-[2px]",
        "group"
      )}
    >
      {viewMode === "list" ? (
        <>
          <div className="w-16 sm:w-20 shrink-0 overflow-hidden rounded-lg">
            {href ? <Link href={href} className="block">{coverContent}</Link> : coverContent}
          </div>
          {InfoBlock}
        </>
      ) : (
        <>
          <div className="overflow-hidden">
            {href ? <Link href={href} className="block">{coverContent}</Link> : coverContent}
          </div>
          <div className="p-4">{InfoBlock}</div>
        </>
      )}
    </motion.div>
  );
};

// --- Основной компонент библиотеки ---
export function LibrarySection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [status, setStatus] = useState<BookStatus | "">((searchParams.get("status") as BookStatus) || "");
  const [tags, setTags] = useState<Set<string>>(() => new Set(searchParams.get("tags")?.split(",").filter(Boolean) || []));
  const [sort, setSort] = useState<SortOption>((searchParams.get("sort") as SortOption) || "date-desc");
  const [viewMode, setViewMode] = useState<ViewMode>((searchParams.get("view") as ViewMode) || "grid");

  const debouncedQuery = useDebouncedValue(query, 250);

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const okQuery = matchesQuery(b, debouncedQuery);
      const okStatus = !status || b.status === status;
      const okTags = tags.size === 0 || [...tags].every((t) => b.tags.includes(t));
      return okQuery && okStatus && okTags;
    });
  }, [debouncedQuery, status, tags]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "title-asc": return arr.sort((a, b) => a.ru.localeCompare(b.ru, "ru"));
      case "title-desc": return arr.sort((a, b) => b.ru.localeCompare(a.ru, "ru"));
      case "author-asc": return arr.sort((a, b) => a.authors.localeCompare(b.authors, "ru"));
      case "author-desc": return arr.sort((a, b) => b.authors.localeCompare(a.authors, "ru"));
      // case "date-desc": return arr.sort((a, b) => new Date(b.added || 0).getTime() - new Date(a.added || 0).getTime());
      // case "date-asc": return arr.sort((a, b) => new Date(a.added || 0).getTime() - new Date(b.added || 0).getTime());
      default: return arr;
    }
  }, [filtered, sort]);

  // Синхронизация URL
  const updateURL = useCallback(
    (newQuery: string, newStatus: string, newTags: Set<string>, newSort: string, newView: string) => {
      const params = new URLSearchParams();
      if (newQuery) params.set("q", newQuery);
      if (newStatus) params.set("status", newStatus);
      if (newTags.size) params.set("tags", [...newTags].join(","));
      if (newSort !== "date-desc") params.set("sort", newSort);
      if (newView !== "grid") params.set("view", newView);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname]
  );

  const setQueryAndSync = (v: string) => { setQuery(v); updateURL(v, status, tags, sort, viewMode); };
  const setStatusAndSync = (v: BookStatus | "") => { setStatus(v); updateURL(query, v, tags, sort, viewMode); };
  const toggleTag = (t: string) => {
    const next = new Set(tags);
    next.has(t) ? next.delete(t) : next.add(t);
    setTags(next);
    updateURL(query, status, next, sort, viewMode);
  };
  const clearTags = () => { setTags(new Set()); updateURL(query, status, new Set(), sort, viewMode); };
  const setSortAndSync = (v: SortOption) => { setSort(v); updateURL(query, status, tags, v, viewMode); };
  const setViewAndSync = (v: ViewMode) => { setViewMode(v); updateURL(query, status, tags, sort, v); };

  const allTags = useMemo(() => [...new Set(books.flatMap((b) => b.tags))].sort((a, b) => a.localeCompare(b, "ru")), []);

  const stats = useMemo(() => {
    const done = books.filter((b) => b.status === "done").length;
    const wip = books.filter((b) => b.status === "wip").length;
    const edit = books.filter((b) => b.status === "edit").length;
    return { total: books.length, done, inWork: wip + edit, shown: sorted.length };
  }, [sorted.length]);

  const randomBook = useCallback(() => {
    if (sorted.length === 0) return;
    const book = sorted[Math.floor(Math.random() * sorted.length)];
    const slug = book.slug ?? book.url;
    if (slug) router.push(`/books/${slug}`);
  }, [sorted, router]);

  return (
    <section id="biblioteka" className="py-8 sm:py-16">
      <Container>
        {/* Заголовок + статистика */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div>
            <div className="font-mono text-[11px] tracking-[0.1em] text-neutral-400 uppercase mb-2">Каталог</div>
            <h2 className="text-xl font-bold tracking-[-0.02em] text-neutral-950">Библиотека</h2>
          </div>

          <div className="flex items-center gap-1 bg-white border border-[color:var(--border)] rounded-lg p-1 divide-x divide-gray-200">
            {[
              { value: stats.total, label: "всего" },
              { value: stats.done, label: "готово" },
              { value: stats.inWork, label: "в работе" },
              { value: stats.shown, label: "показано" },
            ].map((s) => (
              <div key={s.label} className="px-4 py-2 text-center min-w-[64px]">
                <div className="text-base font-bold tracking-tight text-neutral-950 transition-all">{s.value}</div>
                <div className="font-mono text-[10px] tracking-[0.06em] text-neutral-400 uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Фильтры */}
        <div className="space-y-3 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Поиск */}
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M6.5 11a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM13 13l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQueryAndSync(e.target.value)}
                placeholder="Поиск по названию, автору…"
                className="h-10 w-full rounded-lg border border-[color:var(--border)] bg-white pl-9 pr-8 text-[13px] text-neutral-900 placeholder:text-neutral-400 outline-none transition-all focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
              />
              <AnimatePresence>
                {query && (
                  <motion.button
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setQueryAndSync("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    aria-label="Очистить поиск"
                  >
                    ×
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Сортировка */}
            <select
              value={sort}
              onChange={(e) => setSortAndSync(e.target.value as SortOption)}
              className="h-10 rounded-lg border border-[color:var(--border)] bg-white px-3 text-[12px] text-neutral-700 outline-none transition-all focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {/* Переключатель вида */}
            <div className="flex rounded-lg border border-[color:var(--border)] overflow-hidden">
              <button
                onClick={() => setViewAndSync("grid")}
                className={cn(
                  "p-2 transition-all duration-200",
                  viewMode === "grid" ? "bg-neutral-900 text-white shadow-inner" : "bg-white text-neutral-400 hover:text-neutral-700"
                )}
                aria-label="Сетка"
              >
                <motion.svg
                  width="16" height="16" viewBox="0 0 16 16" fill="currentColor"
                  animate={{ scale: viewMode === "grid" ? 1 : 0.9 }}
                >
                  <rect x="1" y="1" width="6" height="6" rx="1" />
                  <rect x="9" y="1" width="6" height="6" rx="1" />
                  <rect x="1" y="9" width="6" height="6" rx="1" />
                  <rect x="9" y="9" width="6" height="6" rx="1" />
                </motion.svg>
              </button>
              <button
                onClick={() => setViewAndSync("list")}
                className={cn(
                  "p-2 transition-all duration-200",
                  viewMode === "list" ? "bg-neutral-900 text-white shadow-inner" : "bg-white text-neutral-400 hover:text-neutral-700"
                )}
                aria-label="Список"
              >
                <motion.svg
                  width="16" height="16" viewBox="0 0 16 16" fill="currentColor"
                  animate={{ scale: viewMode === "list" ? 1 : 0.9 }}
                >
                  <rect x="1" y="2" width="14" height="3" rx="1" />
                  <rect x="1" y="7" width="14" height="3" rx="1" />
                  <rect x="1" y="12" width="14" height="3" rx="1" />
                </motion.svg>
              </button>
            </div>

            {/* Случайная книга */}
            <button
              onClick={randomBook}
              className="h-10 px-3 rounded-lg border border-[color:var(--border)] bg-white text-[12px] text-neutral-600 hover:bg-neutral-50 transition-all hover:shadow-sm active:scale-95"
              title="Случайная книга"
            >
              🎲
            </button>
          </div>

          {/* Фильтры по статусу */}
          <div className="flex flex-wrap gap-1.5">
            {statusOrder.map((s) => (
              <motion.button
                key={s || "all"}
                type="button"
                onClick={() => setStatusAndSync(s as BookStatus | "")}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "rounded-md border px-3 py-1.5 font-mono text-[11px] tracking-[0.04em] uppercase font-medium transition-all duration-200",
                  s === status
                    ? "border-neutral-900 bg-neutral-900 text-white shadow-sm"
                    : "border-[color:var(--border)] bg-white text-neutral-500 hover:border-neutral-400 hover:text-neutral-800 hover:shadow-sm"
                )}
              >
                {s === "" ? "Все" : s === "done" ? "Готово" : s === "wip" ? "В процессе" : s === "edit" ? "На редактуре" : "Пауза"}
              </motion.button>
            ))}
          </div>

          {/* Теги */}
          <div className="flex flex-wrap gap-1.5">
            {allTags.map((t) => {
              const on = tags.has(t);
              return (
                <motion.button
                  key={t}
                  type="button"
                  onClick={() => toggleTag(t)}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[12px] font-medium transition-all duration-200",
                    on
                      ? "border-red-300 bg-[color:var(--accent-subtle)] text-[color:var(--accent)] shadow-sm"
                      : "border-[color:var(--border)] bg-white text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 hover:shadow-sm"
                  )}
                >
                  {t}
                </motion.button>
              );
            })}
            {tags.size > 0 && (
              <button
                type="button"
                onClick={clearTags}
                className="rounded-full border border-dashed border-neutral-300 bg-white px-2.5 py-1 text-[12px] text-neutral-400 hover:border-neutral-400 hover:text-neutral-600 transition-all"
              >
                × Сбросить
              </button>
            )}
          </div>

          <div className="text-[11px] font-mono text-neutral-400">
            Показано {sorted.length} из {books.length}
          </div>
        </div>

        {/* Сетка / список с анимацией */}
        <div
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "flex flex-col gap-3"
          )}
        >
          {sorted.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full rounded-xl border border-[color:var(--border)] bg-white p-10 text-center"
            >
              <span className="text-4xl">📚</span>
              <p className="mt-3 font-mono text-[12px] text-neutral-400">
                Ничего не найдено — попробуйте изменить фильтры
              </p>
              <button
                onClick={() => {
                  setQueryAndSync("");
                  setStatusAndSync("");
                  clearTags();
                }}
                className="mt-4 inline-block rounded-lg border border-neutral-200 px-4 py-2 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                Сбросить все фильтры
              </button>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {sorted.map((b, i) => (
                <BookCard key={`${b.ru}-${b.authors}`} book={b} viewMode={viewMode} index={i} />
              ))}
            </AnimatePresence>
          )}
        </div>
      </Container>
    </section>
  );
}