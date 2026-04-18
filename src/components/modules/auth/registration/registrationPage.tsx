"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      
    
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" /> 
        <div className="relative z-20 flex items-center text-lg font-medium">
          <GraduationCap className="mr-2 h-6 w-6" />
          SkillBridge
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;SkillBridge It has changed the way we learn and teach. Join today and improve your skills.&rdquo;
            </p>
            <footer className="text-sm">Tanmoy Ahmed, Tutor</footer>
          </blockquote>
        </div>
      </div>

     
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>

        
          <div className="grid gap-6">
            <form>
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" type="text" autoCapitalize="none" />
                </div>
                
                <div className="grid gap-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" placeholder="name@example.com" type="email" />
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="role">I want to join as a</Label>
                  <Select>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STUDENT">Student</SelectItem>
                      <SelectItem value="TUTOR">Tutor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>

                <Button className="mt-2">Sign Up</Button>
              </div>
            </form>
          </div>

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>.
          </p>
          
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}