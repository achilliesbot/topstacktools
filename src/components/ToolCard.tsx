import Link from "next/link";
import RatingBadge from "./RatingBadge";
import categories from "@/data/categories.json";

interface Tool {
  slug: string;
  name: string;
  category: string;
  rating: number;
  verdict: string;
  brandColor?: string;
  editorChoice?: boolean;
  lastUpdated?: string;
}

export default function ToolCard({ tool, featured = false }: { tool: Tool; featured?: boolean }) {
  const category = categories.find((c) => c.slug === tool.category);

  if (featured) {
    return (
      <Link href={`/reviews/${tool.slug}`} className="group block">
        <article className="card-hover relative rounded-[32px] bg-white border border-border p-8 overflow-hidden h-full">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white shrink-0"
                style={{ backgroundColor: tool.brandColor || '#4a6741' }}
              >
                {tool.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-xl font-bold text-charcoal group-hover:text-evergreen transition-colors">
                    {tool.name}
                  </h3>
                  {tool.editorChoice && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-wood/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-wood">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      Top Pick
                    </span>
                  )}
                </div>
                {category && (
                  <span className="mt-1 inline-block text-xs font-medium text-muted">
                    {category.name}
                  </span>
                )}
              </div>
            </div>
            <RatingBadge rating={tool.rating} size="lg" />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted">{tool.verdict}</p>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs text-muted-light">
              Updated {tool.lastUpdated ? new Date(tool.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-evergreen opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5">
              Read Review
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </span>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/reviews/${tool.slug}`} className="group block">
      <article className="card-hover relative rounded-[28px] bg-white border border-border p-6 overflow-hidden h-full">
        <div className="flex items-start justify-between gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white shrink-0"
            style={{ backgroundColor: tool.brandColor || '#4a6741' }}
          >
            {tool.name.charAt(0)}
          </div>
          <RatingBadge rating={tool.rating} />
        </div>
        <h3 className="mt-4 text-lg font-bold text-charcoal group-hover:text-evergreen transition-colors">
          {tool.name}
        </h3>
        {category && (
          <span className="mt-1 inline-block text-xs font-medium text-muted">
            {category.name}
          </span>
        )}
        <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-2">{tool.verdict}</p>
        <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
          <span className="text-xs text-muted-light">
            {tool.lastUpdated ? new Date(tool.lastUpdated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-evergreen opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1">
            Read More
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
