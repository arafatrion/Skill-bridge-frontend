"use client";

import Link from "next/link";
import { GraduationCap, Menu, User, LogOut, LayoutDashboard, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { getUser, UserLogout } from "@/services/auth";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // মোবাইল মেনুর জন্য স্টেট

  useEffect(() => {
    const getCurrentUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    getCurrentUser();
  }, []);

  const handleLogOut = () => {
    UserLogout();
    setUser(null); // স্টেট ক্লিয়ার করা
  };

  // রোল অনুযায়ী ড্যাশবোর্ড পাথ নির্ধারণ
  const getDashboardPath = () => {
    if (user?.role === 'tutor') return "/tutor/dashboard";
    if (user?.role === 'admin') return "/admin";
    return "/dashboard";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold inline-block font-mono">SkillBridge</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/tutors" className="text-sm font-medium hover:text-primary">Find Tutors</Link>
          <Link href="/categories" className="text-sm font-medium hover:text-primary">Subjects</Link>
          
          <div className="flex items-center gap-4 border-l pl-6">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full bg-slate-100">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <p className="text-sm font-medium">{user.name || "My Account"}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardPath()}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={handleLogOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">LogIn</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Join Now</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-4 shadow-lg animate-in slide-in-from-top">
          <Link href="/tutors" className="block text-sm font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>Find Tutors</Link>
          <Link href="/categories" className="block text-sm font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>Subjects</Link>
          <div className="pt-4 border-t flex flex-col gap-2">
            {user ? (
               <Button asChild className="w-full">
                  <Link href={getDashboardPath()} onClick={() => setIsMobileMenuOpen(false)}>Go to Dashboard</Link>
               </Button>
            ) : (
              <>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>LogIn</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>Join Now</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}