import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import { UserContext } from "../../App";

const PrivateRoute =({ children, ...rest }) =>{
    const [loggedInUser, setLoggedInUser]= useState(UserContext);
    return (
      <Route
        {...rest}
        render={({ location }) =>
          (loggedInUser.email || sessionStorage.getItem('token'))? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute;