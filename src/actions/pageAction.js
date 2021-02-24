import axios from "../helpers/axios";
export const CREATE_PAGE_REQUEST = "CREATE_PAGE_REQUEST";
export const CREATE_PAGE_SUCCESS = "CREATE_PAGE_SUCCESS";
export const CREATE_PAGE_FAILURE = "CREATE_PAGE_FAILURE";

export const createPage = (form) => {
  return async (dispatch) => {
    const res = await axios.post(`/page/create`, form);
    console.log("resData",res.data);
    dispatch({
      type: CREATE_PAGE_REQUEST,
    });
    if (res.status === 200) {
      dispatch({
        type: CREATE_PAGE_SUCCESS,
        payload: { page: res.data.page },
      });
    } 
    else
     {
        dispatch({
            type: CREATE_PAGE_FAILURE,
            payload: { error: res.data.error },
          });
    }
  };
};
