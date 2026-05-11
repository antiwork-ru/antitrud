import { Container } from "../components/Container";
import { Logo } from "../components/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-white">
      {/* CTA band */}
      <div className="border-b border-[color:var(--border)]">
        <Container>
          <div className="py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <div className="max-w-lg">
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[color:var(--accent)] mb-2">
                Новые книги и переводы
              </div>
              <div className="text-xl font-bold tracking-[-0.02em] text-neutral-950 mb-2">
                Не пропусти новые материалы
              </div>
              <p className="text-[14px] leading-relaxed text-neutral-500">
                Подписывайся на Telegram: свежие переводы, статьи и обсуждение антитруда.
              </p>
            </div>

            <a
              href="https://t.me/antiwork_ru"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[color:var(--foreground)] px-5 py-2.5 text-[13px] font-medium text-white hover:bg-[color:var(--accent)] transition-colors"
            >
              Подписаться →
            </a>
          </div>
        </Container>
      </div>

      {/* YouTube strip */}
      <div className="border-b border-[color:var(--border)]">
        <Container>
          <div className="py-4 flex items-center justify-center gap-2">
            <span className="font-mono text-[11px] tracking-[0.06em] text-neutral-400">
              Смотри меня на
            </span>
            <a
              href="https://youtube.com/@kirill_spiney"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.04em] font-medium text-[color:var(--accent)] hover:underline"
            >
              YouTube →
            </a>
          </div>
        </Container>
      </div>

      {/* Bottom bar */}
      <Container>
        <div className="py-6 flex flex-col items-center sm:flex-row sm:justify-between gap-3">
          <Logo className="opacity-70" />
          <span className="font-mono text-[11px] text-neutral-400 -ml-5">
            © 2026
          </span>
        </div>
      </Container>

    </footer>
  );
}
