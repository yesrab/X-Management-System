import FeatureCard from "@/components/landing/feature-card";
import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  ShieldCheck,
  LayoutDashboard,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

// Instrument readout tile — flat, bordered, one signal fill per meaning.
function MetricTile({
  label,
  value,
  tone = "dark",
}: {
  label: string;
  value: string;
  tone?: "red" | "teal" | "yellow" | "dark";
}) {
  const tones: Record<string, string> = {
    red: "bg-signal-red text-paper",
    teal: "bg-signal-teal text-ink",
    yellow: "bg-signal-yellow text-ink",
    dark: "bg-foreground text-primary-foreground",
  };
  return (
    <div className={`border border-foreground/20 p-3 ${tones[tone]}`}>
      <div className="text-[10px] uppercase tracking-wide opacity-75">{label}</div>
      <div className="mt-4 text-2xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}

// One row in the org-hierarchy panel.
function HierarchyRow({
  label,
  tag,
  indent = 0,
  active = false,
}: {
  label: string;
  tag: string;
  indent?: number;
  active?: boolean;
}) {
  return (
    <div
      style={{ marginLeft: indent * 16 }}
      className={`flex items-center justify-between gap-2 border p-3 text-sm ${
        active
          ? "border-signal-red/40 bg-signal-red/10"
          : "border-foreground/15 bg-background"
      }`}
    >
      <span className="flex min-w-0 items-center gap-2 truncate font-semibold">
        {indent > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />}
        <span className="truncate">{label}</span>
      </span>
      <span
        className={`shrink-0 border px-2 py-0.5 text-[10px] uppercase tracking-wide ${
          active
            ? "border-signal-red/50 text-signal-red"
            : "border-foreground/20 text-muted-foreground"
        }`}
      >
        {tag}
      </span>
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="relative flex min-h-screen flex-1 flex-col bg-body text-foreground">
      {/* faint instrument grid — dissolves organically toward the page middle */}
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 z-0" />
      <div className="relative z-10 flex flex-1 flex-col">
      {/* --- Hero --- */}
      <section className="relative overflow-hidden border-b border-border px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-signal-red">
            Education Management Platform
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            One platform for schools, colleges &amp; universities
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Manage students, faculty, courses, and administration in one place. Enrollment, grades,
            attendance, finance, and reporting — modeled the way your institution actually works.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard">
              <Button size="lg" className="h-11 w-full gap-2 px-6 sm:w-auto">
                Launch Dashboard <LayoutDashboard className="h-4 w-4 shrink-0" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-11 w-full px-6 sm:w-auto">
              Request a Demo
            </Button>
          </div>

          {/* instrument readout */}
          <div className="mt-12 grid grid-cols-2 gap-px border border-foreground/20 bg-foreground/20 sm:grid-cols-4">
            <MetricTile label="Institutions" value="320" tone="teal" />
            <MetricTile label="Students" value="1.2M" tone="red" />
            <MetricTile label="Modules" value="09" tone="yellow" />
            <MetricTile label="Uptime" value="99.9%" tone="dark" />
          </div>
        </div>
      </section>

      {/* --- Organization Structure --- */}
      <section id="hierarchy" className="border-b border-border bg-background px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-signal-red">Structure</p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Campus &amp; organization model</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Model your institution the way it really works — from organization-wide settings down to
              individual classes, with nested roles, permissions, and real-time rollups.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {[
                "University / multi-campus management",
                "Colleges, departments & schools",
                "Programs, courses & sections",
                "Classes, batches & student groups",
                "Faculty, staff & admin roles",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 bg-signal-red" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* hierarchy panel */}
          <div className="border border-foreground/20 bg-card p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between border-b border-foreground/15 pb-3">
              <span className="text-sm font-semibold">Org Hierarchy</span>
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Live</span>
            </div>
            <div className="space-y-2 overflow-x-auto">
              <HierarchyRow label="Institution / University" tag="HQ" indent={0} />
              <HierarchyRow label="Colleges & Departments" tag="Org" indent={1} />
              <HierarchyRow label="Schools & Programs" tag="Unit" indent={2} />
              <HierarchyRow label="Classes & Students" tag="Active" indent={3} active />
            </div>
          </div>
        </div>
      </section>

      {/* --- Core Features --- */}
      <section id="features" className="border-b border-border px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-signal-red">Capabilities</p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Built for how you work</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Analytics, course management, and secure access — so admins, faculty, and students get the
            right tools without the complexity.
          </p>
          <div className="mt-10 grid gap-px border border-foreground/20 bg-foreground/20 sm:grid-cols-2 md:grid-cols-3">
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Academic Analytics"
              description="Track enrollment, grades, attendance, and outcomes across departments. Report to boards and accreditors from one place."
            />
            <FeatureCard
              icon={<BookOpen className="h-6 w-6" />}
              title="Courses & Students"
              description="Manage curricula, sections, schedules, and student records — from admissions through graduation."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Role-Based Access"
              description="Admin, faculty, and student roles with explicit permissions. Keep data scoped and each group focused."
            />
          </div>
        </div>
      </section>

      {/* --- CTA (inverted ink panel) --- */}
      <section className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="border border-foreground bg-foreground p-8 text-primary-foreground sm:p-12 md:p-16">
            <GraduationCap className="h-10 w-10" />
            <h2 className="mt-6 text-2xl font-semibold sm:text-3xl md:text-4xl">
              Ready to simplify your institution?
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/70 sm:text-base">
              Join schools, colleges, and universities running academics, admin, and reporting on one
              platform.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="h-11 w-full px-8 sm:w-auto">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 w-full border-primary-foreground/30 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}
