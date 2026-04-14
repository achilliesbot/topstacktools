import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import categories from "@/data/categories.json";
import tools from "@/data/tools.json";
import ToolCard from "@/components/ToolCard";
import RatingBadge from "@/components/RatingBadge";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `Best ${category.name} Tools (${new Date().getFullYear()}) — Reviews & Rankings`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const categoryTools = tools.filter((t) => t.category === category.slug);
  const topPicks = [...categoryTools].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <>
      <div style={{ background: "linear-gradient(180deg, #eef3ec 0%, #ffffff 100%)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <nav className="pt-6 text-sm text-muted flex items-center gap-1.5">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <svg className="h-3 w-3 text-muted-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/#categories" className="hover:text-charcoal transition-colors">Categories</Link>
            <svg className="h-3 w-3 text-muted-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="text-charcoal font-medium">{category.name}</span>
          </nav>
          <div className="py-12 sm:py-16">
            <ScrollReveal>
              <h1 className="text-3xl font-bold text-charcoal sm:text-4xl">Best {category.name} Tools</h1>
              <p className="mt-3 max-w-2xl text-lg text-muted">{category.description}</p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {categoryTools.length > 0 ? (
              <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {categoryTools.map((tool) => (
                  <StaggerItem key={tool.slug}>
                    <ToolCard tool={tool} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <div className="rounded-[32px] border border-border bg-white p-12 text-center">
                <p className="text-lg font-bold text-charcoal">Reviews coming soon</p>
                <p className="mt-2 text-sm text-muted">We&apos;re currently testing tools in this category.</p>
              </div>
            )}
          </div>
          <aside>
            <div className="sticky top-24 rounded-[28px] border border-border bg-white p-6">
              <h2 className="text-base font-bold text-charcoal">Top Picks</h2>
              {topPicks.length > 0 ? (
                <ul className="mt-5 space-y-4">
                  {topPicks.map((tool, i) => (
                    <li key={tool.slug}>
                      <Link href={`/reviews/${tool.slug}`} className="group flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone text-sm font-bold text-evergreen shrink-0">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-charcoal group-hover:text-evergreen transition-colors truncate">{tool.name}</p>
                        </div>
                        <RatingBadge rating={tool.rating} size="sm" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-muted">Coming soon.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
