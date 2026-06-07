import { Activity, LayoutGrid, SlidersHorizontal } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/Theme/theme-toggle";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { cn } from "@/lib/utils";

// Labeled equipment bay — a flat bordered panel with a section header, not a card.
function Panel({
  label,
  icon: Icon,
  status = "Idle",
  className,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  status?: string;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col border border-border bg-card", className)}>
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
          {label}
        </span>
        <span className="border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
          {status}
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center p-4">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">Awaiting data</span>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border bg-workbench px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-1 data-[orientation=vertical]:h-4" />
          <Breadcrumbs />
        </div>
        <ModeToggle />
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Panel label="Overview" icon={LayoutGrid} className="min-h-44" />
          <Panel label="Activity" icon={Activity} className="min-h-44" />
          <Panel label="Status" icon={SlidersHorizontal} className="min-h-44" />
        </div>
        <Panel label="Workspace" icon={LayoutGrid} status="Empty" className="min-h-[60vh] flex-1" />
      </div>
    </>
  );
}
