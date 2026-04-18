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


import { 
  GraduationCap, 
  BookOpen, 
  CheckSquare, 
  Wallet, 
  ShieldCheck,
  Briefcase,
  Users
} from "lucide-react";

// --- Navigation Data (ADMIN, STUDENT, TUTOR) ---
const ADMIN_nav = [
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

const STUDENT_nav = [
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

const TUTOR_nav = [
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

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: "ADMIN" | "TUTOR" | "STUDENT";
}

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  
  let navItems = ADMIN_nav; 

  if (userRole === "TUTOR") {
    navItems = TUTOR_nav;
  } else if (userRole === "STUDENT") {
    navItems = STUDENT_nav;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
           <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <GraduationCap className="h-4 w-4" />
           </div>
           <span className="font-bold">SkillBridge</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
      
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
     
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}