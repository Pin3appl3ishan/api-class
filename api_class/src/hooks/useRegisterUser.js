import { useState } from "react";
import { registerUserService } from "../services/authService.";

export const useRegisterUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const register = async (formData) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await registerUserService(formData);
      setData(response);
      return response; // Return the response for further processing if needed
    } catch (err) {
      setError(err);
      return null; // Return null or handle the error as needed
    } finally {
      setIsLoading(false);
    }
  };
  return { register, isLoading, error, data };
};
