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
        <div className="flex h-full flex-col rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8">
            {/* Заголовок "Глоссарий" - немного увеличил шрифт */}
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
                Глоссарий
            </p>

            {/* Термин - увеличил с lg до xl или 2xl */}
            <p className="mt-3 text-2xl font-extrabold leading-tight text-neutral-950">
                {g.term}
            </p>

            {/* Оригинал - увеличил с xs до sm */}
            <p className="mt-1 text-sm italic text-neutral-400">
                {g.orig}
            </p>

            {/* Определение - увеличил с sm до base (16px) */}
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
                {g.def}
            </p>

            {/* Нижняя часть с кнопкой */}
            <div className="mt-auto flex items-center justify-between border-t border-[color:var(--border)] pt-4">
                <span className="text-sm font-semibold text-neutral-400">
                    {index + 1} / {all.length}
                </span>
                <button
                    type="button"
                    className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-500 hover:border-neutral-300 hover:text-neutral-800"
                    onClick={() => setIndex((i) => (i + 1) % all.length)}
                >
                    ↻ другой термин
                </button>
            </div>
        </div>
    );
}