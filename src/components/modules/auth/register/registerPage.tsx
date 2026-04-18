"use client";

import Link from "next/link";
import { GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/services/auth"; 
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterPage() {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
   
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await registerUser(data);

      if (res.success) {
        toast.success("Account created successfully! Redirecting...");
    
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(res.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }
  return (
    <div className="container relative min-h-screen flex items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden">
      
      {/* Left Side: Visual Experience */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-skillbridge-gradient" />
        
        {/* Abstract Decorative Circles */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-black/20 rounded-full blur-3xl" />

        <div className="relative z-20 flex items-center text-2xl font-bold tracking-tight">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md mr-3">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          SkillBridge
        </div>

        <div className="relative z-20 mt-auto">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-sm border border-white/20">
              <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2" />
              Join 10,000+ students today
            </div>
            
            <h2 className="text-4xl font-bold leading-tight">
              Unlock Your Potential <br /> With World-Class Mentors.
            </h2>
            
            <div className="space-y-4">
              {[
                "Access to 500+ premium courses",
                "1-on-1 mentorship with industry experts",
                "Lifetime access to learning materials"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-white/90">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span className="text-lg">{text}</span>
                </div>
              ))}
            </div>

            <blockquote className="pt-6 border-t border-white/10">
              <p className="text-lg italic text-white/80">
                &ldquo;SkillBridge has completely transformed my career path. The mentors here are truly invested in your success.&rdquo;
              </p>
              <footer className="mt-2 font-medium">— Tanmoy Ahmed, Senior Tutor</footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Right Side: Registration Form */}
      <div className="flex items-center border rounded-2xl  justify-center lg:p-8 bg-background">
        <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[400px] p-6 sm:p-0">
          
          <div className="flex flex-col space-y-2 text-center">
            <div className="lg:hidden flex justify-center mb-4">
               <div className="bg-primary/10 p-3 rounded-2xl">
                  <GraduationCap className="h-10 w-10 text-primary" />
               </div>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Create an account</h1>
            <p className="text-muted-foreground">
              Join SkillBridge and start your journey today.
            </p>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                  name="name"
                    id="name" 
                    placeholder="Enter your full name" 
                    className="h-11 focus-visible:ring-primary"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                  name="email"
                    id="email" 
                    placeholder="name@example.com" 
                    type="email" 
                    className="h-11"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="role">Account Type</Label>
                  <Select name="role" defaultValue="STUDENT">
                    <SelectTrigger id="role" className="h-11">
                      <SelectValue placeholder="Are you a Student or Tutor?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STUDENT"> Student - I want to learn</SelectItem>
                      <SelectItem value="TUTOR"> Tutor - I want to teach</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                  name="password"
                    id="password" 
                    type="password" 
                    placeholder="Create a strong password" 
                    className="h-11"
                  />
                </div>

                <Button type="submit" className="w-full h-11 text-base font-semibold transition-all hover:shadow-lg active:scale-[0.98]">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          <p className="text-center text-sm text-muted-foreground leading-relaxed">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary transition-colors">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary transition-colors">
              Privacy Policy
            </Link>.
          </p>
          
          <div className="text-center text-sm border-t pt-6">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-primary hover:text-primary/80 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}