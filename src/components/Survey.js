// rename possibly/ what does this control
import React, { useState } from "react";
import PropTypes from "prop-types";
import Slider from "@material-ui/core/Slider";
import { useFirestore } from "react-redux-firebase";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import firebase from "firebase";
import "./Survey.css";

function Survey(props) {
  const [surveyView, setSurveyView] = useState(false);

  const firestore = useFirestore();

  const {
    survey,
    onSurveyResponseSubmit,
    onViewResponsesClick,
    onEditSurveyClick,
    onDeleteSurveyClick,
  } = props;

  const [r1, setR1] = useState(0);
  const [r2, setR2] = useState(0);
  const [r3, setR3] = useState(0);
  const [r4, setR4] = useState(0);

  const handleSlider1Change = (event, newValue) => {
    setR1(newValue);
  };
  const handleSlider2Change = (event, newValue) => {
    setR2(newValue);
  };
  const handleSlider3Change = (event, newValue) => {
    setR3(newValue);
  };
  const handleSlider4Change = (event, newValue) => {
    setR4(newValue);
  };



  const marks = [
    {
      value: 0,
      label: "0 = Not at all",
    },
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5 = Extremely",
    },
  ];


  const user = firebase.auth().currentUser;

  function authForEdit() {
    if(user == null){
          console.log("user is not signed in and didn't create the form");
    }
    else if (user.uid == survey.userId){
      console.log("Current User Created form")
    }
    else {
      console.log("Current User Logged in and did not create form")
    }
  }

  
console.log("Id of user who created form", survey.userId);
console.log("current user's id", user.uid)

  // if (survey is published ) { show this survey form, and show button to survey results } else { show buttons to edit/publish}
  function handleSurveyResponseSubmission(event) {
    event.preventDefault();
    onSurveyResponseSubmit();
    firestore.collection("responses").add({
      r1: parseInt(r1),
      r2: parseInt(r2),
      r3: parseInt(r3),
      r4: parseInt(r4),
      surveyId: survey.id,
      timeSubmitted: firestore.FieldValue.serverTimestamp(),
      userId: user.uid,
    });
  }

  authForEdit()
  if (surveyView) {
    return (
      <React.Fragment>
        <button onClick={() => setSurveyView(!surveyView)}>
          Exit survey without submitting
        </button>
        <h1>
          {" "}
          Take Survey:
          <em>{survey.title}</em>
        </h1>
        <p className="lead">
          Slide the bar to the area of the range that best fits your answer.
        </p>
        <hr />
        <form onSubmit={handleSurveyResponseSubmission}>
          <label>
            <b> {survey.q1} </b>
          </label>
          <Slider
            value={typeof r1 === "number" ? r1 : 0}
            onChange={handleSlider1Change}
            aria-labelledby="input-slider"
            defaultValue={3}
            min={0}
            max={5}
            step={1}
            marks={marks}
            valueLabelDisplay="auto"
          />
          <br />
          <label for="customRange1">
            <b> {survey.q2}</b>
          </label>
          <Slider
            value={typeof r2 === "number" ? r2 : 0}
            onChange={handleSlider2Change}
            aria-labelledby="input-slider"
            defaultValue={3}
            min={0}
            max={5}
            marks={marks}
            valueLabelDisplay="auto"
          />
          <br />
          <label>
            <b>{survey.q3} </b>
          </label>
          <Slider
            value={typeof r3 === "number" ? r3 : 0}
            onChange={handleSlider3Change}
            aria-labelledby="input-slider"
            defaultValue={3}
            min={0}
            max={5}
            marks={marks}
            valueLabelDisplay="auto"
          />
          <br />
          <label>
            <b>{survey.q4}</b>
          </label>
          <Slider
            value={typeof r4 === "number" ? r4 : 0}
            onChange={handleSlider4Change}
            aria-labelledby="input-slider"
            defaultValue={3}
            min={0}
            max={5}
            marks={marks}
            valueLabelDisplay="auto"
          />
          <br />
          <button type="submit">Submit responses</button>
        </form>
      </React.Fragment>
    );
  } else {
    return (
      <>
        <button onClick={() => props.onCancelClick()}>&larr; Back</button>
        <h1>{survey.title}</h1>
        <h3>{survey.purpose}</h3>
        <button onClick={() => setSurveyView(!surveyView)}>Take survey</button>
        <br />
        <br />

        <div className="btn-group">
          <button
            className="btn btn-primary"
            onClick={() => onViewResponsesClick()}
          >
            View survey responses
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onEditSurveyClick()}
          >
            Edit survey
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onDeleteSurveyClick()}
          >
            Delete survey
          </button>
          {" "}
        </div>
      </>
    );
  }
}

Survey.propTypes = {
  survey: PropTypes.object,
  onSurveyResponseSubmit: PropTypes.func,
  onViewResponsesClick: PropTypes.func,
  onDeleteSurveyClick: PropTypes.func,
  onEditSurveyClick: PropTypes.func,
};

export default Survey;


// console.log(firebase.auth().currentUser.uid)
// console.log(user.uid)




