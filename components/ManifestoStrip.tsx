"use client";

import { useEffect, useState } from "react";
import { manifestos } from "../data/manifestos";

export function ManifestoStrip() {
  const [text, setText] = useState<string>(""); // Начинаем с пустой строки

  useEffect(() => {
    // Этот код сработает ТОЛЬКО в браузере
    const randomIndex = Math.floor(Math.random() * manifestos.length);
    setText(manifestos[randomIndex]);
  }, []);

  // Если текст еще не выбран, можно вернуть null или пустой контейнер, 
  // чтобы избежать несоответствия текста
  if (!text) return <div className="h-4" />;

  return (
    <div className="pointer-events-none absolute left-[55%] md:left-1/2 top-[55%] md:top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
      {/* Содержимое остается прежним */}
      <span className="hidden md:block h-px w-4 bg-neutral-200" />
      <span className="text-center whitespace-normal text-[9px] md:whitespace-nowrap md:text-[11px] font-bold uppercase tracking-widest text-neutral-400">
        {text}
      </span>
      <span className="hidden md:block h-px w-4 bg-neutral-200" />
    </div>

  );
}

