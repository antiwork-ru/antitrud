// components/LatestNews.tsx
import { news, NewsItem } from "../data/news";
import Link from "next/link";

export default function LatestNews() {
    const latest = [...news]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

    return (
        <section className="py-16 border-t border-neutral-100">
            <div className="flex items-baseline justify-between mb-8">
                <h2 className="text-xl font-bold">Новости</h2>
                <Link href="/news" className="text-sm text-neutral-400 hover:underline">
                    Все новости →
                </Link>
            </div>
            <div className="flex flex-col gap-6">
                {latest.map((item) => (
                    <Link key={item.slug} href={`/news/${item.slug}`} className="group">
                        <div className="flex items-start gap-4">
                            <time className="text-xs text-neutral-400 mt-1 whitespace-nowrap">
                                {new Date(item.date).toLocaleDateString("ru-RU", {
                                    day: "numeric",
                                    month: "short",
                                })}
                            </time>
                            <div>
                                <p className="text-sm font-medium group-hover:underline leading-snug">
                                    {item.title}
                                </p>
                                <p className="text-xs text-neutral-500 mt-0.5 line-clamp-2">
                                    {item.summary}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}