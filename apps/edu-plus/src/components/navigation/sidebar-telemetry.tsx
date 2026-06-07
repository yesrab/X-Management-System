"use client";

import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";

const readouts = [
  { label: "Students", value: "12,480" },
  { label: "Staff", value: "842" },
  { label: "Term", value: "Active" },
];

// Compact instrument readouts on the control strip. Hidden when the rail collapses.
export function SidebarTelemetry() {
  return (
    <SidebarGroup className="mt-auto group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Telemetry</SidebarGroupLabel>
      <div className="space-y-2 px-2">
        <div className="grid grid-cols-3 gap-px border border-sidebar-border bg-sidebar-border">
          {readouts.map(({ label, value }) => (
            <div key={label} className="bg-sidebar p-2">
              <div className="text-[9px] uppercase tracking-wide text-muted-foreground">{label}</div>
              <div className="mt-1 truncate text-xs font-semibold tabular-nums">{value}</div>
            </div>
          ))}
        </div>
        <div className="border border-sidebar-border p-2">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-wide text-muted-foreground">
            <span>Storage</span>
            <span className="tabular-nums">64%</span>
          </div>
          <div className="mt-1.5 h-1.5 bg-secondary">
            <div className="h-full bg-signal-teal" style={{ width: "64%" }} />
          </div>
        </div>
      </div>
    </SidebarGroup>
  );
}
