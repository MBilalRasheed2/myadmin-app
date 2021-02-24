import axios from "../helpers/axios";
import * as contants from "./constants";
// import {} from './constants';
export const loadOrder = () => {
  return async (dispatch) => {

    dispatch({
      type: contants.GET_ORDERS_REQUEST,
    });

    const res = await axios.post(`/order/getCustomerOrders`);

    if (res.status === 201) {
      dispatch({
        type: contants.GET_ORDERS_SUCCESS,
        payload:res.data ,
      });
    } else {
     if(res.status===400){
      dispatch({
        type: contants.GET_ORDERS_FAILURE,
        payload:  "connot find orders" ,
      });
     }
    }
  };
};
