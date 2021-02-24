import axios from "../helpers/axios";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_ALL_CATEGORIES_SUCCESS = "GET_ALL_CATEGORIES_SUCCESS";
export const GET_ALL_CATEGORIES_FAILURE = "GET_ALL_CATEGORIES_FAILURE";
export const GET_ALL_CATEGORIES_REQUEST = "GET_ALL_CATEGORIES_REQUEST";
export const ADD_CATEGORIES_REQUEST = "ADD_CATEGORIES_REQUEST";
export const ADD_CATEGORIES_SUCCESS = "ADD_CATEGORIES_SUCCESS";
export const ADD_CATEGORIES_FAILURE = "ADD_CATEGORIES_FAILURE";
export const UPDATE_CATEGORIES_REQUEST = "UPDATE_CATEGORIES_REQUEST";
export const UPDATE_CATEGORIES_SUCCESS = "UPDATE_CATEGORIES_SUCCESS";
export const UPDATE_CATEGORIES_FAILURE = "UPDATE_CATEGORIES_FAILURE";
export const DELETE_CATEGORIES_REQUEST = "DELETE_CATEGORIES_REQUEST";
export const DELETE_CATEGORIES_SUCCESS = "DELETE_CATEGORIES_SUCCESS";
export const DELETE_CATEGORIES_FAILURE = "DELETE_CATEGORIES_FAILURE";


export const getAllCategories = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_ALL_CATEGORIES_REQUEST,
    });
    const res = await axios.get(`/category/getcategory`);
    
    if (res.status === 200) {
      const { category } = res.data;
      dispatch({
        type: GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: category },
      });
    } else {
      dispatch({
        type: GET_ALL_CATEGORIES_FAILURE,
        error: res.data.error,
      });
    }
  };
};
export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_CATEGORIES_REQUEST,
    });
    const res = await axios.post(`/category/create`, form);
    
    if (res.status === 200) {
      const {cat}=res.data.category;
      dispatch({
        type: ADD_CATEGORIES_SUCCESS,
        payload: {category:cat},
      });
    }
    else{
      dispatch({
        type: ADD_CATEGORIES_FAILURE,
        payload: res.data.error,
      });
    }

   
  };
};

export const updateCategories = (form) => {
  return async (dispatch) => {
    dispatch({
      type:UPDATE_CATEGORIES_REQUEST
    });
    const res= await axios.post(`/category/update`,form);
   
    if(res.status===200){ 
      dispatch({
        type:UPDATE_CATEGORIES_SUCCESS
      });
      return true;
    }else
    {
      const {error}=res.data;
      dispatch({
        type:UPDATE_CATEGORIES_FAILURE,
        payload:{error}
      });
      return false;
    }
    
  };
};

export const deleteCategories = (deleteids) => {
  return async (dispatch) => {
    dispatch({
      type:DELETE_CATEGORIES_REQUEST
    });
    const res= await axios.post(`/category/delete`,{
      payload:{deleteids:deleteids}}
      );
      if(res.status===200){ 
        dispatch({
          type:DELETE_CATEGORIES_SUCCESS
        });
        return true;
      }else
      {
        const {error}=res.data
        dispatch({
          type:DELETE_CATEGORIES_FAILURE,
          payload:{error}
        });
        return false;
      }
      

   
    
  }
};