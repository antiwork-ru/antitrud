import { Container } from '../components/Container';

export function Badge() {
    return (
        // Обертка с фоном на всю ширину
        <div className='bg-[color:var(--surface)]'>
            <Container>
                {/* Внутренний контент, который остается центрированным */}
                <div className="pt-8 sm:pt-10 lg:pt-12 pb-4 sm:pb-5 lg:pb-6 ">
                    <div className="flex items-center justify-center gap-3 mb-0">
                        <span className="font-mono text-[11px] tracking-[0.1em] text-neutral-400 uppercase">
                            независимый проект
                        </span>
                        <span className="h-px flex-1 max-w-[40px] bg-neutral-200" />
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--accent-subtle)] border border-red-100 px-2.5 py-0.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] animate-pulse" />
                            <span className="font-mono text-[10px] tracking-[0.08em] text-[color:var(--accent)] font-medium uppercase">
                                пополняется
                            </span>
                        </span>
                    </div>
                </div>
            </Container>
        </div>
    )
}

