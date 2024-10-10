import axios from "axios";

import {
  loginStart,
  loginFail,
  loginSuccess,
  registerStart,
  registerFail,
  registerSuccess,
} from "../reducers/authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://new-sdn-ass-be.onrender.com//auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(loginFail());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post(
      "https://new-sdn-ass-be.onrender.com//auth/register",
      user
    );
    dispatch(registerSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(registerFail());
  }
};
