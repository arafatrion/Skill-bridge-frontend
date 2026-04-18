import { 
  BookOpen, 
  Clock, 
  Trophy, 
  PlayCircle, 
  ArrowRight,
  Search,
  Layout
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; 


const StudentDashboard = () =>{
    const stats = [
    { label: "Enrolled Courses", value: "05", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "In Progress", value: "02", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Completed", value: "03", icon: Trophy, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];
    return (
       <div className="p-6 lg:p-10 space-y-8 bg-gray-50/30 min-h-screen">
      
      {/* --- Welcome Header --- */}
      <div className="relative overflow-hidden bg-primary rounded-3xl p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, Student! </h1>
            <p className="text-primary-foreground/80 max-w-md">
              You have completed 60% of your weekly goal. Keep it up and reach your full potential!
            </p>
            <Button variant="secondary" className="mt-2 font-bold group">
              Continue Lesson <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="hidden lg:block">
             <Layout className="h-32 w-32 opacity-20 rotate-12" />
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* --- Quick Stats Grid --- */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-4 p-6 bg-white border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* --- Learning Section --- */}
      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* Enrolled Courses (Takes 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold">Recent Courses</h3>
            <Button variant="link" className="text-primary">View All</Button>
          </div>

          <div className="grid gap-4">
            {[
              { title: "Next.js 14 Deep Dive", progress: 75, tutor: "Tanmoy Ahmed" },
              { title: "UI/UX Fundamentals", progress: 30, tutor: "Sarah Jenkins" },
            ].map((course, idx) => (
              <div key={idx} className="group p-4 bg-white border rounded-2xl flex flex-col sm:flex-row items-center gap-6 hover:border-primary/50 transition-all">
                <div className="h-20 w-32 bg-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:bg-primary/5 transition-colors">
                   <PlayCircle className="h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                   <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                </div>
                <div className="flex-1 w-full space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg">{course.title}</h4>
                      <p className="text-sm text-muted-foreground">by {course.tutor}</p>
                    </div>
                    <span className="text-sm font-bold text-primary">{course.progress}%</span>
                  </div>
                  <div className="space-y-1">
                     <Progress value={course.progress} className="h-2" />
                     <p className="text-xs text-muted-foreground">Current Lesson: Section 4, Video 2</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar/Achievements Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold px-2">Achievements</h3>
          <div className="bg-white border rounded-2xl p-6 space-y-6 shadow-sm">
            {[
              { title: "Fast Learner", desc: "Completed 2 lessons in a day", icon: "⚡", color: "bg-yellow-100" },
              { title: "First Course", desc: "Enrolled in your first course", icon: "🎉", color: "bg-purple-100" },
            ].map((ach, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full ${ach.color} flex items-center justify-center text-xl`}>
                  {ach.icon}
                </div>
                <div>
                  <p className="font-bold text-sm">{ach.title}</p>
                  <p className="text-xs text-muted-foreground">{ach.desc}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full text-xs font-bold py-5 border-dashed">
               View All Badges
            </Button>
          </div>

          {/* Quick Find */}
          <div className="bg-indigo-600 rounded-2xl p-6 text-white space-y-4">
             <Search className="h-8 w-8 opacity-50" />
             <h4 className="font-bold">Looking for something new?</h4>
             <p className="text-sm text-indigo-100">Explore our latest premium courses today.</p>
             <Button className="w-full bg-white text-indigo-600 hover:bg-gray-100 font-bold">
                Browse Courses
             </Button>
          </div>
        </div>

      </div>
    </div>
    )
};

export default StudentDashboard;