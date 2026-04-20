"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { GraduationCap, DollarSign, Book, Loader2 } from "lucide-react";

export default function TutorProfileUpdate() {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); 
  const [profile, setProfile] = useState({
    bio: "",
    subjects: "",
    hourlyRate: "",
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

 
  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/tutor/profile`, {
          cache: "no-store",
        });
        const result = await res.json();
        
        if (result?.success && result?.data) {
          setProfile({
            bio: result.data.bio || "",
            
            subjects: Array.isArray(result.data.subjects) 
              ? result.data.subjects.join(", ") 
              : result.data.subjects || "",
            hourlyRate: result.data.hourlyRate || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchTutorData();
  }, [baseUrl]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
   
    const updatedData = {
      bio: profile.bio,
      subjects: profile.subjects.split(",").map(s => s.trim()),
      hourlyRate: Number(profile.hourlyRate),
    };

    try {
      const res = await fetch(`${baseUrl}/api/tutor/profile`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating.");
    } finally {
      setLoading(false);
    }
  };

 
  if (initialLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading Profile...</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-3 border-b pb-4">
        <GraduationCap className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">Update Tutor Profile</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border shadow-sm">
        {/* Bio Section */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Detailed Bio</label>
          <Textarea 
            placeholder="Describe your teaching style and experience..."
            className="min-h-[120px] focus:ring-primary"
            value={profile.bio}
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
            required
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Subjects Section */}
          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2 text-gray-700">
              <Book className="h-4 w-4" /> Subjects
            </label>
            <Input 
              placeholder="e.g. Math, Physics, Chemistry"
              value={profile.subjects}
              onChange={(e) => setProfile({...profile, subjects: e.target.value})}
              required
            />
            <p className="text-[10px] text-gray-400">Separate subjects with commas.</p>
          </div>

          {/* Rate Section */}
          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2 text-gray-700">
              <DollarSign className="h-4 w-4" /> Hourly Rate ($)
            </label>
            <Input 
              type="number"
              placeholder="Enter amount"
              value={profile.hourlyRate}
              onChange={(e) => setProfile({...profile, hourlyRate: e.target.value})}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto px-10" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving Changes...
            </>
          ) : (
            "Save Profile Details"
          )}
        </Button>
      </form>
    </div>
  );
}