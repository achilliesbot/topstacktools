import Link from "next/link";
import {
  Users, LayoutDashboard, Sparkles, Globe, TrendingUp, Zap, Mail, Calculator,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  layout: LayoutDashboard,
  sparkles: Sparkles,
  globe: Globe,
  "trending-up": TrendingUp,
  zap: Zap,
  mail: Mail,
  calculator: Calculator,
};

interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export default function CategoryCard({ category }: { category: Category }) {
  const Icon = iconMap[category.icon] || Sparkles;

  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <article className="card-hover rounded-[24px] bg-white border border-border p-5 text-center h-full">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-stone text-evergreen">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-3 text-sm font-bold text-charcoal group-hover:text-evergreen transition-colors">
          {category.name}
        </h3>
        <p className="mt-1.5 text-xs text-muted line-clamp-2">{category.description}</p>
      </article>
    </Link>
  );
}
