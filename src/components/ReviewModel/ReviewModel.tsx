"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Star, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function ReviewModal({ bookingId, tutorId }: { bookingId: string, tutorId: string }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSubmit = async () => {
    if (rating === 0) return toast.error("Please select a rating!");

    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ bookingId, tutorId, rating, comment }),
      });

      if (res.ok) {
        toast.success("Review submitted! Thank you.");
       
      } else {
        toast.error("Failed to submit review.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Star className="h-4 w-4" /> Give Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate Your Experience</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4 text-center">
          {/* Star Selection */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)}>
                <Star className={`h-8 w-8 ${rating >= star ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
              </button>
            ))}
          </div>

          <textarea
            className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-primary"
            placeholder="Write your feedback here..."
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}