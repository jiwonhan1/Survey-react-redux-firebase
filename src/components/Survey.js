// rename possibly/ what does this control
import React from "react";
import PropTypes from "prop-types";
import {useFirestore } from "react-redux-firebase";

function Survey(props) {

  const firestore = useFirestore();
  const {survey} = props;
  // delete survey button

  // if (survey is published ) { show this survey form, and show button to survey results } else { show buttons to edit/publish}
  function handleSurveyResponseSubmission(event) {
      event.preventDefault();
      props.onSurveyResponseSubmit();
      firestore.collection("responses").add({
        r1: event.target.r1.value,
        r2: event.target.r2.value,
        r3: event.target.r3.value,
        r4: event.target.r4.value,
        surveyId: survey.id,
        timeSubmitted: firestore.FieldValue.serverTimestamp(),
      })
    }

  return (
    <React.Fragment>
        <h2> Take {survey.title}!</h2>
        <hr />
        <form onSubmit={handleSurveyResponseSubmission}>
          <div className="form-group">
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
          />
          </div>

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
          />

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
          />

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
          />
          <button type="submit">Submit responses </button>
        </form>
    </React.Fragment>
  );
}

Survey.propTypes = {
  survey: PropTypes.object,
  onSurveyResponseSubmit: PropTypes.func,
}

export default Survey;

