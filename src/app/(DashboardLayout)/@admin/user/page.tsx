"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, ShieldCheck, ShieldAlert, RefreshCcw } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null); 
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch(`${baseUrl}/api/admin/users`, {
        cache: "no-store",
        // headers: { "Authorization": `Bearer ${token}` } 
      });
      const result = await res.json();
      
      if (result.success) {
        setUsers(result.data);
      } else {
        toast.error(result.message || "Failed to fetch users");
      }
    } catch (err) {
      toast.error("Network error. Could not load users.");
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

 
  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    
    setActionLoading(userId); 
    try {
      const res = await fetch(`${baseUrl}/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      const result = await res.json();

      if (res.ok && result.success) {
        toast.success(`User successfully ${newStatus.toLowerCase()}`);
        
       
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === userId ? { ...u, status: newStatus } : u
          )
        );
      } else {
        toast.error(result.message || "Action failed");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-[400px] items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Fetching users list...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-sm text-muted-foreground">Monitor and control all users on the platform.</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchUsers} disabled={loading}>
          <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
        </Button>
      </div>

      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold text-sm">User Info</th>
                <th className="p-4 font-semibold text-sm">Role</th>
                <th className="p-4 font-semibold text-sm">Status</th>
                <th className="p-4 font-semibold text-sm text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="capitalize text-[10px]">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge 
                        className={`text-[10px] ${
                          user.status === "ACTIVE" 
                            ? "bg-green-100 text-green-700 hover:bg-green-100" 
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                        }`}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        disabled={actionLoading === user.id}
                        onClick={() => toggleUserStatus(user.id, user.status)}
                        className={`h-8 px-3 ${
                          user.status === "ACTIVE" 
                            ? "text-red-500 hover:text-red-600 hover:bg-red-50" 
                            : "text-green-600 hover:text-green-700 hover:bg-green-50"
                        }`}
                      >
                        {actionLoading === user.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : user.status === "ACTIVE" ? (
                          <><ShieldAlert className="w-4 h-4 mr-2" /> Block</>
                        ) : (
                          <><ShieldCheck className="w-4 h-4 mr-2" /> Activate</>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-gray-400">
                    No users found.
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