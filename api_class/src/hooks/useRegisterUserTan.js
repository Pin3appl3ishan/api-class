import { useMutation } from "@tanstack/react-query";
import { registerUserService } from "../services/authService.";
import { toast } from "react-toastify";

// useMutation used for POST/PUT/PATCH/DELTE request state

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUserService,
    mutationKey: ["register_key"],
    onSuccess: (data) => {
      toast.success(data?.message || "Registration successful");
    },
    onError: (err) => {
      toast.error(err?.message || "Registration failed");
    },
  });
};

// mutationFn : (formData) => registerUserApiService(formData)
