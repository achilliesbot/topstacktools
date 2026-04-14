import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import articles from "@/data/articles.json";
import tools from "@/data/tools.json";
import ToolCard from "@/components/ToolCard";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: `${article.title} | TopStackTools`,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const relatedTools = tools.filter((t) =>
    article.relatedTools.includes(t.slug)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "TopStackTools",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div
        style={{
          background: "linear-gradient(180deg, #eef3ec 0%, #ffffff 100%)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6">
          {/* Breadcrumb */}
          <nav className="pt-6 text-sm text-muted flex items-center gap-1.5">
            <Link
              href="/"
              className="hover:text-charcoal transition-colors"
            >
              Home
            </Link>
            <svg
              className="h-3 w-3 text-muted-light"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <Link
              href="/blog"
              className="hover:text-charcoal transition-colors"
            >
              Blog
            </Link>
            <svg
              className="h-3 w-3 text-muted-light"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-charcoal font-medium truncate max-w-[240px]">
              {article.title}
            </span>
          </nav>

          <div className="py-12 sm:py-16">
            <ScrollReveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-block rounded-full bg-evergreen/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-evergreen">
                  {article.category}
                </span>
                <span className="text-xs text-muted-light">
                  {article.readTime}
                </span>
              </div>
              <h1
                className="mt-5 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl lg:text-5xl !leading-[1.12]"
                style={{ maxWidth: "720px" }}
              >
                {article.title}
              </h1>
              <p
                className="mt-5 text-lg text-muted leading-relaxed"
                style={{ maxWidth: "600px" }}
              >
                {article.description}
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm text-muted-light">
                <span>
                  By{" "}
                  <span className="font-medium text-charcoal">
                    {article.author}
                  </span>
                </span>
                <span aria-hidden="true">&middot;</span>
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="mx-auto max-w-3xl px-6 py-16">
        <ScrollReveal>
          <div
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </ScrollReveal>

        {/* Affiliate CTA Box */}
        {article.affiliateUrl && (
          <ScrollReveal>
            <div className="mt-16 rounded-[32px] bg-charcoal p-10 text-center">
              <h3 className="text-xl font-bold text-white">
                Ready to get started?
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/50">
                Based on our testing, this is the tool we recommend for most
                people. Try it free and see if it fits your workflow.
              </p>
              <a
                href={article.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-pill bg-evergreen text-white mt-6"
              >
                {article.ctaText}
              </a>
              <p className="mt-4 text-xs text-white/30">
                We may earn a commission if you sign up through this link. This
                never affects our recommendations.
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="bg-stone">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <ScrollReveal>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-evergreen">
                Related Reviews
              </p>
              <h2 className="mt-3 text-2xl font-bold text-charcoal">
                Tools mentioned in this article
              </h2>
            </ScrollReveal>
            <StaggerContainer className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedTools.map((tool) => (
                <StaggerItem key={tool.slug}>
                  <ToolCard tool={tool} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </>
  );
}
