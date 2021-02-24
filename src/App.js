import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import Home from "./container/Home";
import Signin from "./container/Signin";
import Signup from "./container/Signup";
import Order from "./container/Order";
import Product from "./container/Product";
import Category from "./container/Category";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./component/HOC/PrivateRoute";
import { useSelector,useDispatch } from "react-redux";
import {isUserLoggedIn} from './actions/authAction';
import { getInitialData } from "./actions/initialData";
import Page from "./container/NewPage";
function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch=useDispatch();
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    //dispatch(getAllCategories());
    if(auth.authenticate){

      dispatch(getInitialData());
    }
  }, [auth.authenticate]);
  return (
    <Switch>
      <PrivateRoute component={Home} exact path="/" />
      <PrivateRoute component={Page} exact path="/page" />
      <PrivateRoute component={Product} exact path="/product" />
      <PrivateRoute component={Category} exact path="/category" />
      <PrivateRoute component={Order} exact path="/order" />
      <Route component={Signin} exact path="/Signin" />
      <Route component={Signup} exact path="/Signup" />
    </Switch>
  );
}

export default App;
