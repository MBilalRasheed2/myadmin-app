
import axios from "../helpers/axios";
export const GET_ALL_CATEGORIES_SUCCESS = "GET_ALL_CATEGORIES_SUCCESS";
export const GET_ALL_CATEGORIES_FAILURE = "GET_ALL_CATEGORIES_FAILURE";
export const GET_ALL_CATEGORIES_REQUEST = "GET_ALL_CATEGORIES_REQUEST";
export const GET_ALL_PRODUCTS_SUCCESS = "GET_ALL_PRODUCTS_SUCCESS";
export const GET_ALL_PRODUCTS_FAILURE = "GET_ALL_PRODUCTS_FAILURE";
export const GET_ALL_PRODUCTS_REQUEST = "GET_ALL_PRODUCTS_REQUEST";

export const getInitialData=()=>{

   return async dispatch=>{
    const res = await axios.post(`/initalData`);
    dispatch({
        type:GET_ALL_PRODUCTS_REQUEST
    });
    if(res.status===200){
        const {category,product}=res.data
       
        dispatch({
            type:GET_ALL_CATEGORIES_SUCCESS,
            payload:{categories:category}
        })
        dispatch({
            type:GET_ALL_PRODUCTS_SUCCESS,
            payload:{products:product}
        })
    }
    
   }

}