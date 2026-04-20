// src/app/(DashboardLayout)/@student/dashboard/bookings/page.tsx


import ReviewModal from "@/components/ReviewModel/ReviewModel";
import { Badge } from "@/components/ui/badge";

export default async function MyBookings() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  let bookings = [];

  try {
    const res = await fetch(`${baseUrl}/student/my-bookings`, { cache: 'no-store' });
    const json = await res.json();
    bookings = json.data?.bookings || [];
  } catch (err) { console.error(err); }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Bookings</h1>
      
      <div className="bg-white border rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-sm">Tutor</th>
              <th className="p-4 font-semibold text-sm">Date & Time</th>
              <th className="p-4 font-semibold text-sm">Status</th>
              <th className="p-4 font-semibold text-sm text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {bookings.map((booking: any) => (
              <tr key={booking.id} className="hover:bg-gray-50/50">
                <td className="p-4">
                  <p className="font-bold">{booking.tutorName}</p>
                  <p className="text-xs text-slate-50">{booking.subject}</p>
                </td>
                <td className="p-4 text-sm">
                  {new Date(booking.startTime).toLocaleDateString()} <br/>
                  <span className="text-slate-400">{new Date(booking.startTime).toLocaleTimeString()}</span>
                </td>
                <td className="p-4">
                  <Badge variant={booking.status === "COMPLETED" ? "default" : "secondary"}>
                    {booking.status}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  {booking.status === "COMPLETED" && (
                    <ReviewModal bookingId={booking.id} tutorId={booking.tutorId} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}