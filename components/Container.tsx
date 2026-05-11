import { cn } from "../lib/cn";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}
