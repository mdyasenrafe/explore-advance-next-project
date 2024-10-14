"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { TLoginFormValues, TRegisterFormValues } from "./types";
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

export const LoginUser = async (userData: TLoginFormValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
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
