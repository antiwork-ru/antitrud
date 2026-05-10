import { Container } from "../components/Container";
import { Logo } from "../components/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-white py-12">
      <Container>
        <div className="flex flex-col justify-between gap-6 border-b border-[color:var(--border)] pb-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <div className="ml-0.5 text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--accent)]">
              Новые книги и переводы
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
              Не пропусти новые материалы
            </div>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Подписывайся на Telegram: свежие переводы, статьи и обсуждение
              антитруда.
            </p>
          </div>

          <a
            href="https://t.me/antiwork_ru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center justify-center rounded-xl bg-[color:var(--accent)] px-5 py-3 text-sm font-bold text-white hover:bg-black"
          >
            Подписаться →
          </a>
        </div>

        <div className="flex items-center justify-center gap-1 border-b border-[color:var(--border)] py-6 text-sm text-neutral-500">
          <span className="text-neutral-400">Смотри меня на</span>
          <a
            href="https://youtube.com/@kirill_spiney"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[color:var(--accent)] hover:underline"
          >
            YouTube
          </a>
        </div>

        <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-neutral-500">
            <Logo className="opacity-80" />
          </div>
          <div className="text-xs text-neutral-400">© 2026 антитруд.</div>
        </div>
      </Container>
    </footer>
  );
}

