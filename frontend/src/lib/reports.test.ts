import { describe, expect, it } from "vitest";
import { fillMonths, monthLabel, monthsBetween, pct, resolveRange, toCsv } from "./reports";

describe("reports", () => {
  it("resolves date presets", () => {
    const today = "2026-11-28";
    expect(resolveRange({}, today)).toEqual({ from: "2026-11-01", to: today, preset: "this-month" });
    expect(resolveRange({ preset: "last-month" }, today)).toEqual({ from: "2026-10-01", to: "2026-10-31", preset: "last-month" });
    expect(resolveRange({ preset: "last-30" }, today)).toEqual({ from: "2026-10-30", to: today, preset: "last-30" });
    expect(resolveRange({ preset: "last-year" }, today)).toEqual({ from: "2025-01-01", to: "2025-12-31", preset: "last-year" });
    expect(resolveRange({ preset: "last-month" }, "2026-01-15")).toEqual({ from: "2025-12-01", to: "2025-12-31", preset: "last-month" });
    expect(resolveRange({ from: "2026-01-01", to: "2026-03-31" }, today).preset).toBe("custom");
    expect(resolveRange({ from: "2026-03-31", to: "2026-01-01" }, today).preset).toBe("this-month");
  });
  it("fills empty months", () => {
    expect(monthsBetween("2025-11-10", "2026-02-01")).toEqual(["2025-11", "2025-12", "2026-01", "2026-02"]);
    expect(monthLabel("2026-11")).toBe("Nov '26");
    expect(fillMonths([{ key: "2026-01", n: 3 }], "2025-12-01", "2026-01-31").map((b) => b.n)).toEqual([0, 3]);
  });
  it("calculates percentages and safe CSV", () => {
    expect(pct(1, 3)).toBe(33);
    expect(pct(1, 0)).toBeNull();
    expect(toCsv([["a", "=SUM(A1)", 'say "hi"']])).toBe('"a","\'=SUM(A1)","say ""hi"""');
  });
});
