import React from "react";
import firebase from 'firebase/app';

function Signin(){  
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
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      console.log("Successfully signed in!", firebase.auth().currentUser);
    }).catch(function(error) {
      console.log(error.message);
    });
  }
  // Sign out of the account
  function doSignOut() {
    firebase.auth().signOut().then(function() {
      console.log("Successfully signed out!");
    }).catch(function(error) {
      console.log(error.message);
    });
  }

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
      
      <h1>Sign Out</h1>
      <button onClick={doSignOut}>Sign out</button>
    </React.Fragment>
  );
}

export default Signin