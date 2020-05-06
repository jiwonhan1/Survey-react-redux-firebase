import React from "react";
import PropTypes from "prop-types";
import SurveyCard from "./SurveyCard";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase"; 
import firebase from 'firebase/app';

function MySurveys(props){
  useFirestoreConnect([
    {collection: 'surveys'}
  ])

  const surveys = useSelector(state => state.firestore.ordered.surveys)

  if (isLoaded(surveys) && firebase.auth().currentUser){
    const mySurveys = surveys.filter(
      (survey) => survey.userId === firebase.auth().currentUser.uid
    );
    return (
      <React.Fragment>
        <button onClick={() => props.onCancelClick()}> &larr; Back</button>
        <br />
        <br />
        <h1><b>Surveys created by {firebase.auth().currentUser.email}</b></h1>
        <hr/>
        {mySurveys.map((survey) => {
          return <SurveyCard
          survey={survey}
          whenSurveyClicked = {props.onSurveySelection}
          key={survey.id}
          />
        })}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <h3>Please sign in to view your surveys</h3>
      </React.Fragment>
    )
  }
}

MySurveys.proptype = {
  onSurveySelection: PropTypes.func
}

export default MySurveys;