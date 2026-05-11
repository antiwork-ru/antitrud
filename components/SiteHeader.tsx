import Image from "next/image";
import Link from "next/link";
import { Container } from "../components/Container";
import { Logo } from "../components/Logo";
import { ManifestoStrip } from './ManifestoStrip';
import { Eye } from './Eye';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-white/85 backdrop-blur">
      <Container className="relative flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="leading-none">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center">
          <ManifestoStrip />
        </div>
        <a
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white px-2.5 py-1 text-sm font-medium text-neutral-800 hover:border-neutral-300"
          href="https://t.me/antiwork_ru"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="hidden sm:inline">Telegram</span>
          <span className="h-7 w-7">
            <Eye />
            {/* <Image src="/icons/logo.svg" alt="антитруд." fill className="object-cover" /> */}
            {/*  */}
          </span>
        </a>
      </Container>
    </header>
  );
}

