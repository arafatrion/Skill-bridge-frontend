"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; 

export default function EditProfile() {

  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ২. এখানে আপনার আসল API কল হবে
      // const res = await fetch('/api/v1/student/update-profile', { method: 'PATCH', ... })
      
      console.log("Updating:", { name, profilePic });
      
      // একটি ফেক ডিলে (ব্যাবহারকারীকে বোঝানোর জন্য কাজ হচ্ছে)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white border rounded-2xl p-8 shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        
        <div className="grid gap-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Your Full Name" 
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Email</label>
          <Input disabled value="student@example.com" className="bg-slate-50" />
          <p className="text-[10px] text-slate-400">Email cannot be changed.</p>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Profile Picture URL</label>
          <Input 
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            placeholder="https://your-image-link.com" 
          />
        </div>

        <Button type="submit" disabled={loading} className="mt-4 w-full md:w-auto">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}