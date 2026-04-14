import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import tools from "@/data/tools.json";
import categories from "@/data/categories.json";
import RatingBadge from "@/components/RatingBadge";
import ToolCard from "@/components/ToolCard";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return { title: "Review Not Found" };
  return {
    title: `${tool.name} Review (${new Date().getFullYear()}) — Is It Worth It?`,
    description: tool.verdict,
    openGraph: {
      title: `${tool.name} Review — TopStackTools`,
      description: tool.verdict,
    },
  };
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) notFound();

  const category = categories.find((c) => c.slug === tool.category);
  const relatedTools = tools.filter((t) => t.slug !== tool.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: tool.name,
      applicationCategory: category?.name || "Business Software",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: tool.rating,
      bestRating: 10,
    },
    author: {
      "@type": "Organization",
      name: "TopStackTools",
    },
    reviewBody: tool.verdict,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div style={{ background: "linear-gradient(180deg, #eef3ec 0%, #ffffff 100%)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <nav className="pt-6 text-sm text-muted flex items-center gap-1.5">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <svg className="h-3 w-3 text-muted-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            {category && (
              <>
                <Link href={`/categories/${category.slug}`} className="hover:text-charcoal transition-colors">{category.name}</Link>
                <svg className="h-3 w-3 text-muted-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </>
            )}
            <span className="text-charcoal font-medium">{tool.name}</span>
          </nav>

          <div className="py-12 sm:py-16 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <ScrollReveal>
              <div className="flex items-start gap-5">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white shrink-0 shadow-lg"
                  style={{ backgroundColor: tool.brandColor || '#4a6741' }}
                >
                  {tool.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl font-bold text-charcoal lg:text-4xl">{tool.name}</h1>
                    {tool.editorChoice && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-wood/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-wood">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        Editor&apos;s Choice
                      </span>
                    )}
                  </div>
                  {category && <p className="mt-1.5 text-sm text-muted">{category.name}</p>}
                  <p className="mt-1 text-xs text-muted-light">
                    Updated {tool.lastUpdated ? new Date(tool.lastUpdated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recently'}
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="flex items-center gap-5 lg:flex-col lg:items-end">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted">Our Score</span>
                  <RatingBadge rating={tool.rating} size="lg" />
                </div>
                <a
                  href={tool.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="btn-pill bg-charcoal text-white"
                >
                  {tool.ctaText}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Quick Verdict */}
        <ScrollReveal>
          <div className="rounded-[28px] bg-stone p-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-evergreen">Quick Verdict</p>
            <p className="mt-3 text-lg font-medium leading-relaxed text-charcoal">{tool.verdict}</p>
          </div>
        </ScrollReveal>

        {/* Overview */}
        <ScrollReveal>
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-charcoal">Overview</h2>
            <p className="mt-5 text-base leading-relaxed text-muted">{tool.description}</p>
          </section>
        </ScrollReveal>

        {/* Pros & Cons */}
        <ScrollReveal>
          <section className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-[28px] bg-green-light p-7">
              <h3 className="text-base font-bold text-evergreen">What we liked</h3>
              <ul className="mt-5 space-y-3.5">
                {tool.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-charcoal">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-evergreen" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[28px] bg-red-light p-7">
              <h3 className="text-base font-bold text-red">What could improve</h3>
              <ul className="mt-5 space-y-3.5">
                {tool.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-charcoal">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </ScrollReveal>

        {/* Key Features */}
        <ScrollReveal>
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-charcoal">Key Features</h2>
            <StaggerContainer className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {tool.features.map((feature, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-stone">
                      <svg className="h-4 w-4 text-evergreen" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-sm font-medium text-charcoal">{feature}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        </ScrollReveal>

        {/* Pricing */}
        <ScrollReveal>
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-charcoal">Pricing</h2>
            <div className="mt-6 space-y-3">
              {tool.pricing.map((plan, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl border border-border bg-white p-5 hover:border-evergreen/30 transition-colors">
                  <div>
                    <span className="text-sm font-bold text-charcoal">{plan.plan}</span>
                    <p className="mt-0.5 text-xs text-muted">{plan.features}</p>
                  </div>
                  <span className="text-lg font-bold text-evergreen whitespace-nowrap ml-4">{plan.price}</span>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Who It's For */}
        <ScrollReveal>
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-charcoal">Who It&apos;s For</h2>
            <p className="mt-5 text-base leading-relaxed text-muted">{tool.whoItsFor}</p>
          </section>
        </ScrollReveal>

        {/* Final Verdict */}
        <ScrollReveal>
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-charcoal">Final Verdict</h2>
            <div className="mt-6 rounded-[32px] bg-charcoal p-10">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white shrink-0"
                  style={{ backgroundColor: tool.brandColor || '#4a6741' }}
                >
                  {tool.name.charAt(0)}
                </div>
                <div>
                  <span className="text-lg font-bold text-white">{tool.name}</span>
                  <div className="mt-1"><RatingBadge rating={tool.rating} size="md" /></div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-white/60">{tool.verdict}</p>
              <a
                href={tool.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-pill bg-evergreen text-white mt-6"
              >
                {tool.ctaText}
              </a>
            </div>
          </section>
        </ScrollReveal>
      </div>

      {/* Related Reviews */}
      <section className="bg-stone">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-charcoal">More Reviews</h2>
          </ScrollReveal>
          <StaggerContainer className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relatedTools.map((t) => (
              <StaggerItem key={t.slug}>
                <ToolCard tool={t} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
