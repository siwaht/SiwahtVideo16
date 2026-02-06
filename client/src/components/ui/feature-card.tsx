import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  title: string;
  description: string;
}

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <article className="group flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 hover:bg-slate-50/80">
      <div className={`w-11 h-11 ${feature.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
        <Icon className={`${feature.iconColor} h-5 w-5`} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">{feature.title}</h3>
        <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed">{feature.description}</p>
      </div>
    </article>
  );
}

export function FeatureList({ features }: { features: Feature[] }) {
  return (
    <div className="space-y-2">
      {features.map((feature, index) => (
        <FeatureCard key={index} feature={feature} />
      ))}
    </div>
  );
}
