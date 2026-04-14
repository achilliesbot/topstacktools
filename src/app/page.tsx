import ToolCard from "@/components/ToolCard";
import ComparisonCard from "@/components/ComparisonCard";
import CategoryCard from "@/components/CategoryCard";
import NewsletterForm from "@/components/NewsletterForm";
import LogoMarquee from "@/components/LogoMarquee";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import tools from "@/data/tools.json";
import comparisons from "@/data/comparisons.json";
import categories from "@/data/categories.json";

export default function Home() {
  const editorPicks = tools.filter((t) => t.editorChoice);
  const otherTools = tools.filter((t) => !t.editorChoice);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #eef3ec 0%, #ffffff 100%)" }}>
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:py-40">
          <ScrollReveal>
            <p className="text-sm font-medium text-evergreen tracking-wide">
              Trusted by <span className="font-bold">growing businesses</span> worldwide
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-charcoal sm:text-5xl lg:text-6xl !leading-[1.12]" style={{ maxWidth: "680px" }}>
              Find the right software for{" "}
              <span className="text-evergreen">your business</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-lg text-muted leading-relaxed" style={{ maxWidth: "520px" }}>
              Independent, hands-on reviews of the tools that power modern businesses. We test everything ourselves so you don&apos;t waste time or money.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#reviews" className="btn-pill bg-charcoal text-white">
                Browse Reviews
              </a>
              <a href="#comparisons" className="btn-pill border border-charcoal/20 bg-transparent text-charcoal hover:bg-charcoal hover:text-white">
                Compare Tools
              </a>
            </div>
          </ScrollReveal>

          {/* Trust checklist */}
          <ScrollReveal delay={0.4}>
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3">
              {["Hands-on testing", "No sponsored rankings", "Updated April 2026"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-evergreen" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span className="text-sm text-muted">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Logo Marquee */}
      <LogoMarquee />

      {/* Editor's Picks */}
      {editorPicks.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-3">
                <svg className="h-5 w-5 text-wood" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-wood">Editor&apos;s Choice</span>
              </div>
              <h2 className="text-3xl font-bold text-charcoal sm:text-4xl">Our top-rated picks</h2>
              <p className="mt-3 text-muted">The tools we recommend most this month, based on extensive testing.</p>
            </ScrollReveal>
            <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {editorPicks.map((tool) => (
                <StaggerItem key={tool.slug}>
                  <ToolCard tool={tool} featured />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* All Reviews */}
      <section id="reviews" className="bg-stone">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-evergreen">In-Depth Reviews</p>
            <h2 className="mt-3 text-3xl font-bold text-charcoal sm:text-4xl">Every tool, tested and rated</h2>
            <p className="mt-3 text-muted" style={{ maxWidth: "480px" }}>Detailed breakdowns of features, pricing, and real-world performance. No sponsored rankings.</p>
          </ScrollReveal>
          <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherTools.map((tool) => (
              <StaggerItem key={tool.slug}>
                <ToolCard tool={tool} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Comparisons */}
      <section id="comparisons" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-evergreen">Head-to-Head</p>
            <h2 className="mt-3 text-3xl font-bold text-charcoal sm:text-4xl">Side-by-side comparisons</h2>
            <p className="mt-3 text-muted" style={{ maxWidth: "480px" }}>Can&apos;t decide between two tools? We break down exactly where each one wins.</p>
          </ScrollReveal>
          <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((comp) => (
              <StaggerItem key={comp.slug}>
                <ComparisonCard comparison={comp} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How We Review — trust section */}
      <section className="bg-sand">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-evergreen">Our Process</p>
              <h2 className="mt-3 text-3xl font-bold text-charcoal sm:text-4xl">How we review every tool</h2>
            </div>
          </ScrollReveal>
          <StaggerContainer className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { step: "01", title: "Hands-on Testing", desc: "We sign up, configure, and use every tool in real workflows before writing a single word." },
              { step: "02", title: "Structured Scoring", desc: "Every tool is rated across features, ease of use, pricing, support, and integrations." },
              { step: "03", title: "Honest Verdicts", desc: "No pay-for-placement. Affiliate links never influence our ratings. We recommend what works." },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="rounded-[32px] bg-white p-8 h-full">
                  <span className="text-3xl font-bold text-evergreen/30">{item.step}</span>
                  <h3 className="mt-4 text-lg font-bold text-charcoal">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <StaggerContainer className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "6+", label: "Tools Reviewed" },
              { value: "3", label: "Comparisons" },
              { value: "10", label: "Point Scale" },
              { value: "100%", label: "Independent" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-[32px] bg-stone p-6 text-center">
                  <p className="text-3xl font-bold text-charcoal sm:text-4xl">{stat.value}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="bg-stone">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-evergreen">Browse by Category</p>
            <h2 className="mt-3 text-3xl font-bold text-charcoal sm:text-4xl">Tools for every part of your business</h2>
          </ScrollReveal>
          <StaggerContainer className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat) => (
              <StaggerItem key={cat.slug}>
                <CategoryCard category={cat} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-charcoal">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Get smarter about your software stack
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-white/50">
              Weekly roundups of new reviews, deals, and tips for choosing the right tools.
            </p>
            <NewsletterForm />
            <p className="mt-5 text-xs text-white/30">Free forever. No spam. Unsubscribe anytime.</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
