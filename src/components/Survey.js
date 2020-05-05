// rename possibly/ what does this control
import React, { useState} from "react";
import PropTypes from "prop-types";
import {useFirestore } from "react-redux-firebase";

function Survey(props) {
  const [surveyView, setSurveyView] = useState(false);

  const firestore = useFirestore();
  const {survey, onSurveyResponseSubmit, onViewResponsesClick, onEditSurveyClick, onDeleteSurveyClick} = props;
  // delete survey button

  // if (survey is published ) { show this survey form, and show button to survey results } else { show buttons to edit/publish}
  function handleSurveyResponseSubmission(event) {
      event.preventDefault();
      onSurveyResponseSubmit();
      firestore.collection("responses").add({
        r1: parseInt(event.target.r1.value),
        r2: parseInt(event.target.r2.value),
        r3: parseInt(event.target.r3.value),
        r4: parseInt(event.target.r4.value),
        surveyId: survey.id,
        timeSubmitted: firestore.FieldValue.serverTimestamp(),
      })
    }

  if(surveyView) {
    return (
      <React.Fragment>
          <button onClick={() => setSurveyView(!surveyView)}>Exit survey without submitting</button>
          <h2> Take Survey: <em>{survey.title}</em></h2>
          <hr />
          <form onSubmit={handleSurveyResponseSubmission}>
            <label>
              <b> {survey.q1} </b>
            </label>
            <input
              className="form-control"
              type="range"
              min="1"
              max="5"
              defaultValue="3"
              class="slider"
              id="r1"
            /><br />
  
            <label>
              <b> {survey.q2}</b>
            </label>
            <input
              type="range"
              min="1"
              max="5"
              defaultValue="3"
              class="slider"
              id="r2"
            /><br />
  
            <label>
              <b>{survey.q3} </b>
            </label>
            <input
              type="range"
              min="1"
              max="5"
              defaultValue="3"
              class="slider"
              id="r3"
            /><br />
  
            <label>
              <b>{survey.q4}</b>
            </label>
            <input
              type="range"
              min="1"
              max="5"
              defaultValue="3"
              class="slider"
              id="r4"
            /><br />
            <button type="submit">Submit responses</button>
          </form>
      </React.Fragment>
    );
  } else {
    return (
    <>
      <button className="btn btn-default" onClick={() => props.onCancelClick()}> &larr; Back</button><h1>{survey.title}</h1>     
      <button onClick={() => setSurveyView(!surveyView)}>Take survey</button>
      <br />
      <br />
      <div className="btn-group">
        <button className="btn btn-primary" onClick={() => onViewResponsesClick()}>View survey responses</button>
        <button className="btn btn-primary" onClick={() => onEditSurveyClick()}>Edit survey</button>
        <button className="btn btn-primary" onClick={() => onDeleteSurveyClick()}>Delete survey</button>
      </div>
    </>
    )
  }
  
}

Survey.propTypes = {
  survey: PropTypes.object,
  onSurveyResponseSubmit: PropTypes.func,
  onViewResponsesClick: PropTypes.func,
  onDeleteSurveyClick: PropTypes.func,
  onEditSurveyClick: PropTypes.func,
}

export default Survey;

