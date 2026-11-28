import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/admin/session";
import { reportCsvRows, resolveRange, toCsv, type ReportStats } from "@/lib/reports";
import { reportLabel } from "@/lib/reports-labels";

/** The Reports page as a CSV file (totals only). */
export async function GET(request: Request) {
  const staff = await requirePermission("reports.export");
  const u = new URL(request.url);
  const range = resolveRange({ preset: u.searchParams.get("preset") ?? undefined, from: u.searchParams.get("from") ?? undefined, to: u.searchParams.get("to") ?? undefined });
  const { data, error } = await staff.supabase.rpc("report_stats", { from_date: range.from, to_date: range.to });
  if (error || !data) return new NextResponse("The report couldn't be made.", { status: 500 });
  const csv = toCsv(reportCsvRows(data as unknown as ReportStats, reportLabel));
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="chase-report-${range.from}-to-${range.to}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
