import { Hero } from "../components/Hero";
import { Hero2 } from "../components/Hero2";
import { LibrarySection } from "../components/LibrarySection";
import { QuoteCard } from "../components/QuoteCard";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { StartSection } from "../components/StartSection";
import Headline from '../components/Headline';
import { Badge } from '../components/Badge';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[color:var(--surface)]">
      <SiteHeader />
      <main className="flex-1">
        <Badge />
        <Headline />
        <Hero quote={<QuoteCard />} />
        <Hero2 quote={<QuoteCard />} />
        <StartSection />
        <LibrarySection />
      </main>
      <SiteFooter />
    </div>
  );
}
