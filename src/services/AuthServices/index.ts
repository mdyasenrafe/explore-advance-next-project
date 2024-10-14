"use server";

import axiosInstance from "@/src/lib/axiosInstance";
import { TLoginFormValues, TRegisterFormValues, TTokenUser } from "./types";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

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

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = (await jwtDecode(accessToken)) as TTokenUser;

    return {
      _id: decodedToken?._id,
      name: decodedToken?.name,
      email: decodedToken?.email,
      mobileNumber: decodedToken?.mobileNumber,
      role: decodedToken?.role,
      status: decodedToken?.status,
    };
  }
  return decodedToken;
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};
