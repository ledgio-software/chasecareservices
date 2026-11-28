import { STATUS_LABELS } from "@/components/admin/ui";
import { stageLabel } from "@/lib/recruitment";
import { kindShort } from "@/lib/wellbeing";

/** Short names for enquiry types on charts. */
const ENQUIRY_SHORT: Record<string, string> = {
  contact: "General enquiry",
  care_request: "Care request",
  worker_application: "Job application",
  course_registration: "Course registration",
  student_programme: "Student programme",
  parent_training: "Parent training",
  respite: "Respite",
  partnership: "Partnership",
  forum_registration: "Forum registration",
};
const SEVERITY: Record<string, string> = { minor: "Minor", moderate: "Moderate", serious: "Serious" };

export function reportLabel(section: string, key: string): string {
  switch (section) {
    case "Type":
      return ENQUIRY_SHORT[key] ?? STATUS_LABELS[key] ?? key;
    case "Stage":
      return stageLabel(key);
    case "Incidents":
      return SEVERITY[key] ?? key;
    case "Kind":
      return kindShort(key);
    case "Month":
      return key;
    default:
      return key;
  }
}
