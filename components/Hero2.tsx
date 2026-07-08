import { Container } from "../components/Container";
import Link from "next/link";
import NewsTicker from "../components/NewsTicker";

export function Hero2({ quote }: { quote: React.ReactNode }) {
    return (
        <section id="hero" className="border-b border-[color:var(--border)] bg-[color:var(--surface)]">
            <Container>

                {/* Bottom band: stats + latest update + quote */}
                <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-[color:var(--border)] divide-y sm:divide-y-0 sm:divide-x divide-[color:var(--border)]">
                    {/* News ticker + Quiz */}
                    <div className="flex flex-col justify-between py-6 sm:pr-8">
                        <NewsTicker />
                        <Link
                            href="/quiz"
                            className="mt-4 inline-flex items-center gap-1.5 group w-fit"
                        >
                            <span className="font-mono text-[11px] tracking-[0.08em] text-[color:var(--accent)] uppercase group-hover:text-neutral-950 transition-colors">
                                пройти тест на этичность
                            </span>
                        </Link>
                    </div>

                    {/* Latest update */}
                    <div className="py-6 px-0 sm:px-8 flex flex-col justify-center  h-full">
                        <div className="font-mono text-[11px] tracking-[0.1em] text-neutral-400 uppercase mb-2">
                            Последнее обновление
                        </div>
                        <div className="text-sm font-semibold text-neutral-950 leading-snug">
                            Проклятие Голиафа: история и будущее социального коллапса
                        </div>
                        <div className="mt-1 font-mono text-[11px] text-neutral-400">
                            Люк Кемп · июль 2026 · на редактуре
                        </div>
                        <a
                            href="books/luke-kemp-goliath"
                            className="mt-2 inline-flex text-[13px] font-medium text-[color:var(--accent)] hover:underline"
                        >
                            Читать →
                        </a>
                    </div>


                    {/* Quote */}
                    <div className="py-6 pl-0 sm:pl-8">
                        <div className="font-mono text-[11px] tracking-[0.1em] text-neutral-400 uppercase mb-3">
                            Цитата дня
                        </div>
                        <div className="text-sm leading-relaxed">{quote}</div>
                    </div>
                </div>
            </Container>
        </section>
    );
}