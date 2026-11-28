import Link from "next/link";
import { BarList, MonthColumns, StatTile } from "@/components/reports/Charts";
import { Notice, PageHeader } from "@/components/admin/ui";
import { requirePermission } from "@/lib/admin/session";
import { STAGES } from "@/lib/recruitment";
import { PRESETS, PRESET_LABEL, fillMonths, pct, resolveRange, type ReportStats } from "@/lib/reports";
import { reportLabel } from "@/lib/reports-labels";

export const metadata = { title: "Reports" };

const fmt = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`${id}-h`} className="mb-10">
      <h2 id={`${id}-h`} className="text-xl font-bold text-brand-900">
        {title}
      </h2>
      {intro && <p className="mb-3 text-sm text-muted">{intro}</p>}
      <div className={intro ? "" : "mt-3"}>{children}</div>
    </section>
  );
}

export default async function ReportsPage({ searchParams }: { searchParams: Promise<{ preset?: string; from?: string; to?: string }> }) {
  const sp = await searchParams;
  const staff = await requirePermission("reports.view");
  const range = resolveRange(sp);
  const { data, error } = await staff.supabase.rpc("report_stats", { from_date: range.from, to_date: range.to });
  const s = data as unknown as ReportStats | null;
  const qs = range.preset === "custom" ? `from=${range.from}&to=${range.to}` : `preset=${range.preset}`;

  return (
    <>
      <PageHeader
        title="Reports"
        intro={`Totals for ${fmt(range.from)} – ${fmt(range.to)}. Numbers only: no names or personal details.`}
        actions={
          staff.can("reports.export") ? (
            <a href={`/admin/reports/export?${qs}`} className="inline-flex min-h-11 items-center rounded-full bg-brand-800 px-5 text-sm font-semibold text-white hover:bg-brand-700">
              Download CSV
            </a>
          ) : null
        }
      />

      <div className="mb-8 flex flex-wrap items-end gap-3">
        <nav aria-label="Period" className="flex flex-wrap gap-2 text-sm">
          {PRESETS.map((p) => (
            <Link
              key={p}
              href={`/admin/reports?preset=${p}`}
              aria-current={range.preset === p ? "page" : undefined}
              className={`inline-flex min-h-10 items-center rounded-full px-4 font-semibold ${range.preset === p ? "bg-brand-800 text-white" : "bg-white text-brand-800 ring-1 ring-gray-200 hover:bg-brand-50"}`}
            >
              {PRESET_LABEL[p]}
            </Link>
          ))}
        </nav>
        <form action="/admin/reports" className="flex flex-wrap items-end gap-2 text-sm">
          <label className="font-medium text-brand-900">
            From
            <input type="date" name="from" defaultValue={range.from} required className="ml-1 min-h-10 rounded-lg border border-gray-300 bg-white px-2" />
          </label>
          <label className="font-medium text-brand-900">
            To
            <input type="date" name="to" defaultValue={range.to} required className="ml-1 min-h-10 rounded-lg border border-gray-300 bg-white px-2" />
          </label>
          <button type="submit" className="min-h-10 rounded-full px-4 font-semibold text-brand-800 ring-1 ring-brand-300 hover:bg-brand-50">
            Show
          </button>
        </form>
      </div>

      {error || !s ? (
        <Notice tone="error">The reports couldn&apos;t be loaded. Please try again.</Notice>
      ) : (
        <>
          <Section id="enq" title="Care requests & enquiries" intro="Everything sent through the website's forms in this period.">
            <dl className="mb-4 grid gap-3 sm:grid-cols-3">
              <StatTile label="Enquiries" value={s.enquiries.total} />
              <StatTile label="From outside Ghana (diaspora)" value={s.enquiries.from_abroad} sub={pct(s.enquiries.from_abroad, s.enquiries.total) != null ? `${pct(s.enquiries.from_abroad, s.enquiries.total)}% of all` : undefined} />
              <StatTile label="Turned into clients or applicants" value={s.enquiries.converted} sub={pct(s.enquiries.converted, s.enquiries.total) != null ? `${pct(s.enquiries.converted, s.enquiries.total)}% of all` : undefined} />
            </dl>
            <div className="grid gap-4 lg:grid-cols-2">
              <BarList title="By type" rows={s.enquiries.by_type} label={(k) => reportLabel("Type", k)} />
              <BarList title="By country" rows={s.enquiries.by_country} />
              <div className="lg:col-span-2">
                <MonthColumns title="Enquiries per month" rows={fillMonths(s.enquiries.by_month, range.from, range.to)} unit="enquiries" />
              </div>
            </div>
          </Section>

          <Section id="care" title="Care" intro="Visits up to today. A visit counts as done when the care worker sends a report.">
            <dl className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <StatTile label="Clients receiving care" value={s.care.active_clients} sub="Now" />
              <StatTile label="Visits" value={s.care.visits} />
              <StatTile
                label="Report submission rate"
                value={pct(s.care.visits_done, s.care.visits) != null ? `${pct(s.care.visits_done, s.care.visits)}%` : "—"}
                sub={`${s.care.visits_done} of ${s.care.visits} visits`}
                tone={pct(s.care.visits_done, s.care.visits) == null ? undefined : pct(s.care.visits_done, s.care.visits)! >= 90 ? "good" : pct(s.care.visits_done, s.care.visits)! >= 70 ? "warn" : "bad"}
              />
              <StatTile label="Missed visits (no report)" value={s.care.visits_missed} tone={s.care.visits_missed ? "bad" : undefined} />
              <StatTile label="Reports with a concern" value={s.care.reports_with_concern} sub={`of ${s.care.reports} reports`} />
            </dl>
            <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
              <MonthColumns title="Visits per month" rows={fillMonths(s.care.visits_by_month, range.from, range.to)} unit="visits" doneLabel="with a report" />
              <BarList
                title="Incidents by severity"
                rows={["serious", "moderate", "minor"].map((k) => ({ key: k, n: s.care.incidents.find((i) => i.key === k)?.n ?? 0 })).filter((r) => r.n)}
                label={(k) => reportLabel("Incidents", k)}
                empty="No incidents in this period."
              />
            </div>
          </Section>

          <Section id="rec" title="Recruitment" intro="New applicants and placements in this period; the funnel shows where everyone who applied by the end of it is now.">
            <dl className="mb-4 grid gap-3 sm:grid-cols-2">
              <StatTile label="New applicants" value={s.recruitment.new_applicants} />
              <StatTile label="Placed with clients" value={s.recruitment.placed} />
            </dl>
            <BarList
              title="Recruitment funnel (current stage)"
              rows={[...STAGES.map((st) => st.key), "rejected", "withdrawn"].map((k) => ({ key: k, n: s.recruitment.by_stage.find((b) => b.key === k)?.n ?? 0 }))}
              label={(k) => reportLabel("Stage", k)}
            />
          </Section>

          <Section id="acad" title="ChaseCare Academy">
            <dl className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <StatTile label="Enrolments" value={s.academy.enrolments} />
              <StatTile label="Completions" value={s.academy.completions} />
              <StatTile label="Certificates issued" value={s.academy.certificates} />
              <StatTile label="CPD hours awarded" value={Number(s.academy.cpd_hours)} />
            </dl>
            <BarList title="Enrolments by course" rows={s.academy.by_course} empty="No enrolments in this period." />
          </Section>

          <Section id="comm" title="Community & newsletter">
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <StatTile label="Events held" value={s.community.events} />
              <StatTile label="Registrations" value={s.community.registrations} />
              <StatTile
                label="Attendance"
                value={pct(s.community.attended, s.community.marked) != null ? `${pct(s.community.attended, s.community.marked)}%` : "—"}
                sub={s.community.marked ? `${s.community.attended} came, of ${s.community.marked} marked` : "Mark attendance on each event"}
              />
              <StatTile label="Newsletter subscribers" value={s.newsletter.subscribers} sub="Now" />
              <StatTile label="New subscribers" value={s.newsletter.new} />
            </dl>
          </Section>

          {s.documents && (
            <Section id="docs" title="Worker documents (today)">
              <dl className="grid gap-3 sm:grid-cols-3">
                <StatTile label="Expired" value={s.documents.expired} tone={s.documents.expired ? "bad" : "good"} />
                <StatTile label="Expiring within 30 days" value={s.documents.expiring} tone={s.documents.expiring ? "warn" : undefined} />
                <StatTile label="Waiting to be checked" value={s.documents.to_check} />
              </dl>
              <p className="mt-2 text-sm">
                <Link href="/admin/worker-documents" className="font-semibold text-brand-700 underline">
                  Open worker documents
                </Link>
              </p>
            </Section>
          )}

          {s.wellbeing && (
            <Section id="wb" title="Wellbeing Hub (confidential totals)" intro="Visible to the wellbeing team and the owner only. Totals, never who asked.">
              <dl className="mb-4 grid gap-3 sm:grid-cols-3">
                <StatTile label="Support requests" value={s.wellbeing.requests} />
              </dl>
              <BarList title="By kind of support" rows={s.wellbeing.by_kind} label={(k) => reportLabel("Kind", k)} empty="No requests in this period." />
            </Section>
          )}
          <p className="text-xs text-muted">Website visitor numbers aren&apos;t included: they need an analytics service (e.g. Plausible or Google Analytics) connected first.</p>
        </>
      )}
    </>
  );
}
