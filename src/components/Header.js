import React from "react";
import { NavLink } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import firebase from 'firebase/app';
import "./App.css";

const imgSize ={
  width: "82px",
  height: "60px"
}


function Header() {
  // console.log(firebase.auth().currentUser.uid)
  return (

    
    <React.Fragment>

        <nav className="navbar navbar-expand-md navbar-dark  bg-primary">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Online_Survey_Icon_or_logo.svg/1200px-Online_Survey_Icon_or_logo.svg.png" style= {imgSize}/>
          <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink exact="exact" className="nav-link" activeClassName="active" to="/">
                    <button className="btn">Home</button>
                </NavLink>
            </li>
            <li className="nav-item">
              <SignOutButton />
            </li>
          </ul>
          {/* <p>{firebase.auth().currentUser.email}</p> */}
        </nav>
    </React.Fragment>
  )
}

export default Header;