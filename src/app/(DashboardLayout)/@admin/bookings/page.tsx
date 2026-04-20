import { Calendar, User, GraduationCap, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";


interface Booking {
  id: string;
  tutor?: { name: string };
  student?: { name: string };
  tutorName?: string;
  studentName?: string;
  startTime: string;
  status: string;
}

const getStatusColor = (status: string) => {
  const s = status?.toUpperCase() || 'PENDING';
  switch (s) {
    case 'CONFIRMED': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'PENDING': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'CANCELLED': return 'bg-rose-100 text-rose-700 border-rose-200';
    case 'COMPLETED': return 'bg-blue-100 text-blue-700 border-blue-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export default async function AdminBookings() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   console.log("BASE URL:", baseUrl);
  let bookings: Booking[] = [];
  let error = false;
  

  try {
    const res = await fetch(`${baseUrl}/bookings`, { 
     
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!res.ok) throw new Error("Failed to fetch");
    
    const result = await res.json();
    bookings = result?.data || [];
  } catch (err) { 
    console.error("Booking Fetch Error:", err);
    error = true;
  }

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Global Bookings</h1>
        <p className="text-muted-foreground mt-1">Monitor all tutoring sessions across the platform.</p>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b">
                <th className="p-4 text-xs font-bold uppercase text-gray-500 tracking-wider">Tutor</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-500 tracking-wider">Student</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-500 tracking-wider">Schedule</th>
                <th className="p-4 text-xs font-bold uppercase text-gray-500 tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-sm">
                          {booking.tutor?.name || booking.tutorName || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-700">
                           {booking.student?.name || booking.studentName || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(booking.startTime).toLocaleDateString('en-GB')}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <Badge className={`shadow-none border font-bold text-[10px] ${getStatusColor(booking.status)}`}>
                        {booking.status || 'PENDING'}
                      </Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-gray-500">
                    {error ? "Error loading bookings. Check server URL." : "No bookings found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}