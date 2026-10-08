import Link from 'next/link';
import { ArrowUpRight, ImagePlus, Layers3 } from 'lucide-react';
import { buildPageMetadata } from '@/lib/page-metadata';

export const metadata = buildPageMetadata({ title: 'Gallery', description: 'A configurable gallery for selected images, projects, and visual notes.', keywords: ['gallery', 'portfolio', 'visual work'], path: '/gallery' });

const placeholders = [
  ['01', 'Project study', 'Use this frame for a project, photograph, or case-study cover.'],
  ['02', 'Visual note', 'Pair an image with a concise observation or story.'],
  ['03', 'Process detail', 'Show the work behind the finished result.'],
] as const;

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-4 pb-24 pt-28 text-white sm:px-6 sm:pb-32 sm:pt-36">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-[#1F1F1F] pb-12 sm:pb-16">
          <p className="font-mono text-[9px] uppercase tracking-[.25em] text-[#666666]">Gallery / starter collection</p>
          <h1 className="mt-5 font-outfit text-[clamp(4rem,12vw,9rem)] font-semibold uppercase leading-[.76] tracking-[-.08em]">Your work,<br /><span className="text-[#686868]">in frames.</span></h1>
          <p className="mt-8 max-w-xl text-sm leading-7 text-[#A3A3A3]">This repository intentionally ships without personal media. Connect your data source or replace these cards with media you own.</p>
        </header>
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {placeholders.map(([number, title, copy]) => (
            <article key={number} className="group min-h-80 border border-[#1F1F1F] bg-[#080808] p-6 transition-colors hover:border-[#484848]">
              <div className="flex items-center justify-between text-[#666666]"><span className="font-mono text-[9px]">{number}</span><ImagePlus size={16} /></div>
              <div className="mt-20 grid size-16 place-items-center border border-dashed border-[#333333] text-[#666666]"><Layers3 size={20} /></div>
              <h2 className="mt-10 text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-[#858585]">{copy}</p>
            </article>
          ))}
        </section>
        <Link href="/docs" className="mt-4 inline-flex min-h-11 items-center gap-3 border border-[#292929] px-5 font-mono text-[9px] uppercase tracking-[.16em] text-[#BCBCBC] hover:border-[#686868] hover:text-white">Read the setup notes <ArrowUpRight size={13} /></Link>
      </div>
    </main>
  );
}
