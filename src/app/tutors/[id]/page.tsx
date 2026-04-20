import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, CheckCircle, Clock, BookOpen, MessageCircle,MessageSquare } from "lucide-react";
import BookingModal from "@/components/BookingModel/BookingModal";



interface TutorProfilePageProps {
  params: { id: string };
}

export default async function TutorProfilePage({ params }: TutorProfilePageProps) {
  const { id } = params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/tutors/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  const tutor = data?.data;

  const reviewRes = await fetch(`${baseUrl}/reviews/tutor/${id}`);
const reviewsData = await reviewRes.json();
 const reviews = reviewsData?.data || [];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="h-40 bg-primary/10 border-b" />

      <div className="container mx-auto px-4 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border shadow-sm">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="relative h-32 w-32 rounded-2xl overflow-hidden border-4 border-white shadow-md">
                  <Image
                    src={tutor.image || "/default-avatar.png"}
                    alt={tutor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl font-extrabold text-slate-900">{tutor.name}</h1>
                    <CheckCircle className="h-6 w-6 text-blue-500 fill-current" />
                  </div>
                  <p className="text-lg text-slate-600 mb-4">{tutor.specialty || "Expert Tutor"}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400 fill-current" /> 4.9 (24 Reviews)
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" /> {tutor.subjects?.join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              <hr className="my-8" />

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800">About Me</h2>
                <p className="text-slate-600 leading-relaxed">
                  {tutor.bio || "No biography available."}
                </p>
              </div>
            </div>
          </div>
          {/* review section  */}
          <div className="mt-12 space-y-6">
  <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
    Student Reviews ({reviews.length})
  </h2>

  {reviews.length > 0 ? (
    <div className="grid gap-4">
      {reviews.map((rev: any) => (
        <div key={rev.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-primary">
                {rev.studentName[0]}
              </div>
              <div>
                <p className="font-bold text-slate-900">{rev.studentName}</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                  ))}
                </div>
              </div>
            </div>
            <span className="text-xs text-slate-400">{new Date(rev.createdAt).toLocaleDateString()}</span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed italic">"{rev.comment}"</p>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed">
      <MessageSquare className="h-10 w-10 text-slate-300 mx-auto mb-2" />
      <p className="text-slate-500">No reviews yet. Be the first to review!</p>
    </div>
  )}
</div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl border shadow-lg sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-slate-500 mb-1">Price per hour</p>
                <p className="text-4xl font-black text-slate-900">${tutor.price || 0}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="h-4 w-4" /> 60-minute lessons
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MessageCircle className="h-4 w-4" /> Response time: ~1 hour
                </div>
              </div>

              {/* ২. এখানে Button টি মুছে শুধু BookingModal টি বসান */}
              <BookingModal tutorId={tutor.id} />
              
              <p className="text-center text-xs text-slate-400 mt-4">
                Secure transaction & 24/7 support
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}