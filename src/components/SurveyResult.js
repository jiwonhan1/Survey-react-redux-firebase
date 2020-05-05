import React from "react";
import PropTypes from "prop-types";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";


function SurveyResult(props){
  const {survey} = props;

  //////////////////////////////
  useFirestoreConnect([{ collection: "responses" }])

  const responses = useSelector((state) => state.firestore.ordered.responses.where("surveyId", "==", survey.id));

  console.log(responses);
  ////////////////////////////////////

  //.collection("responses")
  //.where("surveyId", "==", survey.id);

  return (
  <>
    <h1>Results for {survey.title}</h1>
    <p>e.g. Question 1 average answer...</p>
    <h4>{survey.q1}</h4>
    <h4>{survey.q2}</h4>
    <h4>{survey.q3}</h4>
    <h4>{survey.q4}</h4>
  </>
  )
}

SurveyResult.propTypes = {
  survey: PropTypes.object,
}

export default SurveyResult;