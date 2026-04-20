import { Users, BookOpen, DollarSign, PlusCircle, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function TutorDashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  
  let tutorData = {
    totalStudents: 0,
    activeSessions: 0,
    totalRevenue: 0,
    recentBookings: [] 
  };

  try {

const res = await fetch(`${baseUrl}/api/tutor/stats`, { cache: 'no-store' });
    if (res.ok) {
      const result = await res.json();
   
      if (result?.data) {
        tutorData = { ...tutorData, ...result.data };
      }
    }
  } catch (error) {
    console.error("Fetch error in Tutor Dashboard:", error);
  }

  const stats = [
    { label: "Total Students", value: tutorData.totalStudents, icon: Users, trend: "+12%", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Sessions", value: tutorData.activeSessions, icon: BookOpen, trend: "Stable", color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Total Revenue", value: `$${tutorData.totalRevenue}`, icon: DollarSign, trend: "+8%", color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8 bg-gray-50/30 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Tutor Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your students and teaching schedule.</p>
        </div>
        <Link href="/tutor/availability">
          <Button className="bg-primary h-11 px-6">
            <PlusCircle className="mr-2 h-5 w-5" /> Update Availability
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-white border rounded-2xl shadow-sm">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{stat.trend}</div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground uppercase">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-1 text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Sessions Table */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between">
          <h3 className="text-lg font-bold">Upcoming Sessions</h3>
        </div>
        <div className="divide-y">
          {tutorData.recentBookings && tutorData.recentBookings.length > 0 ? (
            tutorData.recentBookings.map((booking: any) => (
              <div key={booking.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{booking.studentName || "N/A"}</p>
                    <p className="text-xs text-muted-foreground">
                        {booking.startTime ? new Date(booking.startTime).toLocaleString() : "TBD"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                   <Badge variant={booking.status === 'CONFIRMED' ? 'default' : 'secondary'}>
                    {booking.status}
                   </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-gray-400">
              No upcoming sessions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}