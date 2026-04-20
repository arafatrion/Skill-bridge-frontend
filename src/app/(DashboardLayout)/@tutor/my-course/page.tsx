"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: "", description: "", price: "" });
  const [loading, setLoading] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    fetchCourses();
  }, []);

 const fetchCourses = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/course/my-courses`, {
        method: "GET",
       
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (result.success) setCourses(result.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/course/create-course`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newCourse,
          price: Number(newCourse.price),
        }),
      });

      const result = await res.json();
      if (result.success) {
        alert("Course Created!");
        setNewCourse({ title: "", description: "", price: "" });
        fetchCourses();
      }
    } catch (error) {
      alert("Error creating course");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6 space-y-10">
    
      <div className="max-w-xl bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold mb-4">Create New Course</h2>
        <form onSubmit={handleCreateCourse} className="space-y-4">
          <Input 
            placeholder="Course Title" 
            value={newCourse.title}
            onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
            required
          />
          <Textarea 
            placeholder="Course Description" 
            value={newCourse.description}
            onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
            required
          />
          <Input 
            type="number" 
            placeholder="Price ($)" 
            value={newCourse.price}
            onChange={(e) => setNewCourse({...newCourse, price: e.target.value})}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Add Course"}
          </Button>
        </form>
      </div>

     
      <div>
        <h2 className="text-xl font-bold mb-4">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.length > 0 ? (
            courses.map((course: any) => (
              <Card key={course.id}>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg">{course.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>
                  <p className="mt-2 text-primary font-bold">${course.price}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-500 italic">No courses created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}