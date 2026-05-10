import { cn } from "../lib/cn"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline mt-[6px]", className)}>
      {/* Левая часть: убираем правый отступ (pr-0) */}
      <span className="border-2 border-r-0 border-black py-1 pl-2 pr-0 rounded-l">
        <span className="font-extrabold tracking-tight text-[color:var(--accent)]">
          анти
        </span>
      </span>

      {/* Правая часть: убираем левый отступ (pl-0) */}
      <span className="border-2 border-l-0 border-red-500 py-1 pl-0 pr-2 rounded-r">
        <span className="font-extrabold tracking-tight text-black">
          труд.
        </span>
      </span>
    </span>
  );
}


