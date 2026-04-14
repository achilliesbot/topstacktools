"use client";

const logos = [
  "HubSpot", "Notion", "Jasper AI", "Hostinger", "Semrush",
  "Systeme.io", "Monday.com", "Salesforce", "ChatGPT",
];

export default function LogoMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-white py-6">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

      <div className="flex animate-marquee whitespace-nowrap">
        {[...logos, ...logos, ...logos].map((name, i) => (
          <div
            key={i}
            className="mx-8 flex items-center gap-2 text-sm font-semibold tracking-wide text-muted-light/60 uppercase shrink-0 select-none"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface text-[10px] font-black text-muted-light/80">
              {name.charAt(0)}
            </span>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
