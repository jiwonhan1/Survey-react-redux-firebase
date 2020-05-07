import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SurveyControl from "./SurveyControl";
import './App.css';
import SignInForm from "./SignInForm";
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import firebase from "firebase";
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

function App() {
  const firebase = useFirebase()
  const auth = useSelector(state => state.firebase.auth)

  return (
    <Router history ={history}>
       <Header/>
       <div className="container">
        <Main/>   
      </div>
      <Footer/>
    </Router>
  );
}

const enhance = connect(
  // Map redux state to component props
  ({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })
)
enhance(App)

export default App;

const Main = () => (
  <Switch>
    <Route exact path='/' component= {SurveyControl}/>
    <Route exact path='/signin' component={SignInForm}/>
  </Switch>
)



