import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import comparisons from "@/data/comparisons.json";
import RatingBadge from "@/components/RatingBadge";
import ScrollReveal from "@/components/ScrollReveal";

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);
  if (!comparison) return { title: "Comparison Not Found" };
  return {
    title: `${comparison.title} (${new Date().getFullYear()}) — Full Comparison`,
    description: comparison.description,
  };
}

function ScoreBar({ score, label, isWinner }: { score: number; label: string; isWinner: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-xs text-muted text-right shrink-0">{label}</span>
      <div className="flex-1 h-2.5 rounded-full bg-stone overflow-hidden">
        <div
          className={`h-full rounded-full score-fill ${isWinner ? 'bg-evergreen' : 'bg-muted-light/40'}`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className={`w-6 text-xs font-bold text-right ${isWinner ? 'text-evergreen' : 'text-muted'}`}>{score}</span>
    </div>
  );
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);
  if (!comparison) notFound();

  const { toolA, toolB } = comparison;
  const scoreLabels = ["ease", "features", "value", "support", "integrations"] as const;
  const scoreLabelNames: Record<string, string> = {
    ease: "Ease of Use", features: "Features", value: "Value", support: "Support", integrations: "Integrations",
  };

  const totalA = Object.values(toolA.scores).reduce((a, b) => a + b, 0);
  const totalB = Object.values(toolB.scores).reduce((a, b) => a + b, 0);

  return (
    <>
      <div style={{ background: "linear-gradient(180deg, #eef3ec 0%, #ffffff 100%)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <nav className="pt-6 text-sm text-muted flex items-center gap-1.5">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <svg className="h-3 w-3 text-muted-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/#comparisons" className="hover:text-charcoal transition-colors">Comparisons</Link>
            <svg className="h-3 w-3 text-muted-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="text-charcoal font-medium">{comparison.title}</span>
          </nav>
          <div className="py-12 sm:py-16 text-center">
            <ScrollReveal>
              <h1 className="text-3xl font-bold text-charcoal sm:text-4xl">{comparison.title}</h1>
              <p className="mt-4 text-lg text-muted max-w-xl mx-auto">{comparison.description}</p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[{ tool: toolA, total: totalA, otherTotal: totalB }, { tool: toolB, total: totalB, otherTotal: totalA }].map(({ tool, total, otherTotal }) => (
              <div key={tool.name} className={`rounded-[32px] border-2 p-7 ${total >= otherTotal && total !== otherTotal ? "border-evergreen bg-green-light" : total === otherTotal ? "border-evergreen/50 bg-green-light/50" : "border-border bg-white"}`}>
                {total > otherTotal && (
                  <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-evergreen px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Our Pick
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-charcoal text-lg font-bold text-white">
                    {tool.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-charcoal">{tool.name}</h2>
                    <p className="text-sm text-muted">{tool.price}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <RatingBadge rating={tool.rating} />
                  <span className="text-xs text-muted">Overall</span>
                </div>
                <p className="mt-3 text-sm text-muted">Best for: <span className="font-medium text-charcoal">{tool.bestFor}</span></p>
                <div className="mt-6 space-y-3">
                  {scoreLabels.map((key) => {
                    const otherTool = tool === toolA ? toolB : toolA;
                    return (
                      <ScoreBar key={key} score={tool.scores[key]} label={scoreLabelNames[key]} isWinner={tool.scores[key] >= otherTool.scores[key]} />
                    );
                  })}
                </div>
                <a
                  href={tool.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={`btn-pill w-full mt-6 justify-center ${total >= otherTotal ? "bg-charcoal text-white" : "bg-stone text-charcoal hover:bg-charcoal hover:text-white"}`}
                >
                  Try {tool.name}
                </a>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Comparison Table */}
        <ScrollReveal>
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-charcoal">Feature Comparison</h2>
            <div className="mt-6 overflow-hidden rounded-[24px] border border-border">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-charcoal text-white">
                    <th className="px-5 py-4 font-semibold">Feature</th>
                    <th className="px-5 py-4 font-semibold">{toolA.name}</th>
                    <th className="px-5 py-4 font-semibold">{toolB.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.comparisonTable.map((row, i) => (
                    <tr key={i} className={`border-t border-border ${i % 2 === 0 ? 'bg-white' : 'bg-stone'}`}>
                      <td className="px-5 py-3.5 font-medium text-charcoal">{row.feature}</td>
                      <td className="px-5 py-3.5 text-muted">{row.toolA}</td>
                      <td className="px-5 py-3.5 text-muted">{row.toolB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </ScrollReveal>

        {/* Verdict */}
        <ScrollReveal>
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-charcoal">Our Verdict</h2>
            <div className="mt-6 rounded-[32px] bg-charcoal p-10">
              <p className="text-base leading-relaxed text-white/60">{comparison.verdict}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={toolA.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow" className="btn-pill bg-evergreen text-white flex-1 justify-center">
                  Try {toolA.name}
                </a>
                <a href={toolB.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow" className="btn-pill border border-white/20 bg-transparent text-white flex-1 justify-center hover:bg-white/10">
                  Try {toolB.name}
                </a>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </>
  );
}
