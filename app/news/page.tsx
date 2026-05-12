// app/news/page.tsx
import { NewsList } from "./NewsList";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Новости — антитруд.",
    description:
        "Новости об антитруде, базовом доходе, автоматизации и критике работы.",
    openGraph: {
        title: "Новости — антитруд.",
        description:
            "Новости об антитруде, базовом доходе, автоматизации и критике работы.",
        type: "website",
        // если есть общее изображение для соцсетей
        // images: ["/og-news.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "/news",
    },
};

export default function NewsPage() {
    return <NewsList />;
}