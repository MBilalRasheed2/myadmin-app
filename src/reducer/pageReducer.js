import { GET_ALL_PRODUCTS_REQUEST } from '../actions/initialData';
import {CREATE_PAGE_REQUEST,CREATE_PAGE_SUCCESS,CREATE_PAGE_FAILURE} from '../actions/pageAction';
const initialState = {
  loading:false,
  page:{},
  error:''
};


const pageReducer= (state = initialState, action) => {
  switch(action.type){
        case CREATE_PAGE_REQUEST:{
          state={
              ...state,
              loading:true
          }
      }
      break;
        case CREATE_PAGE_SUCCESS:{
        state={
            ...state,
            loading:false
        }
    }
    break;
        case CREATE_PAGE_FAILURE:{
        state={
            ...state,
            loading:false
        }
    }
    break;

  }
return state;
};

export default pageReducer;
