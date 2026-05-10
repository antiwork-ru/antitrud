import { cn } from "../lib/cn";

export function RichText({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <div className={cn("rt", className)}>{children}</div>;
}

