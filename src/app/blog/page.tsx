import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import articles from "@/data/articles.json";

export const metadata: Metadata = {
  title: "Blog — SaaS Guides, Reviews & Comparisons",
  description:
    "In-depth articles, buying guides, and expert comparisons to help you choose the right software for your business. Updated weekly.",
  openGraph: {
    title: "Blog — TopStackTools",
    description:
      "In-depth articles, buying guides, and expert comparisons to help you choose the right software for your business.",
  },
};

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-block rounded-full bg-evergreen/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-evergreen">
      {category}
    </span>
  );
}

export default function BlogIndex() {
  return (
    <>
      {/* Header */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #eef3ec 0%, #ffffff 100%)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <ScrollReveal>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-evergreen">
              Blog
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-charcoal sm:text-5xl !leading-[1.12]">
              Guides, reviews &amp; insights
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p
              className="mt-5 text-lg text-muted leading-relaxed"
              style={{ maxWidth: "520px" }}
            >
              Practical advice for choosing and using the tools that power modern
              businesses. No fluff, no filler.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Article Grid */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <StaggerItem key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group block h-full"
                >
                  <article className="card-hover flex h-full flex-col rounded-[28px] border border-border bg-white p-7">
                    <div className="flex items-center gap-3">
                      <CategoryBadge category={article.category} />
                      <span className="text-xs text-muted-light">
                        {article.readTime}
                      </span>
                    </div>
                    <h2 className="mt-4 text-lg font-bold text-charcoal group-hover:text-evergreen transition-colors leading-snug">
                      {article.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3 flex-1">
                      {article.description}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                      <span className="text-xs text-muted-light">
                        {new Date(article.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-evergreen opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1">
                        Read Article
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-charcoal">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Stay ahead of the curve
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-white/50">
              New articles and tool reviews delivered weekly. No spam.
            </p>
            <div className="mt-8">
              <Link
                href="/#reviews"
                className="btn-pill bg-evergreen text-white"
              >
                Browse All Reviews
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
