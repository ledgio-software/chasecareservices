/** Reports & analytics: date ranges, labels, and CSV rows. No server code: unit tested. */

export type Bucket = { key: string; n: number; done?: number };
export type ReportStats = {
  range: { from: string; to: string };
  enquiries: { total: number; converted: number; from_abroad: number; by_type: Bucket[]; by_country: Bucket[]; by_month: Bucket[] };
  care: {
    active_clients: number;
    visits: number;
    visits_done: number;
    visits_missed: number;
    reports: number;
    reports_with_concern: number;
    incidents: Bucket[];
    visits_by_month: Bucket[];
  };
  recruitment: { new_applicants: number; placed: number; by_stage: Bucket[] };
  academy: { enrolments: number; completions: number; certificates: number; cpd_hours: number; by_course: Bucket[] };
  community: { events: number; registrations: number; attended: number; marked: number };
  newsletter: { subscribers: number; new: number };
  documents: { expired: number; expiring: number; to_check: number } | null;
  wellbeing: { requests: number; by_kind: Bucket[] } | null;
};

const iso = (d: Date) => d.toISOString().slice(0, 10);
const utc = (y: number, m: number, d: number) => new Date(Date.UTC(y, m, d));

export const PRESETS = ["this-month", "last-month", "last-30", "last-90", "this-year", "last-year"] as const;
export type Preset = (typeof PRESETS)[number];
export const PRESET_LABEL: Record<Preset, string> = {
  "this-month": "This month",
  "last-month": "Last month",
  "last-30": "Last 30 days",
  "last-90": "Last 3 months",
  "this-year": "This year",
  "last-year": "Last year",
};

/** A preset (or custom from/to) → an inclusive date range. Falls back to this month. */
export function resolveRange(p: { preset?: string; from?: string; to?: string }, today = iso(new Date())): { from: string; to: string; preset: Preset | "custom" } {
  const DATE = /^\d{4}-\d{2}-\d{2}$/;
  if (p.from && p.to && DATE.test(p.from) && DATE.test(p.to) && p.from <= p.to) {
    const days = (Date.parse(p.to) - Date.parse(p.from)) / 86400_000;
    if (days <= 731) return { from: p.from, to: p.to, preset: "custom" };
  }
  const [y, m, d] = today.split("-").map(Number);
  const preset = (PRESETS as readonly string[]).includes(p.preset ?? "") ? (p.preset as Preset) : "this-month";
  switch (preset) {
    case "last-month":
      return { from: iso(utc(y, m - 2, 1)), to: iso(utc(y, m - 1, 0)), preset };
    case "last-30":
      return { from: iso(utc(y, m - 1, d - 29)), to: today, preset };
    case "last-90":
      return { from: iso(utc(y, m - 1, d - 89)), to: today, preset };
    case "this-year":
      return { from: `${y}-01-01`, to: today, preset };
    case "last-year":
      return { from: `${y - 1}-01-01`, to: `${y - 1}-12-31`, preset };
    default:
      return { from: iso(utc(y, m - 1, 1)), to: today, preset: "this-month" };
  }
}

export const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : null);

/** Every month from `from` to `to` (yyyy-mm), so charts show empty months as zero. */
export function monthsBetween(from: string, to: string) {
  const out: string[] = [];
  let [y, m] = from.slice(0, 7).split("-").map(Number);
  const [ty, tm] = to.slice(0, 7).split("-").map(Number);
  while (y < ty || (y === ty && m <= tm)) {
    out.push(`${y}-${String(m).padStart(2, "0")}`);
    m++;
    if (m > 12) {
      m = 1;
      y++;
    }
  }
  return out;
}

/** "Nov '26" (not "Nov 26", which reads like a day). */
export const monthLabel = (k: string) => `${new Date(`${k}-01T00:00:00Z`).toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" })} '${k.slice(2, 4)}`;

/** Fill missing months with zero, in order. */
export function fillMonths(rows: Bucket[], from: string, to: string): Bucket[] {
  const map = new Map(rows.map((r) => [r.key, r]));
  return monthsBetween(from, to).map((k) => map.get(k) ?? { key: k, n: 0, done: 0 });
}

/** One flat table of everything, for the CSV download. */
export function reportCsvRows(s: ReportStats, label: (section: string, key: string) => string): string[][] {
  const rows: string[][] = [["Section", "Measure", "Value"]];
  const add = (section: string, measure: string, value: number | string | null | undefined) => rows.push([section, measure, value == null ? "" : String(value)]);
  const list = (section: string, prefix: string, b: Bucket[]) => b.forEach((x) => add(section, `${prefix}: ${label(prefix, x.key)}`, x.n));
  add("Period", "From", s.range.from);
  add("Period", "To", s.range.to);
  add("Care requests & enquiries", "Total", s.enquiries.total);
  add("Care requests & enquiries", "Converted to clients or applicants", s.enquiries.converted);
  add("Care requests & enquiries", "From outside Ghana", s.enquiries.from_abroad);
  list("Care requests & enquiries", "Type", s.enquiries.by_type);
  list("Care requests & enquiries", "Country", s.enquiries.by_country);
  list("Care requests & enquiries", "Month", s.enquiries.by_month);
  add("Care", "Clients receiving care (now)", s.care.active_clients);
  add("Care", "Visits", s.care.visits);
  add("Care", "Visits with a report", s.care.visits_done);
  add("Care", "Visits missed (no report)", s.care.visits_missed);
  add("Care", "Report submission rate %", pct(s.care.visits_done, s.care.visits));
  add("Care", "Reports with a concern", s.care.reports_with_concern);
  list("Care", "Incidents", s.care.incidents);
  add("Recruitment", "New applicants", s.recruitment.new_applicants);
  add("Recruitment", "Placed", s.recruitment.placed);
  list("Recruitment", "Stage", s.recruitment.by_stage);
  add("Academy", "Enrolments", s.academy.enrolments);
  add("Academy", "Completions", s.academy.completions);
  add("Academy", "Certificates issued", s.academy.certificates);
  add("Academy", "CPD hours awarded", s.academy.cpd_hours);
  list("Academy", "Course", s.academy.by_course);
  add("Community", "Events", s.community.events);
  add("Community", "Registrations", s.community.registrations);
  add("Community", "Attended", s.community.attended);
  add("Newsletter", "Subscribers (now)", s.newsletter.subscribers);
  add("Newsletter", "New subscribers", s.newsletter.new);
  if (s.documents) {
    add("Worker documents (now)", "Expired", s.documents.expired);
    add("Worker documents (now)", "Expiring within 30 days", s.documents.expiring);
    add("Worker documents (now)", "Waiting to be checked", s.documents.to_check);
  }
  if (s.wellbeing) {
    add("Wellbeing (confidential totals)", "Requests", s.wellbeing.requests);
    list("Wellbeing (confidential totals)", "Kind", s.wellbeing.by_kind);
  }
  return rows;
}

/** CSV with every cell quoted and spreadsheet formulas defused. */
export function toCsv(rows: string[][]) {
  const cell = (s: string) => `"${(/^[=+\-@]/.test(s) ? `'${s}` : s).replace(/"/g, '""')}"`;
  return rows.map((r) => r.map(cell).join(",")).join("\r\n");
}
