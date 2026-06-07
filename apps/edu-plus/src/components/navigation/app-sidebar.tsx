"use client";

import * as React from "react";
import {
  BookOpen,
  Settings2,
  GraduationCap,
  Building2,
  School,
  LayoutDashboard,
  Users,
  UserCog,
  Wallet,
  Package,
  Bus,
  MessageSquare,
  BarChart3,
  UserPlus,
  PlusSquare,
  Receipt,

} from "lucide-react";

import { NavMain } from "@/components/navigation/nav-main";
import { NavProjects } from "@/components/navigation/nav-projects";
import { NavUser } from "@/components/navigation/nav-user";
import { TeamSwitcher } from "@/components/navigation/team-switcher";
import { SidebarTelemetry } from "@/components/navigation/sidebar-telemetry";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Shahzeb Ali",
    email: "shahzeb@educloud.app",
    avatar: "/avatars/admin.jpg",
    role: "Super Admin",
  },

  organizations: [
    {
      name: "Green Valley International School",
      logo: GraduationCap,
      plan: "Enterprise",
      role: "Organization Admin",
    },
    {
      name: "Narayana Junior College",
      logo: Building2,
      plan: "Professional",
      role: "Principal",
    },
    {
      name: "St. Ann's Manovikas Kendra",
      logo: School,
      plan: "Free",
      role: "Viewer",
    },
  ],

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: false,
    },
    {
      title: "Academics",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Classes & Sections",
          url: "/academics/classes",
        },
        {
          title: "Subjects",
          url: "/academics/subjects",
        },
        {
          title: "Timetable",
          url: "/academics/timetable",
        },
        {
          title: "Assignments",
          url: "/academics/assignments",
        },
        {
          title: "Attendance",
          url: "/academics/attendance",
        },
        {
          title: "Examinations",
          url: "/academics/exams",
        },
        {
          title: "Gradebook",
          url: "/academics/grades",
        },
      ],
    },

    {
      title: "Students",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Student Directory",
          url: "/students",
        },
        {
          title: "Admissions",
          url: "/students/admissions",
        },
        {
          title: "Promotions",
          url: "/students/promotions",
        },
        {
          title: "Parent Accounts",
          url: "/students/parents",
        },
      ],
    },

    {
      title: "Staff & HR",
      url: "#",
      icon: UserCog,
      items: [
        {
          title: "Staff Directory",
          url: "/staff",
        },
        {
          title: "Roles & Permissions (RBAC)",
          url: "/staff/roles",
        },
        {
          title: "Payroll",
          url: "/staff/payroll",
        },
        {
          title: "Leave Management",
          url: "/staff/leave",
        },
      ],
    },

    {
      title: "Finance",
      url: "#",
      icon: Wallet,
      items: [
        {
          title: "Fee Structures",
          url: "/finance/fees",
        },
        {
          title: "Fee Collection",
          url: "/finance/collections",
        },
        {
          title: "Scholarships",
          url: "/finance/scholarships",
        },
        {
          title: "Expenses",
          url: "/finance/expenses",
        },
        {
          title: "Financial Reports",
          url: "/finance/reports",
        },
      ],
    },

    {
      title: "Inventory & Assets",
      url: "#",
      icon: Package,
      items: [
        {
          title: "Asset Management",
          url: "/inventory/assets",
        },
        {
          title: "Library",
          url: "/inventory/library",
        },
        {
          title: "Lab Equipment",
          url: "/inventory/labs",
        },
        {
          title: "Stock Adjustments",
          url: "/inventory/stock",
        },
      ],
    },

    {
      title: "Transport",
      url: "#",
      icon: Bus,
      items: [
        {
          title: "Vehicles",
          url: "/transport/vehicles",
        },
        {
          title: "Routes",
          url: "/transport/routes",
        },
        {
          title: "Driver Management",
          url: "/transport/drivers",
        },
      ],
    },

    {
      title: "Communication",
      url: "#",
      icon: MessageSquare,
      items: [
        {
          title: "Announcements",
          url: "/communication/announcements",
        },
        {
          title: "Email & SMS",
          url: "/communication/messaging",
        },
        {
          title: "Notifications",
          url: "/communication/notifications",
        },
      ],
    },

    {
      title: "Reports & Analytics",
      url: "#",
      icon: BarChart3,
      items: [
        {
          title: "Academic Reports",
          url: "/reports/academic",
        },
        {
          title: "Attendance Reports",
          url: "/reports/attendance",
        },
        {
          title: "Finance Reports",
          url: "/reports/finance",
        },
        {
          title: "Custom Reports",
          url: "/reports/custom",
        },
      ],
    },

    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General Settings",
          url: "/settings/general",
        },
        {
          title: "Branding",
          url: "/settings/branding",
        },
        {
          title: "Subscription & Billing",
          url: "/settings/billing",
        },
        {
          title: "Audit Logs",
          url: "/settings/audit",
        },
      ],
    },
  ],

  quickActions: [
    {
      name: "Add Student",
      url: "/students/new",
      icon: UserPlus,
    },
    {
      name: "Create Class",
      url: "/academics/classes/new",
      icon: PlusSquare,
    },
    {
      name: "Generate Fee Invoice",
      url: "/finance/invoice/new",
      icon: Receipt,
    },
  ],
};


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.organizations} />
      </SidebarHeader>
      <SidebarSeparator className='mx-0' />
      <SidebarContent>
        <NavMain items={data.navMain} />
        <SidebarSeparator className='mx-0' />
        <NavProjects projects={data.quickActions} />
        <SidebarTelemetry />
      </SidebarContent>
      <SidebarSeparator className='mx-0' />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
