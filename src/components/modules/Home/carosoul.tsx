import { Star, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link"; // লিঙ্ক করার জন্য

interface TutorProps {
  tutor: {
    _id: string; // আইডি থাকতে হবে লিঙ্ক করার জন্য
    name: string;
    specialty: string;
    price: number; // hourlyRate এর বদলে আপনার ব্যাকএন্ড অনুযায়ী price হতে পারে
    image?: string;
    subjects: string[];
    bio: string;
    rating: number;
    reviewsCount: number;
    location: string;
  };
}

export default function TutorCard({ tutor }: TutorProps) {
 
  if (!tutor) return null;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={tutor?.image || "https://github.com/shadcn.png"} alt={tutor?.name} />
              <AvatarFallback>{tutor?.name?.substring(0, 2).toUpperCase() || "T"}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{tutor.name}</h3>
                <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
              </div>
              <p className="text-sm text-slate-500 font-medium line-clamp-1">{tutor.specialty}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-primary font-bold text-lg">
              ${tutor.price || 0}
              <span className="text-xs text-slate-500 font-normal">/hr</span>
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 py-2 space-y-3 flex-1">
        <div className="flex flex-wrap gap-2">
          {tutor?.subjects?.slice(0, 3).map((subject, index) => (
            <Badge key={index} variant="secondary" className="font-normal text-[10px]">
              {subject}
            </Badge>
          ))}
          {tutor?.subjects?.length > 3 && (
             <span className="text-[10px] text-slate-400">+{tutor.subjects.length - 3} more</span>
          )}
        </div>
        <p className="text-sm text-slate-600 line-clamp-2 italic">
          "{tutor.bio || "Professional tutor ready to help you excel."}"
        </p>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-slate-700">{tutor.rating || 0}</span> ({tutor.reviewsCount || 0} Reviews)
          </div>
          <div className="flex items-center gap-1 text-xs">
            <MapPin className="h-3 w-3" /> {tutor.location}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-2">
        <Link href={`/tutors/${tutor._id}`} className="w-full">
          <Button className="w-full">View Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}