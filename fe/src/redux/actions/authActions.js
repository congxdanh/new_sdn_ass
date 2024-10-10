import axios from "axios";

import {
  loginStart,
  loginFail,
  loginSuccess,
  registerStart,
  registerFail,
  registerSuccess,
} from "../reducers/authSlice";

const api = axios.create({
  baseURL: "https://new-sdn-ass-be.onrender.com", // URL gốc cho các yêu cầu API
});

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await api.post(`/auth/login`, user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(loginFail());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await api.post("/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(registerFail());
  }
};
