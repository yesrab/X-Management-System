"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  CardSim,
  Smartphone,
} from "lucide-react";

import { NavMain } from "@/components/navigation/nav-main";
import { NavProjects } from "@/components/navigation/nav-projects";
import { NavUser } from "@/components/navigation/nav-user";
import { TeamSwitcher } from "@/components/navigation/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Shahzeb",
    email: "shahzeb@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Grameenphone",
      logo: CardSim,
      plan: "Enterprise",
    },
    {
      name: "Telenor Pakistan",
      logo: Smartphone,
      plan: "Startup",
    },
    {
      name: "Robi",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Inventory",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Add/view Stock",
          url: "#",
        },
        {
          title: "Manual Stock Adjustment",
          url: "#",
        },
        {
          title: "Bulk Stock Adjustment",
          url: "#",
        },
      ],
    },
    {
      title: "Products",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Add/view Product",
          url: "/",
        },
        {
          title: "Product Variants",
          url: "#",
        },
        {
          title: "Product Categories",
          url: "#",
        },
        {
          title: "Brands",
          url: "#",
        },
        {
          title: "Suppliers and logistics",
          url: "#",
        },
        {
          title: "Product Bundles",
          url: "#",
        },
      ],
    },
    {
      title: "Retailers",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Add/view Retailer",
          url: "#",
        },
        {
          title: "Retailer Management",
          url: "#",
        },
        {
          title: "Retailer Sales",
          url: "#",
        },
        {
          title: "Retailer Onboarding",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
