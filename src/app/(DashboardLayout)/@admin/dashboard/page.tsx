import { Users, BookOpen, DollarSign, AlertCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminDashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


  const res = await fetch(`${baseUrl}/admin/stats`, { cache: 'no-store' });
  const { data } = await res.json();

  const stats = [
    { label: "Total Users", value: data.totalUsers || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Total Bookings", value: data.totalBookings || 0, icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-100" },
    { label: "Revenue", value: `$${data.totalRevenue || 0}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
    { label: "Pending Tutors", value: data.pendingTutors || 0, icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Console</h1>
          <p className="text-muted-foreground">Platform-wide overview.</p>
        </div>
        <Button className="bg-primary">System Settings</Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-white border rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white border rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Recent User Activity</h3>
        <div className="space-y-4">
          {data.recentUsers?.map((user: any) => (
            <div key={user.id} className="flex items-center justify-between p-4 border rounded-xl">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div>
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground uppercase">{user.role}</p>
                </div>
              </div>
              <Button size="sm" variant={user.status === 'BANNED' ? 'destructive' : 'outline'}>
                {user.status === 'BANNED' ? 'Unban' : 'Ban User'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}