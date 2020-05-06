import React from "react";
import firebase from 'firebase/app';
import {isLoaded} from "react-redux-firebase";
import { NavLink } from "react-router-dom";

function SignOutButton() {
  const auth = firebase.auth();
  // const userLoggedIn = firebase.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });
  

  if(!isLoaded(auth)){
    return (
      <button className="btn btn-secondary">Register</button>
    )
  }
  if (isLoaded(auth) && auth.CurrentUser == null) {
    return (
      <NavLink exact className="nav-link" activeClassName="active" to="/signin">
        <button className="btn btn-secondary">Sign In</button>
      </NavLink>
    )
  }
  if (isLoaded(auth) && auth.currentUser != null) {return (
        <but
      <>ton className="btn btn-secondary">Sign Out</button>
        se.r.email}
      </>
  }
}

export default SignOutButton;