"use client";

import { useEffect, useMemo, useState } from "react";
import { quotes } from "../data/quotes";

export function QuoteCard() {
  const all = useMemo(() => quotes, []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * all.length));
  }, [all.length]);

  const q = all[index];

  return (
    <div className="flex h-full flex-col">
      {/* ИЗМЕНЕНО: text-base -> text-sm */}
      <p className="text-pretty text-sm leading-relaxed text-neutral-800 italic">
        {q.text}
      </p>

      <div className="mt-5">
        {/* ИЗМЕНЕНО: text-sm -> text-xs */}
        <div className="text-xs font-semibold text-neutral-900">{q.author}</div>
        {/* ИЗМЕНЕНО: text-sm -> text-xs */}
        <div className="text-xs text-neutral-500">{q.book}</div>
      </div>

      <button
        type="button"
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-[color:var(--border)] bg-white px-4 py-2.5 text-sm font-semibold text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
        onClick={() => setIndex((i) => (i + 1) % all.length)}
      >
        ↻ другая цитата
      </button>
    </div>
  );
}

