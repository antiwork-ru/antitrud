import { Container } from "../components/Container";

const items = [
  {
    label: "Начало · доступно",
    title: "Лени не существует",
    author: "Девон Прайс",
    why: "Лёгкий вход в тему: почему «лень» – это миф и как культура продуктивности вредит нам. Читается как научпоп.",
    url: "books/devon-price-laziness",
  },
  {
    label: "Следующий шаг · практика",
    title: "Отказ от работы",
    author: "Дэвид Фрейн",
    why: "Истории людей, выбравших жизнь вне трудовой нормы. Соединяет теорию с реальными судьбами – хорошо читается после Девона Прайс.",
    url: "books/david-frayne",
  },
  {
    label: "Углубление · теория",
    title: "Проблема с работой",
    author: "Кэти Викс",
    why: "Марксизм, феминизм и политика времени – для тех, кто готов к серьёзному разговору.",
    url: "books/kathi-weeks",
  },
] as const;

export function StartSection() {
  return (
    <section id="start" className="py-14">
      <Container>
        <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
          С чего начать?
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600">
          Если вы только знакомитесь с темой антитруда – вот три книги, с которых
          удобно начать:
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((x) => (
            <a
              key={x.title}
              href={x.url}
              className="group rounded-2xl border border-[color:var(--border)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-neutral-300"
            >
              <div className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--accent)]">
                {x.label}
              </div>
              <div className="mt-2 text-base font-bold leading-snug text-neutral-950">
                {x.title}
              </div>
              <div className="mt-1 text-sm text-neutral-500">{x.author}</div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {x.why}
              </p>
              <div className="mt-4 text-sm font-semibold text-[color:var(--accent)] group-hover:underline">
                Читать →
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

