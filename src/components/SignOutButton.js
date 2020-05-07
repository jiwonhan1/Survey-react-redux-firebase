import React from "react";
import firebase from 'firebase/app';
import {isLoaded} from "react-redux-firebase";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function SignOutButton() {
  const auth = firebase.auth();
  
  if(!isLoaded(auth)){
    return (
      <button className="btn btn-secondary">Loading...</button>
    )
  }
  if (isLoaded(auth)) {
    if (auth.currentUser) {
      return (
        <NavLink exact className="nav-link" activeClassName="active" to="/signin">
          <button className="btn">Account</button>
        </NavLink>
      )
    } else {
      return (
        <NavLink exact className="nav-link" activeClassName="active" to="/signin">
          <button className="btn">Sign In</button>
        </NavLink>
      )
    }
  }
}

export default SignOutButton;