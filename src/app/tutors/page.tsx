
import { Search, Filter, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ITutor } from "@/types/tutor";
import TutorCard from "@/components/TutorCard";






export default async function TutorsListPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const searchTerm = searchParams.search || "";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


  const response = await fetch(`${baseUrl}/tutors?search=${searchTerm}`, {
    next: { revalidate: 60 }, 
  });
  
  const data = await response.json();
  const tutors: ITutor[] = data?.data || []; 

  return (
    <div className="min-h-screen bg-slate-50/50">
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-16 text-center">
          <Badge className="mb-4 px-3 py-1 bg-blue-50 text-blue-600 border-blue-100">
            Learn from the best
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Find Your Perfect <span className="text-primary">Private Tutor</span>
          </h1>
          
          {/* সার্চ ফর্ম */}
          <form action="/tutors" method="GET" className="max-w-3xl mx-auto mt-10 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                name="search"
                defaultValue={searchTerm}
                placeholder="Search by subject or name..." 
                className="pl-10 h-12 bg-white shadow-sm"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8 font-semibold">
              Search Tutors
            </Button>
          </form>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            {searchTerm ? `Search results for "${searchTerm}"` : "Available Tutors"}
          </h2>
          <p className="text-sm text-slate-500">Showing {tutors.length} verified experts</p>
        </div>

        {tutors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tutors.map((tutor) => (
              <TutorCard
                key={tutor.id} 
                tutor={{
                  id: tutor.id,
                  name: tutor.name,
                  specialty: tutor.specialty || "Expert Instructor",
                  hourlyRate: tutor.price || 0,
                  image: tutor.image,
                  subjects: tutor.subjects || ["General"],
                  rating: 4.9,
                  reviewsCount: 25, 
                  location: "Online"
                }} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
            <Users className="h-10 w-10 text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-800">No tutors found</h3>
          </div>
        )}
      </main>
    </div>
  );
}

// Badge Component with TypeScript
interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "secondary";
}

function Badge({ children, className, variant = "default" }: BadgeProps) {
  const variants = {
    default: "bg-slate-900 text-slate-50",
    outline: "border border-slate-200 text-slate-900",
    secondary: "bg-slate-100 text-slate-900"
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}