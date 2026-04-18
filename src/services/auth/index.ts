
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  try {
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    return result; 
    
  } catch (error: any) {
    console.error("Login Error:", error.message);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};