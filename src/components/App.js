import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SurveyControl from "./SurveyControl";
import './App.css';
import SignInForm from "./SignInForm";
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import firebase from "firebase";

function App() {

  function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
      }
    });
  }

  initApp();

  return (
    <Router history ={history}>
      <div className="container">
        <Header/>
        <Main/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;

const Main = () => (
  <Switch>
    <Route exact path='/' component= {SurveyControl}/>
    <Route exact path='/signin' component={SignInForm}/>
  </Switch>
)



