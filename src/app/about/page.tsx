import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Braces, Github, Instagram, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { buildPageMetadata } from '@/lib/page-metadata';
import { siteConfig } from '@/lib/site-config';

export const metadata = buildPageMetadata({ title: `About ${siteConfig.author}`, description: `Learn about ${siteConfig.author}, their work, values, and current focus.`, keywords: ['about', 'portfolio', 'independent creator', 'software', 'design'], path: '/about' });

const principles = [
  ['01', 'Build with intent', 'Start with the real problem, remove noise, and make every interaction earn its place.'],
  ['02', 'Design for people', 'Accessible, responsive interfaces should feel natural on every screen and input method.'],
  ['03', 'Ship responsibly', 'Security, privacy, maintainability, and honest communication are product features.'],
] as const;

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-4 pb-24 pt-28 text-white sm:px-6 sm:pb-32 sm:pt-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_70%_10%,rgba(255,255,255,.08),transparent_40%)]" />
      <div className="relative mx-auto max-w-6xl">
        <header className="border-b border-[#1F1F1F] pb-14 sm:pb-20">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[.2em] text-[#858585]"><span className="inline-flex items-center gap-2"><Sparkles size={12} /> Personal profile template</span><span className="inline-flex items-center gap-2"><MapPin size={12} /> {siteConfig.location}</span></div>
          <p className="mt-10 font-mono text-[9px] uppercase tracking-[.3em] text-[#686868]">/about — replace this copy</p>
          <h1 className="mt-5 max-w-5xl font-outfit text-[clamp(4rem,12vw,9rem)] font-semibold uppercase leading-[.76] tracking-[-.08em]">Your story,<br /><span className="text-[#686868]">clearly told.</span></h1>
          <p className="mt-10 max-w-2xl border-l border-[#484848] pl-5 text-sm leading-7 text-[#A3A3A3] sm:text-base sm:leading-8">I&apos;m <strong className="font-medium text-white">{siteConfig.author}</strong>. Use this space to explain what you do, what you care about, and the kind of work you want to create.</p>
        </header>
        <section className="grid border-x border-b border-[#1F1F1F] md:grid-cols-3">
          {principles.map(([number, title, copy]) => <article key={number} className="border-b border-[#1F1F1F] p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 sm:p-8"><p className="font-mono text-[9px] text-[#666666]">{number}</p><h2 className="mt-10 text-xl font-semibold">{title}</h2><p className="mt-4 text-sm leading-7 text-[#858585]">{copy}</p></article>)}
        </section>
        <section className="mt-16 grid gap-4 lg:grid-cols-2">
          <article className="border border-[#1F1F1F] bg-[#080808] p-6 sm:p-8"><Braces size={18} className="text-[#BCBCBC]" /><h2 className="mt-10 text-2xl font-semibold">What I make</h2><p className="mt-4 text-sm leading-7 text-[#A3A3A3]">Describe your products, experiments, client work, research, writing, or craft. Keep this section concrete and personal.</p></article>
          <article className="border border-[#1F1F1F] bg-[#080808] p-6 sm:p-8"><ShieldCheck size={18} className="text-[#BCBCBC]" /><h2 className="mt-10 text-2xl font-semibold">How I work</h2><p className="mt-4 text-sm leading-7 text-[#A3A3A3]">Share the principles that guide your decisions, collaboration, quality bar, and approach to responsible technology.</p></article>
        </section>
        <footer className="mt-4 flex flex-col gap-5 border border-[#1F1F1F] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <Link href="/contact" className="group inline-flex min-h-11 w-fit items-center gap-3 bg-white px-5 font-mono text-[9px] font-bold uppercase tracking-[.16em] text-black">Start a conversation <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" /></Link>
          <div className="flex gap-2"><a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="grid size-11 place-items-center border border-[#292929] text-[#A3A3A3] hover:text-white"><Github size={16} /></a><a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram profile" className="grid size-11 place-items-center border border-[#292929] text-[#A3A3A3] hover:text-white"><Instagram size={16} /></a><a href={`mailto:${siteConfig.email}`} className="group inline-flex min-h-11 items-center gap-2 border border-[#292929] px-4 font-mono text-[9px] uppercase tracking-[.14em] text-[#BCBCBC]">Email <ArrowUpRight size={12} /></a></div>
        </footer>
      </div>
    </main>
  );
}
