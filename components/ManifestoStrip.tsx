"use client";

import { useEffect, useState } from "react";
import { manifestos } from "../data/manifestos";

export function ManifestoStrip() {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * manifestos.length);
    setText(manifestos[randomIndex]);
  }, []);

  if (!text) return <div className="h-4" />;

  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-3">
      <span className="h-px w-5 bg-neutral-200" />
      <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-neutral-400 whitespace-nowrap">
        {text}
      </span>
      <span className="h-px w-5 bg-neutral-200" />
    </div>
  );
}
