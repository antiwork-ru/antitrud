'use client';
import { useEffect, useMemo, useState } from 'react';
import { glossary } from '../data/glossary';

export function GlossaryCard() {
    const all = useMemo(() => glossary, []);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setIndex(Math.floor(Math.random() * all.length));
    }, [all.length]);

    const g = all[index];

    return (
        <div className="flex h-full flex-col rounded-xl border border-[color:var(--border)] bg-white p-7">
            {/* Label */}
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-neutral-400 mb-4">
                Глоссарий
            </p>

            {/* Term */}
            <p className="text-2xl font-bold tracking-[-0.025em] text-neutral-950 leading-tight">
                {g.term}
            </p>

            {/* Original */}
            <p
                className="mt-1 text-[13px] text-neutral-400"
                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
            >
                {g.orig}
            </p>

            {/* Definition */}
            <p className="mt-4 text-[14px] leading-relaxed text-neutral-600 flex-1">
                {g.def}
            </p>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-[color:var(--border)] pt-4">
                <span className="font-mono text-[11px] text-neutral-400">
                    {index + 1} / {all.length}
                </span>
                <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--border)] bg-white px-3.5 py-2 font-mono text-[10px] tracking-[0.04em] uppercase text-neutral-500 hover:border-neutral-300 hover:text-neutral-800 transition-colors"
                    onClick={() => setIndex((i) => (i + 1) % all.length)}
                >
                    ↻ другой термин
                </button>
            </div>
        </div>
    );
}
