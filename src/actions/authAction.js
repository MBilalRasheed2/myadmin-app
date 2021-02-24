import axiosInstance from "../helpers/axios";

import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_ERROR,LOGIN_FAILURE,LOGOUT_SUCCESS,LOGOUT_FAILURE,LOGOUT_REQUEST} from './constants';
export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const res = await axiosInstance.post(`/admin/signin`, {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, user },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: LOGIN_ERROR,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: {
          error: "Failed to login",
        },
      });
    }
  };
};
export const logout = () => {
  return async (dispatch) => {
    await dispatch({
      type:LOGOUT_REQUEST
    })
    const res=await axiosInstance.post(`/admin/signout`);
    console.log("res.status",res.status);
    if(res.status===200){
      await localStorage.clear();
      await dispatch({
        type: LOGOUT_SUCCESS,
      });
    }else{
      await dispatch({
        type: LOGOUT_FAILURE,
        payload:{error:res.data.error}
      });
    }
   
  };
};
