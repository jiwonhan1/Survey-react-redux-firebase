import React from "react";
import firebase from 'firebase/app';
import {isLoaded} from "react-redux-firebase";

function SignInForm(){  
  const auth = firebase.auth();
  // Create an account
  function createAccount(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
      console.log("successfully signed up!");
    }).catch(function (error) {
      console.log(error.message);
    });
  }
  // Log into the account
  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      console.log("Successfully signed in!", firebase.auth().currentUser);
    }).catch(function(error) {
      console.log(error.message);
    });
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

    // firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
    //   console.log("Successfully signed in!", firebase.auth().currentUser);
    // }).catch(function(error) {
    //   console.log(error.message);
    // });
  }
  // Sign out of the account
  function doSignOut() {
    firebase.auth().signOut().then(function() {
      console.log("Successfully signed out!");
    }).catch(function(error) {
      console.log(error.message);
    });
  }

  const loggedIn = auth.onAuthStateChanged(function(user) {
    if (user) {
      return true;
    } else return false;
  })

  if(isLoaded(auth)){
    let user = auth.currentUser;
    if (user) {
      return (
        <>
          <h1>Sign Out</h1>
          <button onClick={doSignOut}>Sign out</button>
        </>
      )
    } else {
      return (
        <React.Fragment>
          <h1>Create an Account</h1>
          <form onSubmit={createAccount}>
            <input
              type='text'
              name='email'
              placeholder='email' />
            <input
              type='password'
              name='password'
              placeholder='Password' />
            <button type='submit'>Sign up</button>
          </form>
          
          <h1>Sign In</h1>
          <form onSubmit={doSignIn}>
            <input
              type='text'
              name='signinEmail'
              placeholder='email' />
            <input
              type='password'
              name='signinPassword'
              placeholder='Password' />
            <button type='submit'>Sign in</button>
          </form>
        </React.Fragment>
      )
    }
  } else {
    return (<>
      <h1>Loading...</h1>
    </>)
  }
}

export default SignInForm;