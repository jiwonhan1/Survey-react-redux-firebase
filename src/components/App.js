import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SurveyControl from "./SurveyControl";
import './App.css';
import SignIn from "./Signin";
//import SignIn from "./SignIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="container">
      <Header />
      <Switch>
        <Route path = "/signin">
          <SignIn />
        </Route>
        <Route path = "/">
          <SurveyControl />
        </Route>
      </Switch>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
