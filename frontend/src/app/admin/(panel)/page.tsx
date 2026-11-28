import Link from "next/link";
import { Card, Notice, PageHeader, StatusBadge, formatDateTime } from "@/components/admin/ui";
import { requireStaff } from "@/lib/admin/session";
import { RESOURCES } from "@/lib/admin/resources";
import { CONTACT_TOPICS } from "@/lib/enquiry-topics";
import { pct, resolveRange, type ReportStats } from "@/lib/reports";

export const metadata = { title: "Overview" };

const topicLabel = (t: string) => CONTACT_TOPICS.find((c) => c.value === t)?.label ?? t;

export default async function OverviewPage({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const { denied } = await searchParams;
  const staff = await requireStaff();
  const db = staff.supabase;

  const canEnquiries = staff.can("enquiries.view");
  const [counts, recent, services, posts] = await Promise.all([
    canEnquiries ? db.rpc("enquiry_counts") : Promise.resolve({ data: [] }),
    canEnquiries
      ? db.from("enquiries").select("id, enquiry_type, status, full_name, country, created_at").order("created_at", { ascending: false }).limit(6)
      : Promise.resolve({ data: [] }),
    db.from("services").select("id", { count: "exact", head: true }).eq("status", "published"),
    db.from("posts").select("id", { count: "exact", head: true }).eq("status", "published"),
  ]);

  const care = staff.can("care_ops.view") ? (await db.rpc("care_report_counts")).data?.[0] : null;
  const missedVisits = staff.can("care_ops.view") ? Number((await db.rpc("missed_visit_count")).data ?? 0) : 0;
  const incidents = staff.can("care_ops.view") ? (await db.rpc("care_incident_counts")).data?.[0] : null;

  // This month at a glance (totals from the Reports page).
  const month = resolveRange({ preset: "this-month" });
  const glance = staff.can("reports.view") ? ((await db.rpc("report_stats", { from_date: month.from, to_date: month.to })).data as unknown as ReportStats | null) : null;

  const quickLinks = [
    ...(staff.can("content.edit") ? [{ label: "Homepage slider & banners", href: "/admin/homepage" }] : []),
    ...RESOURCES.filter((r) => staff.can(`${r.section}.view`)).map((r) => ({ label: r.title, href: `/admin/content/${r.key}` })),
    ...(staff.can("media.view") ? [{ label: "Media library", href: "/admin/media" }] : []),
  ];

  const byStatus = new Map((counts.data ?? []).map((c) => [c.status as string, Number(c.total)]));
  const stats = [
    canEnquiries && { label: "New enquiries", value: byStatus.get("new") ?? 0, href: "/admin/enquiries?status=new", highlight: true },
    canEnquiries && { label: "In progress", value: byStatus.get("in_progress") ?? 0, href: "/admin/enquiries?status=in_progress" },
    { label: "Published services", value: services.count ?? 0 },
    { label: "Published articles", value: posts.count ?? 0 },
  ].filter(Boolean) as { label: string; value: number; href?: string; highlight?: boolean }[];

  const firstName = staff.displayName.split(" ")[0];

  return (
    <>
      {denied && <Notice tone="error">You don&apos;t have permission to open that section.</Notice>}
      <PageHeader title={`Welcome, ${firstName}`} intro="Here's what is happening on the Chase Care website." />

      <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const inner = (
            <>
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className={`mt-1 text-3xl font-bold ${s.highlight && s.value > 0 ? "text-accent-700" : "text-brand-900"}`}>{s.value}</dd>
            </>
          );
          return s.href ? (
            <Link key={s.label} href={s.href} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 hover:ring-brand-300">
              {inner}
            </Link>
          ) : (
            <div key={s.label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
              {inner}
            </div>
          );
        })}
      </dl>

      {glance && (
        <section aria-labelledby="glance-h" className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-gray-200">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="glance-h" className="font-bold text-brand-900">
              This month at a glance
            </h2>
            <Link href="/admin/reports" className="text-sm font-semibold text-brand-700 underline">
              All reports
            </Link>
          </div>
          <dl className="mt-3 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-3 xl:grid-cols-6">
            {[
              ["Care requests", glance.enquiries.by_type.find((b) => b.key === "care_request")?.n ?? 0],
              ["From the diaspora", glance.enquiries.from_abroad],
              ["New applicants", glance.recruitment.new_applicants],
              ["Visits", glance.care.visits],
              ["Report rate", pct(glance.care.visits_done, glance.care.visits) != null ? `${pct(glance.care.visits_done, glance.care.visits)}%` : "—"],
              ["Course enrolments", glance.academy.enrolments],
            ].map(([k, v]) => (
              <div key={String(k)}>
                <dt className="text-muted">{k}</dt>
                <dd className="text-xl font-bold tabular-nums text-brand-900">{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {canEnquiries && (
        <Card title="Latest enquiries" className="mt-8">
          {(recent.data ?? []).length === 0 ? (
            <p className="text-muted">No enquiries yet.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {(recent.data ?? []).map((e) => (
                <li key={e.id}>
                  <Link href={`/admin/enquiries/${e.id}`} className="flex flex-wrap items-center justify-between gap-2 py-3 hover:bg-gray-50">
                    <span>
                      <span className="font-semibold text-brand-900">{e.full_name}</span>
                      <span className="block text-sm text-muted">
                        {topicLabel(e.enquiry_type)}
                        {e.country && e.country !== "Ghana" ? ` · ${e.country}` : ""}
                      </span>
                    </span>
                    <span className="flex items-center gap-3 text-sm text-muted">
                      {formatDateTime(e.created_at)}
                      <StatusBadge status={e.status} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link href="/admin/enquiries" className="mt-4 inline-block text-sm font-semibold text-brand-700 underline">
            Open the inbox
          </Link>
        </Card>
      )}

      {care && (
        <Card title="Care reports" className="mt-8">
          {Number(care.urgent) > 0 && (
            <p role="alert" className="mb-3 rounded-xl border-2 border-red-300 bg-red-50 px-4 py-3 font-semibold text-red-800">
              <span aria-hidden="true">‼ </span>
              {Number(care.urgent)} urgent {Number(care.urgent) === 1 ? "report needs" : "reports need"} attention today.
            </p>
          )}
          <p className="text-ink">
            {Number(care.to_read) === 0 ? (
              "All care reports have been read."
            ) : (
              <>
                <strong className="text-brand-900">{Number(care.to_read)}</strong> {Number(care.to_read) === 1 ? "report is" : "reports are"} waiting to be read
                {Number(care.monitor) > 0 ? `, including ${care.monitor} to keep an eye on` : ""}.
              </>
            )}
          </p>
          {Number(incidents?.open ?? 0) > 0 && (
            <p className="mt-2 font-semibold text-red-800">
              <span aria-hidden="true">! </span>
              {Number(incidents?.open) === 1 ? "1 incident needs" : `${incidents?.open} incidents need`} follow-up
              {Number(incidents?.serious_open ?? 0) > 0 ? ` (${incidents?.serious_open} serious)` : ""}.{" "}
              <Link href="/admin/incidents" className="underline">
                See incidents
              </Link>
            </p>
          )}
          {missedVisits > 0 && (
            <p className="mt-2 font-semibold text-red-800">
              <span aria-hidden="true">! </span>
              {missedVisits === 1 ? "1 visit" : `${missedVisits} visits`} in the last 7 days had no report.{" "}
              <Link href="/admin/care-schedule" className="underline">
                See the schedule
              </Link>
            </p>
          )}
          <Link href="/admin/care-reports" className="mt-3 inline-flex min-h-11 items-center rounded-full bg-brand-800 px-5 text-sm font-semibold text-white hover:bg-brand-700">
            Read care reports
          </Link>
        </Card>
      )}

      {quickLinks.length > 0 && (
        <Card title="Edit the website" className="mt-8">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-xl border border-gray-200 px-4 py-3 font-medium text-brand-800 hover:border-brand-300 hover:bg-brand-50">
                  {l.label} →
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
}
