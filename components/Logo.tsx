import { cn } from "../lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center select-none", className)}>
      <span className="font-bold tracking-[-0.04em] text-[17px] text-foreground">
        <span className="text-[color:var(--accent)]">анти</span>
        <span className="text-foreground">труд</span>
        <span className="text-[color:var(--accent)] font-mono">.</span>
      </span>
    </span>
  );
}


