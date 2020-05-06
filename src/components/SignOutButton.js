import React from "react";
import firebase from 'firebase/app';
import {isLoaded} from "react-redux-firebase";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function SignOutButton() {
  const auth = firebase.auth();
  //const reduxUser = useSelector(state => state.auth.currentUser);
  
  // const userLoggedIn = firebase.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });
  const loggedIn = auth.onAuthStateChanged(function(user) {
    if (user) {
      return true;
    } else return false;
  })
  
  if(!isLoaded(auth)){
    return (
      <button className="btn btn-secondary">Register</button>
    )
  }
  if (isLoaded(auth)) {
    if (auth.currentUser) {
      return (
          <button className="btn btn-secondary">Sign Out</button>
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