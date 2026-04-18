"use client"


import * as React from "react"

import { NavMain } from "@/components/nav-main"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon, AudioLinesIcon, TerminalIcon, TerminalSquareIcon, BotIcon, BookOpenIcon, Settings2Icon, FrameIcon, PieChartIcon, MapIcon, LayoutDashboard, Users } from "lucide-react"

// This is sample data.
import { 
   
  GraduationCap, 
  Settings, 
  BookOpen, 
  CheckSquare, 
  Wallet, 
  Bell, 
  ShieldCheck,
  Briefcase
} from "lucide-react";

// --- Admin Dashboard (Full Control) ---
const navItems = [
  {
    title: "Admin Dashboard",
    url: "/admin/dashboard",
    icon: ShieldCheck, 
    isActive: true,
    items: [ 
      { title: "Stats Overview", url: "/admin/overview" },
      { title: "Real-time Analytics", url: "/admin/analytics" },
    ],
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
    items: [
      { title: "Tutor Approvals", url: "/admin/tutors/pending" },
      { title: "Student List", url: "/admin/students" },
    ],
  },
  {
    title: "Finance",
    url: "/admin/finance",
    icon: Wallet,
    items: [
      { title: "Payouts", url: "/admin/finance/payouts" },
      { title: "Revenue Logs", url: "/admin/finance/revenue" },
    ],
  },
];

// --- Student Dashboard (Learning Focused) ---
const navItems1 = [
  {
    title: "My Learning",
    url: "/student/dashboard",
    icon: GraduationCap, 
    isActive: true,
    items: [ 
      { title: "My Courses", url: "/student/courses" },
      { title: "Class Schedule", url: "/student/schedule" },
    ],
  },
  {
    title: "Resources",
    url: "/student/resources",
    icon: BookOpen,
    items: [
      { title: "Assignments", url: "/student/assignments" },
      { title: "Study Materials", url: "/student/materials" },
    ],
  },
];

// --- Tutor Dashboard (Teaching & Earning) ---
const navItems2 = [
  {
    title: "Tutor Panel",
    url: "/tutor/dashboard",
    icon: Briefcase, 
    isActive: true,
    items: [ 
      { title: "Dashboard Overview", url: "/tutor/overview" },
      { title: "My Profile", url: "/tutor/profile" },
    ],
  },
  {
    title: "Academic Control",
    url: "/tutor/manage",
    icon: CheckSquare,
    items: [
      { title: "Live Classes", url: "/tutor/live" },
      { title: "Manage Students", url: "/tutor/students" },
      { title: "Course Content", url: "/tutor/content" },
    ],
  },
];

interface AppSidebarProps extends  React.ComponentProps<typeof Sidebar>{
  userRole : "ADMIN"| "TUTOR" | "STUDENT";
}

export function AppSidebar({ userRole, ...props }:AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
