import React from "react";
import PropTypes from "prop-types";
import Survey from "./Survey";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase"; 

function SurveyList(props){
  useFirestoreConnect([
    {collection: 'surveys'}
  ])

  const surveys = useSelector(state => state.firestore.ordered.surveys)

  if (isLoaded(surveys)){
  return (
    <React.Fragment>
      <hr/>
      {surveys.map((survey) => {
        return <Survey
        surveyClicked = {props.onSurveySelection}
        title={survey.title}
        q1 ={survey.q1}
        q2 ={survey.q2}
        q3 ={survey.q3}
        q4 ={survey.q4}
        />
      })}
    </React.Fragment>
  )
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}

SurveyList.proptype = {
  onSurveySelection: PropTypes.func
}

export default SurveyList;