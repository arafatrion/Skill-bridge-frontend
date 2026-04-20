"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UserStatusButton({ userId, currentStatus }: { userId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStatusUpdate = async () => {
    setLoading(true);
    try {
      const newStatus = currentStatus === "active" ? "banned" : "active";
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
       
        router.refresh(); 
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      size="sm" 
      disabled={loading}
      variant={currentStatus === 'banned' ? 'destructive' : 'outline'}
      onClick={handleStatusUpdate}
    >
      {loading ? "Processing..." : currentStatus === 'banned' ? 'Unban User' : 'Ban User'}
    </Button>
  );
}