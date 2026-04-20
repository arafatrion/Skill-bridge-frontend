

import { BookOpen, CheckCircle, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function StudentOverview() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  let data = { 
    totalBookings: 0, 
    activeLessons: 0, 
    completedLessons: 0, 
    recentBookings: [] 
  };

  try {
    const res = await fetch(`${baseUrl}/student/stats`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      data = json.data || data;
    }
  } catch (err) {
    console.error("Stats fetch error:", err);
  }

  const stats = [
    { label: "Total Bookings", value: data.totalBookings, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Lessons", value: data.activeLessons, icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Completed", value: data.completedLessons, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-8 p-2">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Student Dashboard</h1>
        <p className="text-slate-500 mt-1">Manage your learning journey and upcoming sessions.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-white border rounded-2xl shadow-sm flex items-center gap-4 transition-hover hover:shadow-md">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings Section */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">Recent Bookings</h2>
          <Link href="/dashboard/bookings" className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Tutor</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {data.recentBookings.length > 0 ? (
                data.recentBookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{booking.tutorName}</td>
                    <td className="px-6 py-4 text-slate-600">{booking.subject}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(booking.startTime).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Badge variant={booking.status === "COMPLETED" ? "default" : "secondary"}>
                        {booking.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-400 italic">
                    No recent bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}