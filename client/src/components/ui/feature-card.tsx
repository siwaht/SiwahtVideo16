import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;
  return (
    <article className="feature-card">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className={`feature-icon ${feature.bgColor} icon-gradient flex-shrink-0`}>
          <Icon className={`${feature.iconColor} h-5 w-5 sm:h-6 sm:w-6`} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{feature.description}</p>
        </div>
      </div>
    </article>
  );
}

interface FeatureListProps {
  features: Feature[];
}

export function FeatureList({ features }: FeatureListProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {features.map((feature, index) => (
        <FeatureCard key={index} feature={feature} />
      ))}
    </div>
  );
}
