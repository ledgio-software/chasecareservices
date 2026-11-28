import type { ReactNode } from "react";
import { monthLabel, type Bucket } from "@/lib/reports";

/** Bar colour: brand purple step that passes the chart palette checks on white (L 0.43–0.78, ≥3:1). */
const BAR = "bg-[#6f3f97]";

export function StatTile({ label, value, sub, tone }: { label: string; value: ReactNode; sub?: ReactNode; tone?: "good" | "warn" | "bad" }) {
  const toneText = tone === "bad" ? "text-red-800" : tone === "warn" ? "text-amber-800" : tone === "good" ? "text-green-800" : "text-brand-900";
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-gray-200">
      <dt className="text-sm font-semibold text-muted">{label}</dt>
      <dd className={`mt-1 text-3xl font-bold tabular-nums ${toneText}`}>{value}</dd>
      {sub && <dd className="mt-0.5 text-xs text-muted">{sub}</dd>}
    </div>
  );
}

function TableView({ caption, rows, extra }: { caption: string; rows: Bucket[]; extra?: { head: string; value: (b: Bucket) => ReactNode } }) {
  return (
    <details className="mt-2 text-sm">
      <summary className="cursor-pointer text-xs font-semibold text-brand-700">Show as a table</summary>
      <table className="mt-2 w-full text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="text-xs uppercase text-muted">
          <tr>
            <th scope="col" className="py-1 pr-3">Item</th>
            <th scope="col" className="py-1 pr-3 text-right">Count</th>
            {extra && <th scope="col" className="py-1 text-right">{extra.head}</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((r) => (
            <tr key={r.key}>
              <td className="py-1 pr-3">{r.key}</td>
              <td className="py-1 pr-3 text-right tabular-nums">{r.n}</td>
              {extra && <td className="py-1 text-right tabular-nums">{extra.value(r)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

/** Ranked categories as horizontal bars: one hue, the value at the end of each bar. */
export function BarList({ title, rows, label = (k) => k, empty = "Nothing in this period." }: { title: string; rows: Bucket[]; label?: (key: string) => string; empty?: string }) {
  const max = Math.max(1, ...rows.map((r) => r.n));
  const named = rows.map((r) => ({ ...r, key: label(r.key) }));
  return (
    <figure className="rounded-2xl bg-white p-4 ring-1 ring-gray-200">
      <figcaption className="mb-3 font-semibold text-brand-900">{title}</figcaption>
      {named.length ? (
        <>
          <ul className="space-y-2">
            {named.map((r) => (
              <li key={r.key} className="grid grid-cols-[minmax(7rem,40%)_1fr] items-center gap-3 text-sm">
                <span className="truncate text-ink" title={r.key}>
                  {r.key}
                </span>
                <span className="flex items-center gap-2">
                  <span className={`block h-3 rounded-r-[4px] ${BAR}`} style={{ width: r.n ? `${Math.max(2, (r.n / max) * 100)}%` : 0 }} aria-hidden="true" />
                  <span className="tabular-nums text-ink">{r.n}</span>
                </span>
              </li>
            ))}
          </ul>
          <TableView caption={title} rows={named} />
        </>
      ) : (
        <p className="text-sm text-muted">{empty}</p>
      )}
    </figure>
  );
}

/** Counts per month as columns. Hover or focus a column for its value; the busiest and latest months are labelled. */
export function MonthColumns({ title, rows, unit, doneLabel }: { title: string; rows: Bucket[]; unit: string; doneLabel?: string }) {
  const max = Math.max(1, ...rows.map((r) => r.n));
  const peak = rows.reduce((a, b) => (b.n > a.n ? b : a), rows[0] ?? { key: "", n: 0 });
  const last = rows[rows.length - 1];
  const tip = (r: Bucket) => `${monthLabel(r.key)}: ${r.n} ${unit}${doneLabel && r.done != null ? `, ${r.done} ${doneLabel}` : ""}`;
  return (
    <figure className="rounded-2xl bg-white p-4 ring-1 ring-gray-200">
      <figcaption className="mb-3 font-semibold text-brand-900">{title}</figcaption>
      {rows.some((r) => r.n > 0) ? (
        <>
          <div className="flex h-40 items-end gap-[2px] border-b border-gray-200" role="list">
            {rows.map((r) => {
              const labelled = r.n > 0 && (r.key === peak.key || r.key === last?.key);
              return (
                <div key={r.key} role="listitem" tabIndex={0} aria-label={tip(r)} className="group relative flex h-full flex-1 flex-col items-center justify-end outline-none">
                  {labelled && <span className="mb-1 text-xs tabular-nums text-ink">{r.n}</span>}
                  <span className={`block w-full max-w-10 rounded-t-[4px] ${BAR} group-hover:opacity-80 group-focus:ring-2 group-focus:ring-brand-900`} style={{ height: `${(r.n / max) * 85}%`, minHeight: r.n ? 3 : 0 }} />
                  <span className="pointer-events-none absolute -top-8 z-10 hidden whitespace-nowrap rounded-md bg-brand-950 px-2 py-1 text-xs text-white group-hover:block group-focus:block">{tip(r)}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-1 flex gap-[2px] text-[0.65rem] text-muted" aria-hidden="true">
            {rows.map((r, i) => (
              <span key={r.key} className="flex-1 text-center">
                {rows.length <= 12 || i % Math.ceil(rows.length / 12) === 0 ? monthLabel(r.key) : ""}
              </span>
            ))}
          </div>
          <TableView
            caption={title}
            rows={rows.map((r) => ({ ...r, key: monthLabel(r.key) }))}
            extra={doneLabel ? { head: doneLabel[0].toUpperCase() + doneLabel.slice(1), value: (b) => b.done ?? 0 } : undefined}
          />
        </>
      ) : (
        <p className="text-sm text-muted">Nothing in this period.</p>
      )}
    </figure>
  );
}
