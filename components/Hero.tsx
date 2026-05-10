import Link from "next/link";
import { Container } from "../components/Container";

export function Hero({ quote }: { quote: React.ReactNode }) {
  return (
    <section id="hero" className="py-14 sm:py-18">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white p-7 sm:p-10">
            <div className="absolute inset-y-0 left-0 w-1.5 bg-[color:var(--accent)]" />

            <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
              Независимый проект
            </p>

            <h1 className="mt-3 text-balance text-2xl font-extrabold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              Библиотека переводов о том, что{" "}
              <span className="text-[color:var(--accent)]">не так с работой</span>{" "}
              — и что с этим делать
            </h1>

            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-neutral-600">
              «антитруд.» переводит на русский язык книги и тексты о критике труда,
              посттрудовом обществе, базовом доходе, свободе от принудительной
              продуктивности и многом другом. Всё бесплатно.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#biblioteka"
                className="inline-flex items-center justify-center rounded-xl bg-[color:var(--accent)] px-5 py-3 text-sm font-bold text-white hover:bg-black"
              >
                Смотреть библиотеку
              </a>
              <Link
                href="/articles"
                className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-bold text-white hover:bg-[color:var(--accent)]"
              >
                Читать статьи
              </Link>
              <a
                href="https://t.me/antiwork_ru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-[color:var(--border)] bg-white px-5 py-3 text-sm font-semibold text-neutral-800 hover:border-neutral-300"
              >
                Telegram →
              </a>
            </div>

            <div className="mt-8 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
              <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                Последнее обновление
              </div>
              <div className="mt-1 text-sm font-semibold text-neutral-950">
                Проклятие Голиафа: история и будущее социального коллапса
              </div>
              <div className="mt-1 text-xs text-neutral-500">
                Люк Кемп · май 2026 · в процессе
              </div>
              <a
                href="books/luke-kemp-goliath"
                className="mt-3 inline-flex text-sm font-semibold text-[color:var(--accent)] hover:underline"
              >
                Читать →
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-[color:var(--border)] bg-white p-7 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
              Цитата дня
            </p>

            <div className="mt-5">{quote}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
