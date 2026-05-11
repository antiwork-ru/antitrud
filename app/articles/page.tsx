import Link from "next/link";
import { ArticlesLanding } from "../../components/ArticlesLanding";
import { ManifestoStrip } from "../../components/ManifestoStrip";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

export default function ArticlesPage() {
  return (
    <div className="flex min-h-full flex-col bg-[color:var(--surface)]">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-12">
          <Link
            href="/"
            className="text-sm font-semibold text-[color:var(--accent)] hover:underline"
          >
            ← На главную
          </Link>
        </div>
        <ArticlesLanding />
      </main>
      <SiteFooter />
    </div>
  );
}

