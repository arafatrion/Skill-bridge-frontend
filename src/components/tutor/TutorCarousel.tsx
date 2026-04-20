
"use client"; 

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TutorCard from "@/components/tutor/TutorCard";

export default function TutorCarousel({ tutors }: { tutors: any[] }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-12 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Expert Tutors</h2>
          <p className="text-slate-500">Learn from the best professionals</p>
        </div>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {tutors.map((tutor) => (
            <CarouselItem 
              key={tutor._id || tutor.id} 
              className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="h-full py-2">
                <TutorCard tutor={tutor} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
      
        <CarouselPrevious className="-left-6" />
        <CarouselNext className="-right-6" />
      </Carousel>
    </section>
  );
}