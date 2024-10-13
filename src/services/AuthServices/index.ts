"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { TRegisterFormValues } from "./types";
import { cookies } from "next/headers";

export const registerUser = async (userData: TRegisterFormValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);
    if (data?.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    // throw new Error(error);
    console.log(error);
  }
};
