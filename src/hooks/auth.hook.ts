import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/AuthServices";
import { toast } from "sonner";
import { TRegisterFormValues } from "../services/AuthServices/types";

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
