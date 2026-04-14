import Link from "next/link";

interface Comparison {
  slug: string;
  title: string;
  description: string;
  toolA: { name: string; rating: number };
  toolB: { name: string; rating: number };
}

export default function ComparisonCard({ comparison }: { comparison: Comparison }) {
  return (
    <Link href={`/comparisons/${comparison.slug}`} className="group block">
      <article className="card-hover rounded-[28px] bg-white border border-border p-6 h-full">
        <div className="flex items-center justify-center gap-5">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-charcoal text-sm font-bold text-white">
              {comparison.toolA.name.charAt(0)}
            </div>
            <span className="mt-2.5 text-xs font-semibold text-charcoal">{comparison.toolA.name}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black tracking-[0.2em] text-muted-light uppercase">vs</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-charcoal text-sm font-bold text-white">
              {comparison.toolB.name.charAt(0)}
            </div>
            <span className="mt-2.5 text-xs font-semibold text-charcoal">{comparison.toolB.name}</span>
          </div>
        </div>
        <div className="mt-5 text-center">
          <h3 className="text-base font-bold text-charcoal group-hover:text-evergreen transition-colors">
            {comparison.title}
          </h3>
          <p className="mt-2 text-sm text-muted line-clamp-2">{comparison.description}</p>
        </div>
        <div className="mt-5 pt-4 border-t border-border/60 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-evergreen inline-flex items-center gap-1.5">
            View Comparison
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
