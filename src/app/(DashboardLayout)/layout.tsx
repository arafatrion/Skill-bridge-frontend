import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { getUser } from "@/services/auth"
import { JwtPayload } from "jwt-decode"
import { redirect } from "next/navigation"

export default async function DashBoardLayout({
  admin, student, tutor 
}: { 
  admin: React.ReactNode 
  student: React.ReactNode 
  tutor: React.ReactNode 
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }




  return (
    <TooltipProvider>
      <SidebarProvider>
        
        <AppSidebar userRole={user.role} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                 
                      {user.role.charAt(0) + user.role.slice(1).toLowerCase()} Portal
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" >
              
              {user.role === "ADMIN" && admin}
              {user.role === "STUDENT" && student}
              {user.role === "TUTOR" && tutor}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}