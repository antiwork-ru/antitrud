import { ArticlesSection } from "../components/ArticlesSection";
import { Hero } from "../components/Hero";
import { LibrarySection } from "../components/LibrarySection";
import { ManifestoStrip } from "../components/ManifestoStrip";
import { QuoteCard } from "../components/QuoteCard";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { StartSection } from "../components/StartSection";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[color:var(--surface)]">
      <SiteHeader />
      <main className="flex-1">
        <Hero quote={<QuoteCard />} />
        <StartSection />
        <LibrarySection />
      </main>
      <SiteFooter />
    </div>
  );
}
