import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SurveyControl from "./SurveyControl";
import './App.css';
import SignIn from "./Signin";
//import SignIn from "./SignIn";
import { Router, Route, NavLink, Switch } from 'react-router-dom';
import history from '../history';

function App() {
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

const Main = () => (
  <Switch>
    <Route exact path='/' component= {SurveyControl}/>
    <Route exact path='/signin' component={SignIn}/>
  </Switch>
)

export default App;
