import axios from "axios";
import * as authConstants   from '../actions/constants';
import storeContant from '../store';
const token = window.localStorage.getItem("token");

const axiosIntance = axios.create({
  baseURL: "https://flipcartbackend.herokuapp.com/api",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
axiosIntance.interceptors.request.use((req)=>{
  const {auth}=storeContant.getState();
  if(auth.token){
    req.headers.Authorization=`Bearer ${auth.token}`;

  }
  return req;
});
axiosIntance.interceptors.response.use((res)=>{
  return res;
},(error)=>{
  if(error){
    const status = error.response ? error.response.status : 500;
 
    if(status && status === 500){
     localStorage.clear();
     storeContant.dispatch({
       type:authConstants.LOGIN_SUCCESS
     })
    }
  }
 
  return Promise.reject(error);

})

export default axiosIntance;
