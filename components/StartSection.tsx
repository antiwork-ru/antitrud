import { Container } from "../components/Container";

const items = [
  {
    index: "01",
    label: "Начало · доступно",
    title: "Лени не существует",
    author: "Девон Прайс",
    why: "Лёгкий вход в тему: почему «лень» – это миф и как культура продуктивности вредит нам. Читается как научпоп.",
    url: "books/devon-price-laziness",
  },
  {
    index: "02",
    label: "Следующий шаг · практика",
    title: "Отказ от работы: теория и практика сопротивления работе",
    author: "Дэвид Фрейн",
    why: "Истории людей, выбравших жизнь вне трудовой нормы. Соединяет теорию с реальными судьбами.",
    url: "books/david-frayne",
  },
  {
    index: "03",
    label: "Углубление · теория",
    title: "Проблема с работой",
    author: "Кэти Викс",
    why: "Марксизм, феминизм и политика времени – для тех, кто готов к серьёзному разговору.",
    url: "books/kathi-weeks",
  },
] as const;

export function StartSection() {
  return (

    <section id="start" className="py-8 sm:py-16 border-b border-[color:var(--border)]">
      <Container>
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="font-mono text-[11px] tracking-[0.1em] text-neutral-400 uppercase mb-2">
              Маршрут чтения
            </div>
            <h2 className="text-xl font-bold tracking-[-0.02em] text-neutral-950">
              С чего начать?
            </h2>
          </div>
          <p className="hidden sm:block max-w-xs text-[13px] leading-relaxed text-neutral-500 text-right">
            Три книги для знакомства с темой антитруда – от простого к сложному
          </p>
        </div>

        <div className="grid gap-px bg-[color:var(--border)] sm:grid-cols-3 rounded-xl overflow-hidden border border-[color:var(--border)]">
          {items.map((x) => (
            <a
              key={x.title}
              href={x.url}
              className="group relative flex flex-col bg-white p-7 hover:bg-[#fafafa] transition-colors"
            >
              {/* Index */}
              <div className="font-mono text-[11px] tracking-[0.1em] text-neutral-300 mb-4">
                {x.index}
              </div>

              {/* Label */}
              <div className="font-mono text-[10px] tracking-[0.12em] text-[color:var(--accent)] uppercase font-medium mb-3">
                {x.label}
              </div>

              {/* Title */}
              <div className="text-[15px] font-bold leading-snug tracking-tight text-neutral-950 mb-1">
                {x.title}
              </div>
              <div className="text-[13px] text-neutral-400 mb-4">{x.author}</div>

              {/* Why */}
              <p className="text-[13px] leading-relaxed text-neutral-500 flex-1">
                {x.why}
              </p>

              {/* CTA */}
              <div className="mt-6 flex items-center gap-1.5 text-[13px] font-medium text-neutral-950 group-hover:text-[color:var(--accent)] transition-colors">
                Читать
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M1 6h8M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
