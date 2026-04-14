import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About Us — How We Review Tools",
  description: "Learn about TopStackTools — an independent review site for business and SaaS tools.",
};

export default function AboutPage() {
  return (
    <>
      <div style={{ background: "linear-gradient(180deg, #eef3ec 0%, #ffffff 100%)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <nav className="pt-6 text-sm text-muted flex items-center gap-1.5">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <svg className="h-3 w-3 text-muted-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="text-charcoal font-medium">About</span>
          </nav>
          <div className="py-12 sm:py-16">
            <ScrollReveal>
              <h1 className="text-3xl font-bold text-charcoal sm:text-4xl">About TopStackTools</h1>
              <p className="mt-4 text-lg text-muted max-w-2xl">
                Independent reviews built to help you choose the right tools. No sponsors. No pay-for-placement. Just honest testing.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 space-y-16">
        <ScrollReveal>
          <section>
            <h2 className="text-2xl font-bold text-charcoal">Our Review Process</h2>
            <div className="mt-8 space-y-4">
              {[
                { step: "01", title: "Sign Up & Test", desc: "We sign up for every tool using a real account \u2014 no demo access or vendor-provided sandboxes." },
                { step: "02", title: "Deep Evaluation", desc: "We test core features, pricing accuracy, onboarding experience, support quality, and integrations." },
                { step: "03", title: "Score & Compare", desc: "Each tool is scored on a 10-point scale across features, ease of use, value, support, and integrations." },
                { step: "04", title: "Publish Honestly", desc: "We publish real pros, cons, and a clear verdict \u2014 even when it means giving a low score." },
              ].map((item) => (
                <div key={item.step} className="flex gap-5 rounded-[24px] border border-border bg-white p-6">
                  <span className="text-2xl font-bold text-evergreen/30 shrink-0">{item.step}</span>
                  <div>
                    <p className="font-bold text-charcoal">{item.title}</p>
                    <p className="mt-1.5 text-sm text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section>
            <h2 className="text-2xl font-bold text-charcoal">How We Make Money</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              TopStackTools earns revenue through affiliate partnerships. When you click a link and sign up, we may earn a commission at no extra cost to you.
            </p>
            <div className="mt-6 rounded-[28px] bg-stone p-8">
              <p className="font-bold text-charcoal">What this means for you:</p>
              <ul className="mt-4 space-y-3">
                {[
                  "Our reviews are never influenced by affiliate partnerships",
                  "We review tools we believe in, not tools that pay the most",
                  "We never accept payment for reviews or rankings",
                  "You pay the same price \u2014 our commission comes from the vendor",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-charcoal">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-evergreen" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section>
            <h2 className="text-2xl font-bold text-charcoal">Our Promise</h2>
            <StaggerContainer className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { title: "Independence", desc: "No vendor has editorial control. Period." },
                { title: "Honesty", desc: "If a tool has problems, we say so." },
                { title: "Depth", desc: "Surface-level reviews help nobody." },
                { title: "Freshness", desc: "We update when pricing or features shift." },
              ].map((item) => (
                <StaggerItem key={item.title}>
                  <div className="rounded-[24px] border border-border bg-white p-6">
                    <p className="font-bold text-charcoal">{item.title}</p>
                    <p className="mt-1.5 text-sm text-muted">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        </ScrollReveal>
      </div>
    </>
  );
}
