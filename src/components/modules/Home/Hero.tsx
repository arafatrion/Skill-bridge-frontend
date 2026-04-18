import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Users, BookOpen } from "lucide-react";
import TutorCard from "./carosoul";

export default function Hero() {
  return (

  
    <div className="flex flex-col  gap-20 pb-20">

     
      {/* --- HERO SECTION --- */}
       <section className="relative bg-slate-50 py-20 lg:py-32">
        <div className="container px-4 mx-auto text-center">
          <h1 className=" mt-0 text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Connect with Expert Tutors, <br />
            <span className="text-primary">Learn Anything.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
            SkillBridge connects learners with experts for personalized 1-on-1 tutoring. 
            Boost your skills with the right guidance.
          </p>

          {/* Search Bar */}
          <div className="flex w-full max-w-xl mx-auto items-center space-x-2 bg-white p-2 rounded-full shadow-lg border">
            <Search className="ml-3 text-slate-400" />
            <Input 
              type="text" 
              placeholder="What do you want to learn today?" 
              className="border-none focus-visible:ring-0 text-base"
            />
            <Button size="lg" className="rounded-full px-8">Search</Button>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 text-slate-600">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold text-slate-900">1,000+</span> Tutors
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold text-slate-900">4.9/5</span> Rating
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-semibold text-slate-900">50+</span> Subjects
            </div>
          </div>
        </div>
      </section> 

   
      <section className="container px-4 mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold">Featured Tutors</h2>
            <p className="text-slate-500">Top rated experts handpicked for you</p>
          </div>
          <Button variant="outline">View All Tutors</Button>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-10 border border-dashed rounded-xl text-center text-slate-400">
              <TutorCard></TutorCard>
           </div>
           <div className="p-10 border border-dashed rounded-xl text-center text-slate-400">
            <TutorCard></TutorCard>
           </div>
           <div className="p-10 border border-dashed rounded-xl text-center text-slate-400">
            <TutorCard></TutorCard>
           </div>
        </div>
      </section>

    </div>
  );
}