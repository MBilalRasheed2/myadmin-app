import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import pageReducer from "./pageReducer";
import OrderReducer from "./OrderReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
    auth: authReducer,
    category:categoryReducer,
    product:productReducer,
    page:pageReducer,
    order:OrderReducer
  });

  export default rootReducer;