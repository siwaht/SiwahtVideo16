interface Stat {
  label: string;
  value: string;
  color: string;
}

export function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 text-center border border-slate-100/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
      <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">{stat.label}</div>
      <div className={`text-sm font-bold ${stat.color}`}>{stat.value}</div>
    </div>
  );
}

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  );
}
