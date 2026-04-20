"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TutorProfile() {
  const [profile, setProfile] = useState({
    name: "",
    specialty: "",
    price: 0,
    bio: "",
    subjects: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/my-profile`); 
        const result = await res.json();
        if (result.success) {
          setProfile(result.data);
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutor/update-profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });
      if (res.ok) alert("Profile Updated Successfully!");
    } catch (error) {
      alert("Update failed!");
    }
  };

  if (loading) return <p className="text-center p-10">Loading profile...</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Manage My Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <Input 
            value={profile.name} 
            onChange={(e) => setProfile({...profile, name: e.target.value})} 
          />
        </div>
        {/* বাকি ইনপুটগুলো একই থাকবে */}
        <Button onClick={handleUpdate} className="w-full">Save Changes</Button>
      </div>
    </div>
  );
}