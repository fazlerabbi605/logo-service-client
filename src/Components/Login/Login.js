import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import firebaseConfig from "./FirebaseConfig";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const setUserToken = () => {
  firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then(function (idToken) {
      sessionStorage.setItem("token", idToken);
    })
    .catch(function (error) {});
};

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        setLoggedInUser(user);
        history.replace(from);
        setUserToken();
      })
      .catch((error) => {});
  };

  return (
    <div className="mt-5">
      <div className=" bg-light w-25 rounded border mt-5 m-auto p-5">
        <h3 className=" text-primary text-center mb-3">Login</h3>
        <h3
          onClick={handleGoogleLogin}
          style={{ borderRadius: "20px" }}
          className="btn btn-outline-danger  w-100 "
        >
          <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
        </h3>
      </div>
    </div>
  );
};

export default Login;
