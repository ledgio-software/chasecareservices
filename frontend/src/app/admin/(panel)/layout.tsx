import Link from "next/link";
import { AdminNav, type AdminNavGroup } from "@/components/admin/AdminNav";
import { LogoMark } from "@/components/LogoMark";
import { signOut } from "@/app/admin/actions";
import { requireStaff } from "@/lib/admin/session";
import { RESOURCES } from "@/lib/admin/resources";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const staff = await requireStaff();

  let newEnquiries = 0;
  if (staff.can("enquiries.view")) {
    const { count } = await staff.supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new");
    newEnquiries = count ?? 0;
  }

  let careToRead = 0;
  let missedVisits = 0;
  let openIncidents = 0;
  if (staff.can("care_ops.view")) {
    const [{ data }, { data: missed }, { data: incidents }] = await Promise.all([
      staff.supabase.rpc("care_report_counts"),
      staff.supabase.rpc("missed_visit_count"),
      staff.supabase.rpc("care_incident_counts"),
    ]);
    careToRead = Number(data?.[0]?.to_read ?? 0);
    missedVisits = Number(missed ?? 0);
    openIncidents = Number(incidents?.[0]?.open ?? 0);
  }

  let newApplications = 0;
  if (staff.can("workforce.view")) {
    const { data } = await staff.supabase.rpc("recruitment_new_applications");
    newApplications = Number(data ?? 0);
  }

  let docsAttention = 0;
  if (staff.can("workforce.view") || staff.can("care_ops.view")) {
    const { data } = await staff.supabase.rpc("credential_counts");
    const c = data?.[0];
    docsAttention = Number(c?.expired ?? 0) + Number(c?.expiring ?? 0) + Number(c?.to_check ?? 0);
  }

  let wellbeingNew = 0;
  if (staff.can("wellbeing.view")) {
    const { data } = await staff.supabase.rpc("wellbeing_counts");
    wellbeingNew = Number(data?.[0]?.new_requests ?? 0);
  }

  const contentLinks = RESOURCES.filter((r) => r.section !== "wellbeing" && staff.can(`${r.section}.view`)).map((r) => ({
    label: r.title,
    href: `/admin/content/${r.key}`,
  }));

  const groups: AdminNavGroup[] = [
    {
      items: [
        { label: "Overview", href: "/admin" },
        ...(staff.can("enquiries.view") ? [{ label: "Enquiries", href: "/admin/enquiries", badge: newEnquiries }] : []),
      ],
    },
    {
      title: "Care",
      items: [
        ...(staff.can("care_ops.view") ? [{ label: "Care reports", href: "/admin/care-reports", badge: careToRead }] : []),
        ...(staff.can("care_ops.view") ? [{ label: "Visit schedule", href: "/admin/care-schedule", badge: missedVisits }] : []),
        ...(staff.can("care_ops.view") ? [{ label: "Find a care worker", href: "/admin/matching" }] : []),
        ...(staff.can("care_ops.view") ? [{ label: "Availability", href: "/admin/availability" }] : []),
        ...(staff.can("care_ops.view") ? [{ label: "Incidents", href: "/admin/incidents", badge: openIncidents }] : []),
        ...(staff.can("clients.view") ? [{ label: "Clients", href: "/admin/clients" }] : []),
        ...(staff.can("clients.view") || staff.can("care_ops.view") ? [{ label: "Care workers", href: "/admin/care-workers" }] : []),
        ...(staff.can("workforce.view") ? [{ label: "Recruitment", href: "/admin/recruitment", badge: newApplications }] : []),
        ...(staff.can("workforce.view") || staff.can("care_ops.view") ? [{ label: "Worker documents", href: "/admin/worker-documents", badge: docsAttention }] : []),
      ],
    },
    {
      title: "Academy",
      items: staff.can("academy.view")
        ? [
            { label: "Online learning", href: "/admin/learning" },
            { label: "Certificates", href: "/admin/learning/certificates" },
          ]
        : [],
    },
    {
      title: "Community",
      items: staff.can("community.view") ? [{ label: "Events & Monthly Forum", href: "/admin/events" }] : [],
    },
    {
      title: "Wellbeing Hub",
      items: staff.can("wellbeing.view")
        ? [
            { label: "Support requests", href: "/admin/wellbeing", badge: wellbeingNew },
            { label: "Services & partners", href: "/admin/content/wellbeing-services" },
            { label: "Resources & webinars", href: "/admin/content/wellbeing-resources" },
          ]
        : [],
    },
    {
      title: "Website",
      items: [
        ...(staff.can("content.edit") ? [{ label: "Homepage & banners", href: "/admin/homepage" }] : []),
        ...contentLinks,
        ...(staff.can("media.view") ? [{ label: "Media library", href: "/admin/media" }] : []),
        ...(staff.can("communications.view") ? [{ label: "Subscribers", href: "/admin/subscribers" }] : []),
      ],
    },
    {
      title: "Admin",
      items: [
        ...(staff.can("reports.view") ? [{ label: "Reports", href: "/admin/reports" }] : []),
        ...(staff.can("settings.view") ? [{ label: "Site settings", href: "/admin/settings" }] : []),
        ...(staff.can("users.view") ? [{ label: "Staff & roles", href: "/admin/users" }] : []),
        ...(staff.can("audit.view") ? [{ label: "Activity log", href: "/admin/audit" }] : []),
      ],
    },
  ].filter((g) => g.items.length);

  return (
    <div className="lg:grid lg:min-h-screen lg:grid-cols-[16rem_1fr]">
      <aside className="relative flex items-center justify-between gap-4 bg-brand-900 px-4 py-3 text-white lg:sticky lg:top-0 lg:block lg:h-screen lg:overflow-y-auto lg:px-5 lg:py-6">
        <Link href="/admin" className="flex items-center gap-2.5">
          <LogoMark inverted className="h-9 w-auto" />
          <span>
            <span className="block font-display text-lg font-bold tracking-[0.18em]">
              C<span className="text-accent-400">H</span>A<span className="text-accent-400">S</span>E
            </span>
            <span className="block text-[0.65rem] font-semibold uppercase tracking-widest text-brand-200">Staff dashboard</span>
          </span>
        </Link>
        <div className="lg:mt-8">
          <AdminNav groups={groups} />
        </div>
      </aside>

      <div className="min-w-0">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:px-8">
          <p className="text-sm text-muted">
            Signed in as <strong className="text-brand-900">{staff.displayName}</strong>
          </p>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="text-sm font-medium text-brand-700 underline">
              View website
            </Link>
            <form action={signOut}>
              <button type="submit" className="rounded-full border border-gray-300 px-4 py-1.5 text-sm font-semibold text-brand-800 hover:bg-brand-50">
                Sign out
              </button>
            </form>
          </div>
        </header>
        <main id="main" className="px-4 py-8 sm:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
