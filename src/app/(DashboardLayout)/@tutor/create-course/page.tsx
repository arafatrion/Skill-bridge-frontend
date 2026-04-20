"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Upload, 
  BookOpen, 
  DollarSign, 
  FileText, 
  Image as ImageIcon,
  Loader2,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Link from "next/link";

export default function createCourse() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
   

    try {
     
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success("Course created successfully!");
      router.push("/"); 
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10">
      {/* Back Button */}
      <Link href="/tutor" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Link>

      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
        <p className="text-muted-foreground">Fill in the details below to publish your new course.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-8 bg-white p-8 border rounded-2xl shadow-sm">
        
        {/* Course Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-base font-semibold flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Course Title
          </Label>
          <Input 
            id="title" 
            name="title" 
            placeholder="e.g. Mastering Next.js 14 from Scratch" 
            required 
            className="h-12"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-base font-semibold flex items-center gap-2">
            <FileText className="h-4 w-4" /> Description
          </Label>
          <Textarea 
            id="description" 
            name="description" 
            placeholder="Tell your students what they will learn..." 
            className="min-h-[150px] resize-none"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Category/Price */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-base font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Course Price ($)
            </Label>
            <Input 
              id="price" 
              name="price" 
              type="number" 
              placeholder="49.99" 
              required 
              className="h-12"
            />
          </div>

         
          <div className="space-y-2">
            <Label htmlFor="thumbnail" className="text-base font-semibold flex items-center gap-2">
              <ImageIcon className="h-4 w-4" /> Thumbnail URL
            </Label>
            <Input 
              id="thumbnail" 
              name="thumbnail" 
              placeholder="https://image-url.com" 
              required 
              className="h-12"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="px-8 h-12">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Publish Course
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}