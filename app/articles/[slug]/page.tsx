// app/articles/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "../../../components/Container";
import { SiteFooter } from "../../../components/SiteFooter";
import { articles } from "../../../data/articles";
import { cn } from "../../../lib/cn";

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

// Static params for SSG
export function generateStaticParams() {
    return articles.map((a) => ({ slug: a.slug }));
}

// Dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);
    const pageUrl = `https://antitrud.vercel.app/articles/${slug}/`;
    if (!article) return {};
    return {
        title: `${article.title} – антитруд.`,
        description: article.description,
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title: article.title,
            description: article.description,
            url: pageUrl,
            images: [article.imageUrl],
        },
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);
    if (!article) notFound();

    const relatedArticles = (article.related ?? [])
        .map((slug) => articles.find((a) => a.slug === slug))
        .filter(Boolean) as typeof articles;

    return (
        <>
            {/* ─── Breadcrumb ──────────────────────────────────────── */}
            <nav
                aria-label="Breadcrumb"
                className="border-b border-[color:var(--border)] bg-white"
            >
                <Container>

                    <div className="flex items-center gap-2 py-3 font-mono text-[11px] text-neutral-400">
                        <Link href="/" className="hover:text-neutral-700 transition-colors">
                            Главная
                        </Link>
                        <span>›</span>
                        <Link href="/articles" className="hover:text-neutral-700 transition-colors">
                            Статьи
                        </Link>
                        <span>›</span>
                        <span className="text-neutral-600 truncate max-w-[200px] sm:max-w-none">
                            {article.title}
                        </span>
                    </div>
                </Container>
            </nav>

            {/* ─── Article wrap ─────────────────────────────────────── */}
            <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-12">
                <Link
                    href="/articles"
                    className="flex items-center font-mono text-[12px] tracking-[0.04em] text-neutral-400 hover:text-neutral-700 transition-colors uppercase hover:underline"
                >
                    ← Назад
                </Link>
            </div>

            <div className="py-8 sm:py-12 ">
                <Container>

                    <div className="mx-auto max-w-[720px]">

                        {/* ── Article header ──────────────────────────── */}
                        <header className="mb-8">
                            {/* Cover image */}
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-100 mb-6">
                                <Image
                                    src={article.imageUrl}
                                    alt={article.title}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 720px"
                                />
                            </div>

                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span
                                    className={cn(
                                        "rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium",
                                        typeBadgeClass(article.type)
                                    )}
                                >
                                    {article.typeLabel}
                                </span>
                                <span className="font-mono text-[11px] text-neutral-400">
                                    {article.dateLabel}
                                </span>
                                <span className="font-mono text-[11px] text-neutral-300">·</span>
                                <span className="font-mono text-[11px] text-neutral-400">
                                    {article.source}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-[clamp(1.4rem,3.5vw,2.2rem)] font-bold leading-[1.1] tracking-[-0.03em] text-neutral-950 mb-3">
                                {article.title}
                            </h1>

                            {/* Subtitle / lead */}
                            {article.subtitle && (
                                <p className="text-[15px] leading-relaxed text-neutral-500 font-light mb-5">
                                    {article.subtitle}
                                </p>
                            )}

                            {/* Info row: author / translator / original */}
                            {article.info && (
                                <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] text-neutral-500 border-t border-[color:var(--border)] pt-4">
                                    {article.info.author && (
                                        <div>
                                            <span className="text-neutral-400">Автор: </span>
                                            {article.info.author}
                                        </div>
                                    )}
                                    {article.info.translator && (
                                        <div>
                                            <span className="text-neutral-400">Перевёл: </span>
                                            {article.info.translator}
                                        </div>
                                    )}
                                    {article.info.originalUrl && (
                                        <div>
                                            <a
                                                href={article.info.originalUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[color:var(--accent)] hover:underline"
                                            >
                                                Читать оригинал →
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}
                        </header>

                        {/* ── Article body ────────────────────────────── */}
                        <article
                            className="rt"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* ── Source box ──────────────────────────────── */}
                        {article.externalUrl && (
                            <div className="mt-10 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <p className="font-mono text-[11px] text-neutral-400 uppercase tracking-[0.08em] mb-0">
                                        Материал опубликован на Teletype
                                    </p>
                                    {/* <p className="text-[13px] text-neutral-600">
                                        Оставить комментарий
                                    </p> */}
                                </div>
                                <a
                                    href={article.externalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-white px-4 py-2 font-mono text-[11px] text-emerald-700 hover:bg-emerald-50 transition-all"
                                >
                                    Teletype →
                                </a>
                            </div>
                        )}

                        {/* ── Related articles ────────────────────────── */}
                        {relatedArticles.length > 0 && (
                            <section className="mt-12">
                                <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-neutral-400 mb-4">
                                    Читать также
                                </p>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {relatedArticles.map((rel) => (
                                        <Link
                                            key={rel.slug}
                                            href={`/articles/${rel.slug}`}
                                            className="group flex gap-3 rounded-xl border border-[color:var(--border)] bg-white p-3 hover:border-neutral-300 hover:shadow-sm transition-all"
                                        >
                                            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                                                <Image
                                                    src={rel.imageUrl}
                                                    alt={rel.title}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                                                    sizes="96px"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center gap-1 min-w-0">
                                                <p className="text-[12px] font-semibold leading-snug tracking-tight text-neutral-900 line-clamp-2 group-hover:text-[color:var(--accent)] transition-colors">
                                                    {rel.title}
                                                </p>
                                                <p className="font-mono text-[10px] text-neutral-400">
                                                    {rel.typeLabel} · {rel.dateLabel}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>
                </Container>
            </div>

            {/* ─── Footer CTA ───────────────────────────────────────── */}
            <SiteFooter />
            {/* <div className="border-t border-[color:var(--border)] bg-[color:var(--surface)]">
                <Container>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-8">
                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-400 mb-1">
                                Новые книги и переводы
                            </p>
                            <p className="text-[15px] font-semibold text-neutral-900">
                                Не пропусти новые материалы
                            </p>
                            <p className="text-[13px] text-neutral-500 mt-0.5">
                                Подписывайся на Telegram: свежие переводы, статьи и обсуждение антитруда.
                            </p>
                        </div>
                        <a
                            href="https://t.me/antiwork_ru"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-[color:var(--accent)] px-5 py-2.5 font-mono text-[12px] font-medium text-white hover:bg-[color:var(--accent-hover)] transition-colors"
                        >
                            Подписаться →
                        </a>
                    </div>
                </Container>
            </div> */}
        </>
    );
}
