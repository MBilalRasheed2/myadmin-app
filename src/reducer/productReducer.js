import {GET_ALL_PRODUCTS_SUCCESS} from '../actions/initialData';
const initialState = {
  products: [],
};


const productReducer= (state = initialState, action) => {
  switch(action.type){
      case GET_ALL_PRODUCTS_SUCCESS:{
          state={
              ...state,
              products:action.payload.products
          }
      }
  }
return state;
};

export default productReducer;
