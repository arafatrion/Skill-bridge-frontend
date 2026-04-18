import { 
  Users, 
  BookOpen, 
  DollarSign, 
  PlusCircle, 
  TrendingUp, 
  MoreVertical,
  ArrowUpRight,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";


const TutorDashboard = () =>{
    const stats = [
    { label: "Total Students", value: "1,240", icon: Users, trend: "+12.5%", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Courses", value: "08", icon: BookOpen, trend: "Stable", color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Total Revenue", value: "$4,520", icon: DollarSign, trend: "+8.2%", color: "text-emerald-600", bg: "bg-emerald-50" },
  ];
    return (
        <div className="p-6 lg:p-10 space-y-8 bg-gray-50/30 min-h-screen">
      
      {/* --- Top Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Tutor Dashboard</h1>
          <p className="text-muted-foreground mt-1 flex items-center">
            Welcome back! Here's what's happening with your courses today.
          </p>
        </div>
        <Button className="bg-primary hover:shadow-lg transition-all active:scale-95 h-11 px-6">
          <PlusCircle className="mr-2 h-5 w-5" /> Create New Course
        </Button>
      </div>

      {/* --- Stats Cards Grid --- */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, i) => (
          <div key={i} className="group p-6 bg-white border rounded-2xl shadow-sm hover:border-primary/50 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} transition-colors group-hover:bg-primary group-hover:text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {stat.trend} <TrendingUp className="ml-1 h-3 w-3" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-1 text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* --- Main Content Area --- */}
      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* Recent Courses List (Takes 2 columns) */}
        <div className="lg:col-span-2 bg-white border rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <h3 className="text-lg font-bold">Your Recent Courses</h3>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5">View All</Button>
          </div>
          <div className="divide-y">
            {[
              { title: "Mastering Next.js 14", students: 450, price: "$49", rating: "4.9" },
              { title: "Advanced Tailwind Design", students: 320, price: "$29", rating: "4.8" },
              { title: "Fullstack Auth Masterclass", students: 180, price: "$59", rating: "4.7" },
            ].map((course, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-indigo-100 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{course.title}</p>
                    <p className="text-xs text-muted-foreground">{course.students} Students enrolled</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-900">{course.price}</p>
                    <p className="text-xs text-emerald-600 font-medium">⭐ {course.rating}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips/Support Card (Takes 1 column) */}
        <div className="bg-primary rounded-2xl p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-xl">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Grow your audience!</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              New courses with introductory videos have a 40% higher conversion rate.
            </p>
            <Button className="mt-6 bg-white text-primary hover:bg-gray-100 border-none h-10 font-bold">
              Learn More
            </Button>
          </div>
          {/* Decorative Circles */}
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-[-40px] left-[-40px] w-40 h-40 bg-black/10 rounded-full blur-3xl" />
        </div>

      </div>
    </div>
    )
};

export default TutorDashboard;