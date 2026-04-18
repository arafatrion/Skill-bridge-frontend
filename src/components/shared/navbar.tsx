
"use client";

import Link from "next/link";
import { GraduationCap, Menu, User, LogOut, LayoutDashboard } from "lucide-react";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[user,setUser] = useState(null);
  console.log(user);
  const userRole = "tutor"; // student, tutor, admin

   useEffect(() =>{
     const getCurrentUser = async ()=>{
       const userData = await getUser();
       setUser(userData);
     };
     getCurrentUser();
   },[]);

   const handleaLogOut = ()=>{
    UserLogout()
   }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold inline-block">SkillBridge</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/tutors" className="text-sm font-medium transition-colors hover:text-primary">
            Find Tutors
          </Link>
          <Link href="/categories" className="text-sm font-medium transition-colors hover:text-primary">
            Subjects
          </Link>
          
          <div className="flex items-center gap-4 border-l pl-6">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={userRole === 'tutor' ? "/tutor/dashboard" : "/dashboard"}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
               {user ?  <Button variant="ghost" asChild>
                  <Link onClick={handleaLogOut} href="/login">logOut</Link>
                </Button> :  <Button variant="ghost" asChild>
                  <Link href="/login">LogIn</Link>
                </Button>}
                <Button asChild>
                  <Link href="/register">Join Now</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button (Simple version) */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
    
    </nav>
    
  );
}