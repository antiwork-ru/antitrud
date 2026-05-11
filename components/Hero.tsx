import Link from "next/link";
import { Container } from "../components/Container";
import { QuizStrip } from "./QuizStrip";

export function Hero({ quote }: { quote: React.ReactNode }) {
  return (
    <div className='bg-[color:var(--surface)]'>
      <section id="hero" className="border-b border-[color:var(--border)]">
        <Container>
          {/* Main hero block */}
          <div className=" pt-6 sm:pt-8 lg:pt-8 pb-14 sm:pb-16 lg:pb-18 ">
            {/* Mono label */}
            {/* <div className="flex items-center justify-center gap-3 mb-6 ">

            <span className="font-mono text-[11px] tracking-[0.1em] text-neutral-400 uppercase ">
              независимый проект
            </span>
            <span className="h-px flex-1 max-w-[40px] bg-neutral-200 " />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--accent-subtle)] border border-red-100 px-2.5 py-0.5 ">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] animate-pulse " />
              <span className="font-mono text-[10px] tracking-[0.08em] text-[color:var(--accent)] font-medium uppercase ">
                пополняется
              </span>
            </span>
          </div> */}

            {/* Headline */}
            {/* <div className="flex flex-col gap-2 text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-neutral-950 text-center p-4">

            
            <div className="text-left w-full sm:w-auto sm:self-start">
              Размышляем
            </div>

            
            <div className="w-full text-center">
              о том, что{" "}
              <span className="text-[color:var(--accent)] block sm:inline mt-2 sm:mt-0 ">
                не так с работой
              </span>
            </div>

            
            <div className="text-right w-full sm:w-auto sm:self-end">
              — и что нам с этим делать
            </div>
          </div> */}

            <p className="mt-0  text-base leading-relaxed text-neutral-500 font-light text-center">
              Книги и тексты на русском языке о критике труда, посттрудовом
              обществе, базовом доходе и свободе от принудительной продуктивности.

            </p>


            {/* CTA row */}
            <div className="mt-8 flex flex-wrap gap-6 justify-center">
              <a
                href="#biblioteka"
                className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--foreground)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[color:var(--accent)] transition-colors"
              >
                Смотреть библиотеку
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h10M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--border)] bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 hover:border-neutral-400 transition-colors"
              >
                Читать статьи
              </Link>
              <a
                href="https://t.me/antiwork_ru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--border)] bg-white px-5 py-2.5 text-sm font-medium text-neutral-500 hover:border-neutral-400 transition-colors"
              >
                Telegram →
              </a>


            </div>



          </div>





        </Container>
      </section></div>
  );
}
