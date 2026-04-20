import TutorCarousel from "@/components/tutor/TutorCarousel";


export default async function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  let tutors = [];

  try {
   
    const res = await fetch(`${baseUrl}/tutors`, { 
      cache: 'no-store'
    });

    if (res.ok) {
      const result = await res.json();
   
      tutors = result.data || []; 
    }
  } catch (error) {
    console.error("Error fetching tutors:", error);
  }

  return (
    <main className="py-16 bg-slate-50">
  
      {tutors.length > 0 ? (
        <TutorCarousel tutors={tutors} />
      ) : (
        <div className="text-center py-10 text-gray-500">
          No tutors found at the moment.
        </div>
      )}
    </main>
  );
}