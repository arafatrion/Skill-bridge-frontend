"use server"
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
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


    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Server returned non-JSON response (likely HTML error page)");
    }

    const result = await res.json();
    const storeCookie = await cookies();

    if (result.success) {
      storeCookie.set("token", result?.data?.token);
    }
    return result;

  } catch (error: any) {
    console.error("Login Error:", error.message);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};

export const getUser = async () => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;

    if (token) {
      
      const decodedData = jwtDecode(token);
      return decodedData;
    }
    return null;
  } catch (error) {
    console.error("Get User Error:", error);
    return null;
  }
};

export const UserLogout = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
};

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Server returned HTML instead of JSON. Check your API route.");
    }

    const result = await res.json();
    const storeCookie = await cookies();

    if (result.success && result?.data?.token) {
      storeCookie.set("token", result.data.token);
    }

    return result;

  } catch (error: any) {
    console.error("Registration Error:", error.message);
    return {
      success: false,
      message: error.message || "Registration failed",
    };
  }
};