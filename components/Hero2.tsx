import { Container } from "../components/Container";

export function Hero2({ quote }: { quote: React.ReactNode }) {
    return (
        <section id="hero" className="border-b border-[color:var(--border)]">
            <Container>

                {/* Bottom band: stats + latest update + quote */}
                <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-[color:var(--border)] divide-y sm:divide-y-0 sm:divide-x divide-[color:var(--border)]">
                    {/* Stats */}
                    <div className="flex items-center justify-center sm:justify-start gap-10 py-6 sm:pr-8">
                        {[
                            { value: "24", label: "книг в базе" },
                            { value: "10", label: "готово полностью" },
                            { value: "13", label: "в работе" },
                        ].map((s) => (
                            <div key={s.label} className="text-center sm:text-left">
                                <div className="text-2xl font-bold tracking-tight text-neutral-950">{s.value}</div>
                                <div className="mt-0.5 font-mono text-[11px] tracking-[0.06em] text-neutral-400 uppercase">{s.label}</div>
                            </div>
                        ))}
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
                            Люк Кемп · май 2026 · в процессе
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
