"use client";

import Link from "next/link";
import { useForm, FieldValues } from "react-hook-form";
import { GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { loginUser } from "@/services/auth";


export default function LoginPage() {

  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

 
  const onSubmit = async (data: FieldValues) => {
    const res = await loginUser(data);
    
    if (res?.success) {
      alert("Login Successful!");
      
    } else {
      alert(res?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <Card className="mx-auto max-w-sm shadow-xl border-t-4 border-t-primary">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <GraduationCap className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
         
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
             
                <Input 
                  {...register("email", { required: true })} 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
               
                <Input 
                  {...register("password", { required: true })} 
                  id="password" 
                  type="password" 
                />
              </div>
              
            

              <Button disabled={isSubmitting} type="submit" className="w-full text-base py-6">
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
              
              <Button type="button" variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}