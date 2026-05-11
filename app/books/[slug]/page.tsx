import { notFound } from "next/navigation";
import { Metadata } from "next";
import { books, BOOKS_BASE_URL } from "../../../data/books";
import { BookPage } from "../../../components/BookPage";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";

interface Props {
  params: Promise<{ slug: string }>;
}

function findBook(slug: string) {
  return books.find((b) => b.slug === slug || b.url === slug) ?? null;
}

export function generateStaticParams() {
  return books
    .filter((b) => b.slug || b.url)
    .map((b) => ({ slug: b.slug ?? b.url }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = findBook(slug);
  if (!book) return {};

  const coverUrl = book.cover ? `${BOOKS_BASE_URL}${book.cover}` : undefined;

  return {
    title: `${book.ru} – ${book.authors} | антитруд. переводы`,
    description:
      book.description ??
      `Русский перевод книги ${book.authors} «${book.orig}». Читайте на антитруд. переводы.`,
    alternates: {
      canonical: `https://antitrud.vercel.app/${slug}/`,
    },
    openGraph: {
      type: "article",
      title: `${book.ru} – ${book.authors}`,
      description: book.description,
      url: `https://antitrud.vercel.app/${slug}/`,
      ...(coverUrl
        ? { images: [{ url: coverUrl, width: 800, height: 1200, alt: book.ru }] }
        : {}),
    },
  };
}

export default async function BookRoute({ params }: Props) {
  const { slug } = await params;
  const book = findBook(slug);
  if (!book) notFound();

  return (
    <div className="flex min-h-full flex-col  ">
      <SiteHeader />
      <main className="flex-1 ">
        <BookPage book={book} />
      </main>
      <SiteFooter />
    </div>
  );
}
