import { 
  Users, 
  BookOpen, 
  DollarSign, 
  ShieldCheck, 
  AlertCircle, 
  BarChart3,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";


const page = () =>{
    const stats = [
    { label: "Total Users", value: "12,543", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Active Courses", value: "450", icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-100" },
    { label: "Total Revenue", value: "$84,200", icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
    { label: "Pending Approvals", value: "12", icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-100" },
  ];
    return(
       <div className="p-6 lg:p-10 space-y-8 bg-gray-50/50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
          <p className="text-muted-foreground">System-wide overview and platform controls.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Download Report</Button>
          <Button className="bg-primary">System Settings</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-white border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +12% <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>
            </div>
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Activity / Users Table Placeholder */}
        <div className="p-6 bg-white border rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">New Tutor Requests</h3>
            <Button variant="ghost" size="sm" className="text-primary font-medium">View All</Button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-indigo-400" />
                  <div>
                    <p className="font-semibold text-sm">Applicant #{item}042</p>
                    <p className="text-xs text-muted-foreground">Applied for Web Dev Sector</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8">Review</Button>
                  <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700">Approve</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Health/Analytics Card */}
        <div className="p-6 bg-white border rounded-2xl shadow-sm flex flex-col justify-center items-center text-center space-y-4">
           <div className="p-4 bg-primary/10 rounded-full">
              <BarChart3 className="h-12 w-12 text-primary" />
           </div>
           <div>
              <h3 className="text-xl font-bold">Analytics insight</h3>
              <p className="text-sm text-muted-foreground max-w-[250px] mx-auto">
                User engagement has increased by 25% since last system update.
              </p>
           </div>
           <Button variant="outline" className="w-full sm:w-auto">
              Open Full Analytics
           </Button>
        </div>
      </div>
    </div>
    );
};

export default page;