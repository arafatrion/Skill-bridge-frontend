"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

interface Slot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export default function BookingModal({ tutorId }: { tutorId: string }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  
  useEffect(() => {
    const fetchSlots = async () => {
      const res = await fetch(`${baseUrl}/availability/${tutorId}`);
      const data = await res.json();
      
      setSlots(data?.data?.filter((s: Slot) => !s.isBooked) || []);
    };
    fetchSlots();
  }, [tutorId, baseUrl]);

  const handleBooking = async () => {
    if (!selectedSlot) return toast.error("Please select a slot first!");

    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // টোকেন পাঠান
        },
        body: JSON.stringify({
          tutorId,
          availabilityId: selectedSlot,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Booking confirmed successfully!");
        setSlots(slots.filter(s => s.id !== selectedSlot)); // বুক করা স্লট লিস্ট থেকে বাদ দিন
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to book the session.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full h-12 text-lg font-bold shadow-md">
          Book a Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Select an Available Slot
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-3 py-4 max-h-[300px] overflow-y-auto pr-2">
          {slots.length > 0 ? (
            slots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot.id)}
                className={`p-3 rounded-xl border text-sm font-medium transition-all text-left ${
                  selectedSlot === slot.id 
                  ? "border-primary bg-primary/5 text-primary ring-1 ring-primary" 
                  : "border-slate-200 hover:border-primary/50"
                }`}
              >
                {new Date(slot.startTime).toLocaleDateString()} at{" "}
                {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </button>
            ))
          ) : (
            <p className="text-center text-slate-500 py-4">No available slots found.</p>
          )}
        </div>

        <Button 
          onClick={handleBooking} 
          disabled={!selectedSlot || loading} 
          className="w-full font-bold"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}