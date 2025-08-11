// components/dashboard/metric.tsx
export function Metric({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-xl border p-4 flex flex-col gap-1 bg-background">
      <span className="text-sm text-muted-foreground">{title}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
}
