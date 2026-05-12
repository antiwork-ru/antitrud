// app/news/[slug]/page.tsx
import { news } from "../../../data/news";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const item = news.find((n) => n.slug === slug);
    if (!item) return {};

    const canonical = `/news/${slug}`;
    // const ogImage = item.image ?? "/og-default.png"; если добавите поле image в данные новости

    return {
        title: `${item.title} — антитруд.`,
        description: item.summary,
        openGraph: {
            title: item.title,
            description: item.summary,
            type: "article",
            publishedTime: item.date,
            // authors: ["Антитруд"], // если нужно
            // images: Image ? [Image] : [],
        },
        alternates: {
            canonical,
        },
        robots: {
            index: true,
            follow: true,
            // если новость старая – можно запретить индексацию через поле в данных
        },
    };
}

export default async function NewsItemPage({ params }: Props) {
    const { slug } = await params;
    const item = news.find((n) => n.slug === slug);
    if (!item) notFound();

    const dateTime = item.date; // уже в ISO формате
    const formattedDate = new Date(item.date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    // Structured data (JSON-LD)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: item.title,
        description: item.summary,
        datePublished: item.date,
        // dateModified: ... если есть поле modified
        author: {
            "@type": "Organization",
            name: "антитруд.",
        },
        publisher: {
            "@type": "Organization",
            name: "антитруд.",
            // logo: { url: "https://.../logo.png" }
        },
        // image: item.image ?? undefined,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://ваш-домен/news/${slug}`,
        },
    };

    return (
        <>
            <SiteHeader />
            <main className="max-w-2xl mx-auto px-4 py-8">
                <Link
                    href="/news"
                    className="flex items-center font-mono text-[12px] tracking-[0.04em] text-neutral-400 hover:text-neutral-700 transition-colors uppercase hover:underline mb-8 inline-block"
                >
                    ← Все новости
                </Link>

                <div className="flex items-center gap-3 mb-4">
                    <time dateTime={dateTime} className="text-xs text-neutral-400">
                        {formattedDate}
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

                <h1 className="text-2xl font-bold mb-6 leading-snug">{item.title}</h1>

                {item.image && (
                    <div className="my-6 rounded-xl overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-auto max-h-96 object-cover"
                            loading="lazy"
                        />
                    </div>
                )}

                <div className="prose prose-sm prose-neutral max-w-none">
                    {item.content.split('\n\n').map((para, i) => (
                        <p
                            key={i}
                            className="mb-4 text-neutral-700 leading-relaxed text-m text-justify" // <-- Добавлен text-justify
                        >
                            {para}
                        </p>
                    ))}
                </div>

                {item.source && (
                    <div className="mt-8 pt-4 border-t border-neutral-100 text-xs text-neutral-400">
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
                    </div>
                )}
            </main>
            <SiteFooter />

            {/* Вставляем структурированные данные */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </>
    );
}