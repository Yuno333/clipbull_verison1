import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  cta?: {
    label: string;
    icon?: LucideIcon;
    onClick?: () => void;
    href?: string;
  };
  className?: string;
}

export function PageHeader({ title, subtitle, cta, className }: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between mb-8", className)}>
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-zinc-500 mt-1">{subtitle}</p>
        )}
      </div>
      {cta && (
        <Button
          onClick={cta.onClick}
          className="bg-primary hover:bg-primary/90 text-white rounded-lg shadow-[0_0_20px_rgba(255,79,0,0.3)] h-9 px-4 text-sm font-medium flex items-center gap-2"
        >
          {cta.icon && <cta.icon size={15} />}
          {cta.label}
        </Button>
      )}
    </div>
  );
}
