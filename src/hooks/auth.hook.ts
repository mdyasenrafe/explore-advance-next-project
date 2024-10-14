import { useMutation } from "@tanstack/react-query";
import { LoginUser, registerUser } from "../services/AuthServices";
import { toast } from "sonner";
import {
  TLoginFormValues,
  TRegisterFormValues,
} from "../services/AuthServices/types";

export const useUserRegistration = () => {
  return useMutation<any, Error, TRegisterFormValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, TLoginFormValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (payload) => await LoginUser(payload),
    onSuccess: () => {
      toast.success("User Logged in successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
