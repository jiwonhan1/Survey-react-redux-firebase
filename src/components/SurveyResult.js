import React from "react";
import PropTypes from "prop-types";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";


function SurveyResult(props){
  const {survey} = props;
  useFirestoreConnect([{ collection: "responses" }])
  const responses = useSelector((state) => state.firestore.ordered.responses);

  if (isLoaded(responses)) {
    const relevantResponses = responses.filter(response => response.surveyId === survey.id);

    function getAverageResponse(propertyKey, responseArray) {
      let sum = 0;
      if (responseArray.length < 1 || responseArray === undefined){
        return "No results yet";
      }
      responseArray.forEach(response => {
        sum += response[propertyKey];
      });
      return sum / responseArray.length;
    }

    return (
      <>
        <h1>{survey.title}</h1>
        <h3>Results</h3>
        <p> Total number of responses: {relevantResponses.length}</p>
        <label className="lead">{survey.q1}</label>
        <p> Average answer: {getAverageResponse("r1", relevantResponses)}</p>
        <br/>
        <p className="lead">{survey.q2}</p>
        <p> Average answer: {getAverageResponse("r2", relevantResponses)}</p>
        <br/>
        <p className="lead">{survey.q3}</p>
        <p> Average answer: {getAverageResponse("r3", relevantResponses)}</p>
        <br/>
        <p className="lead">{survey.q4}</p>
        <p> Average answer: {getAverageResponse("r4", relevantResponses)}</p>
      </>
      )
  } else {
    return (
      <>
        <h3>Loading...</h3>
      </>
    );
  }

  


  // let responsesTest = citiesRef.where('surveyId', '==', survey.id)
  //   .orderBy('population').limit(2);
  ////////////////////////////////////

  //firestore.get({collection: "responses"})
   // .then((survey) => {
      // const firestoreSurvey = {
      //   title: survey.get("title"),
      //   q1: survey.get("q1"),
      //   q2: survey.get("q2"),
      //   q3: survey.get("q3"),
      //   q4: survey.get("q4"),
      //   id: survey.id,
      // }
   // })

  //.collection("responses")
  //.where("surveyId", "==", survey.id);

  
}

SurveyResult.propTypes = {
  survey: PropTypes.object,
}

export default SurveyResult;