import Image from "next/image";
import { Container } from "../components/Container";
import { articles } from "../data/articles";
import { cn } from "../lib/cn";

function typeBadgeClass(type: string) {
  switch (type) {
    case "a":
      return "bg-sky-50 text-sky-900 border-sky-200";
    case "r":
      return "bg-emerald-50 text-emerald-800 border-emerald-200";
    case "p":
      return "bg-amber-50 text-amber-900 border-amber-200";
    case "l":
      return "bg-violet-50 text-violet-900 border-violet-200";
    default:
      return "bg-neutral-100 text-neutral-700 border-neutral-200";
  }
}

export function ArticlesSection() {
  return (
    <section id="articles" className="py-14">
      <Container>
        <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
          Статьи и публикации
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          Подборка переводов, докладов, подкастов и статей.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <article
              key={a.url}
              className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white transition hover:-translate-y-0.5 hover:border-neutral-300"
            >
              <a href={a.url} target="_blank" rel="noopener noreferrer">
                <div className="relative aspect-[16/9] w-full bg-neutral-50">
                  <Image
                    src={a.imageUrl}
                    alt={a.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </a>

              <div className="flex h-full flex-col gap-3 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[11px] font-bold",
                      typeBadgeClass(a.type),
                    )}
                  >
                    {a.typeLabel}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {a.source} · {a.dateLabel}
                  </span>
                </div>

                <div className="text-sm font-bold leading-snug text-neutral-950">
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {a.title}
                  </a>
                </div>

                <p className="text-sm leading-relaxed text-neutral-600">
                  {a.description}
                </p>

                <a
                  className="mt-auto inline-flex w-fit rounded-lg border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Читать на Teletype →
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

