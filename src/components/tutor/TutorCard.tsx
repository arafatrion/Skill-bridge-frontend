import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";


interface TutorCardProps {
  tutor: {
    id: string;
    name: string;
    specialty: string;
    hourlyRate: number;
    image?: string;
    subjects: string[];
    rating: number;
    reviewsCount: number;
    location: string;
  };
}

export default function TutorCard({ tutor }: TutorCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
  
      <div className="relative h-48 w-full bg-slate-100">
        <Image
          src={tutor.image || "https://images.unsplash.com/photo-1544717297-fa15c3902786?q=80&w=2070&auto=format&fit=crop"} // ইমেজ না থাকলে একটি সুন্দর ডিফল্ট ইমেজ
          alt={tutor.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
          <p className="text-sm font-bold text-primary">${tutor.hourlyRate}/hr</p>
        </div>
      </div>

    
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
            {tutor.name}
          </h3>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-semibold">{tutor.rating}</span>
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
          <BookOpen className="h-4 w-4" /> {tutor.specialty}
        </p>

      
        <div className="flex flex-wrap gap-2 mb-6">
          {tutor.subjects.slice(0, 3).map((subject, index) => (
            <span 
              key={index}
              className="bg-slate-100 text-slate-600 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md"
            >
              {subject}
            </span>
          ))}
          {tutor.subjects.length > 3 && (
            <span className="text-[10px] text-slate-400 font-bold">+{tutor.subjects.length - 3} more</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {tutor.location}
          </span>
          
        
          <Link href={`/tutors/${tutor.id}`}>
            <Button size="sm" variant="default" className="font-semibold shadow-sm">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}