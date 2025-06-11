import { loginUserApi, registerUserApi } from "../api/authApi";

export const registerUserService = async (fromData) => {
  try {
    const response = await registerUserApi(fromData);
    return response.data; //response body
  } catch (err) {
    throw err.respose?.dat || { message: "registration failed" };
  }
};

export const loginUserService = async (fromData) => {
  try {
    const response = await loginUserApi(fromData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};
