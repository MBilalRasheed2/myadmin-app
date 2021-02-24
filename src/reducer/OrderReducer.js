import * as constants from "../actions/constants";

const initialState = {
  orders: [],
  loading: false,
  error: "",
};

const OrderReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case constants.GET_ORDERS_REQUEST:
      {
        state = {
          ...state,
          loading: true,
        };
      }
      break;
    case constants.GET_ORDERS_SUCCESS:
      {
        state = {
          ...state,
          loading: false,
          orders: action.payload.orders,
        };
      }
      break;
    case constants.GET_ORDERS_FAILURE:
      {
        state = {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      break;
  }

  return state;
};

export default OrderReducer;
