import { cn } from "@/lib/utils";

type StatusVariant =
  | "Active"
  | "Paused"
  | "Completed"
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Open"
  | "Under Review"
  | "Resolved"
  | "Escalated";

const statusStyles: Record<StatusVariant, string> = {
  Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Resolved: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  Completed: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  Paused: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Open: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Pending: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Under Review": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  Escalated: "bg-red-500/10 text-red-400 border-red-500/20",
};

const dotColors: Record<StatusVariant, string> = {
  Active: "bg-emerald-400",
  Approved: "bg-emerald-400",
  Resolved: "bg-zinc-400",
  Completed: "bg-zinc-400",
  Paused: "bg-amber-400",
  Open: "bg-amber-400",
  Pending: "bg-blue-400",
  "Under Review": "bg-violet-400",
  Rejected: "bg-red-400",
  Escalated: "bg-red-400",
};

interface StatusBadgeProps {
  status: StatusVariant;
  className?: string;
  showDot?: boolean;
}

export function StatusBadge({ status, className, showDot = true }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        statusStyles[status] ?? "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
        className
      )}
    >
      {showDot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            dotColors[status] ?? "bg-zinc-400"
          )}
        />
      )}
      {status}
    </span>
  );
}
