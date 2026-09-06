import { TriangleAlert } from "lucide-react";

export default function ThingsToKnow({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <h3 className="mb-4 text-sm font-bold tracking-widest text-foreground uppercase">
        Things to Keep in Mind
      </h3>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3 text-sm text-foreground/80">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
