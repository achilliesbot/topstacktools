import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "TopStackTools — Honest SaaS Reviews for Growing Businesses",
    template: "%s | TopStackTools",
  },
  description:
    "Independent, in-depth reviews and comparisons of the best SaaS and business tools. No pay-for-placement. No fluff. Just honest analysis from real testing.",
  other: {
    "impact-site-verification": "0e4833c9-04d4-435f-940e-7f08b21f218a",
    "google-site-verification": "bYskhLjuY7A8H5sUWliatPYFJw4IvgCZksxSyXVJeCs",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://topstacktools.com",
    siteName: "TopStackTools",
    title: "TopStackTools — Honest SaaS Reviews for Growing Businesses",
    description:
      "Independent, in-depth reviews and comparisons of the best SaaS and business tools. No pay-for-placement. No fluff.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TopStackTools — Honest SaaS Reviews for Growing Businesses",
    description:
      "Independent, in-depth reviews and comparisons of the best SaaS and business tools. No pay-for-placement. No fluff.",
  },
};

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal">
            <span className="text-xs font-bold text-white tracking-tight">TS</span>
          </div>
          <span className="text-base font-bold tracking-tight text-charcoal">
            TopStackTools
          </span>
        </Link>
        <div className="hidden items-center gap-8 sm:flex">
          <Link href="/#reviews" className="text-sm font-medium text-muted hover:text-charcoal transition-colors">
            Reviews
          </Link>
          <Link href="/#comparisons" className="text-sm font-medium text-muted hover:text-charcoal transition-colors">
            Comparisons
          </Link>
          <Link href="/blog" className="text-sm font-medium text-muted hover:text-charcoal transition-colors">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted hover:text-charcoal transition-colors">
            About
          </Link>
          <Link
            href="/#reviews"
            className="btn-pill bg-charcoal text-white !py-2.5 !px-6 !text-[11px]"
          >
            Get Started
          </Link>
        </div>
        <div className="sm:hidden">
          <Link href="/#reviews" className="text-sm font-medium text-muted">
            Menu
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-charcoal mt-auto">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        {/* Feature bar */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 pb-12 border-b border-white/10">
          {[
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Independent Reviews" },
            { icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z", label: "Hands-on Testing" },
            { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Updated Weekly" },
            { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", label: "No Pay-for-Placement" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center gap-3">
              <svg className="h-6 w-6 text-evergreen" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
              <span className="text-xs font-medium text-white/70 uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 pt-12">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <span className="text-xs font-bold text-white">TS</span>
              </div>
              <span className="text-sm font-bold text-white">TopStackTools</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              Independent reviews you can trust. We test every tool so you don&apos;t have to.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">Reviews</p>
            <ul className="mt-4 space-y-3">
              {["HubSpot CRM", "Notion", "Semrush", "Jasper AI", "Hostinger", "Systeme.io"].map((name) => (
                <li key={name}><Link href={`/reviews/${name.toLowerCase().replace(/[.\s]/g, '-').replace('--', '-')}`} className="text-sm text-white/60 hover:text-white transition-colors">{name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">Compare</p>
            <ul className="mt-4 space-y-3">
              <li><Link href="/comparisons/notion-vs-monday" className="text-sm text-white/60 hover:text-white transition-colors">Notion vs Monday</Link></li>
              <li><Link href="/comparisons/hubspot-vs-salesforce" className="text-sm text-white/60 hover:text-white transition-colors">HubSpot vs Salesforce</Link></li>
              <li><Link href="/comparisons/jasper-vs-chatgpt" className="text-sm text-white/60 hover:text-white transition-colors">Jasper vs ChatGPT</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">Transparency</p>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              We earn commissions from some links. This never affects our reviews or rankings.
            </p>
            <div className="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <svg className="h-4 w-4 text-evergreen shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span className="text-xs text-white/60">Every review based on real testing</span>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} TopStackTools. All rights reserved.</p>
          <p className="text-xs text-white/30">Independent reviews, affiliate supported.</p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full`}>
      <head>
        <meta name="impact-site-verification" content="0e4833c9-04d4-435f-940e-7f08b21f218a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TopStackTools",
              url: "https://topstacktools.com",
              description:
                "Independent, in-depth reviews and comparisons of the best SaaS and business tools.",
              sameAs: [],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init('phc_LP1amTFJFrIRRzyhvCmm5QjwPaFBbqLnDPbX2eowQDQ', {api_host: 'https://us.i.posthog.com'})
`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
