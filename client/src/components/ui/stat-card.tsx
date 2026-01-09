interface Stat {
  label: string;
  value: string;
  color: string;
}

interface StatCardProps {
  stat: Stat;
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <div className="glass-card p-2 sm:p-3 text-center">
      <div className="text-xs font-medium text-slate-600 mb-1">{stat.label}</div>
      <div className={`text-sm font-bold ${stat.color}`}>{stat.value}</div>
    </div>
  );
}

interface StatGridProps {
  stats: Stat[];
}

export function StatGrid({ stats }: StatGridProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  );
}
