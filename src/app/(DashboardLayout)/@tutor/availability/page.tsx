"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function AvailabilityPage() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState({ start: "09:00", end: "17:00" });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

 
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/tutor/availability`, {
          cache: "no-store",
        });
        const result = await res.json();

        if (result?.success && result?.data) {
          setSelectedDays(result.data.days || []);
          setTimeSlots({
            start: result.data.start || "09:00",
            end: result.data.end || "17:00",
          });
        }
      } catch (error) {
        console.error("Error fetching availability:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchAvailability();
  }, [baseUrl]);

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

 
  const handleSave = async () => {
    if (selectedDays.length === 0) {
      return toast.error("Please select at least one day!");
    }

    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/tutor/availability`, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          days: selectedDays,
          ...timeSlots,
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Availability updated successfully!");
      } else {
        toast.error(result.message || "Failed to update schedule.");
      }
    } catch (error) {
      toast.error("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 font-medium">Loading Schedule...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-3 border-b pb-4">
        <Calendar className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-gray-900">Set Your Availability</h1>
      </div>

      <div className="bg-white border rounded-2xl p-8 shadow-sm space-y-8">
        {/* Day Selection */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-700">Select Available Days</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {DAYS.map(day => (
              <div 
                key={day} 
                onClick={() => handleDayToggle(day)}
                className={`flex items-center space-x-3 border p-4 rounded-xl cursor-pointer transition-all ${
                  selectedDays.includes(day) 
                    ? "border-primary bg-primary/5 ring-1 ring-primary" 
                    : "hover:bg-gray-50 border-gray-200"
                }`}
              >
                <Checkbox 
                  id={day} 
                  checked={selectedDays.includes(day)}
                  onCheckedChange={() => handleDayToggle(day)}
                />
                <label htmlFor={day} className="text-sm font-bold cursor-pointer select-none">
                  {day}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-dashed">
          <div className="space-y-3">
            <label className="text-sm font-semibold flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4 text-primary" /> Working Hours Start
            </label>
            <input 
              type="time" 
              className="w-full border-2 border-gray-100 rounded-xl p-3 focus:border-primary focus:outline-none transition-colors"
              value={timeSlots.start}
              onChange={(e) => setTimeSlots({...timeSlots, start: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4 text-primary" /> Working Hours End
            </label>
            <input 
              type="time" 
              className="w-full border-2 border-gray-100 rounded-xl p-3 focus:border-primary focus:outline-none transition-colors"
              value={timeSlots.end}
              onChange={(e) => setTimeSlots({...timeSlots, end: e.target.value})}
            />
          </div>
        </div>

        <Button 
          onClick={handleSave} 
          disabled={loading}
          className="w-full md:w-auto px-10 py-6 text-lg font-bold rounded-xl shadow-lg shadow-primary/20"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Weekly Schedule"
          )}
        </Button>
      </div>
    </div>
  );
}