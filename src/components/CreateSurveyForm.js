import React from "react";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase'

//Create Survey Form - text inputs for questions, 
//4 inputs of the multiple choice

function CreateSurveyForm(props) {

  const firestore = useFirestore();

  function addNewSurveyToFireStore(event){
    event.preventDefault();
    props.onNewSurveyCreation()

    return firestore.collection('surveys').add(
      {
        title: event.target.title.value,
        q1: event.target.q1.value,
        q2: event.target.q2.value,
        q3: event.target.q3.value,
        q4: event.target.q4.value,
        timeSubmitted: firestore.FieldValue.serverTimestamp()
      }
    )
  }

  return (
    <>
      <h2>Make your own Survey!</h2>
      <button onClick={() => props.onCancelClick()}>Back</button>
      <hr />
      <form onSubmit={addNewSurveyToFireStore}>
        <div className="form-group">
        <label>
          <b>Title </b>
        </label>
        <input className="form-control" type="text" name="title" placeholder="survey title" /><br />
        </div>
        <div className="form-group">
        <label>
          <b>Question 1 </b>
        </label>
        <input className="form-control" type="text" name="q1" placeholder="first Question" /><br />
        </div>
        <div className="form-group">
        <label>
          <b>Question 2 </b>
        </label>
        <input className="form-control" type="text" name="q2" placeholder="second Question" /><br />
        </div>
        <div className="form-group">
        <label>
          <b>Question 3 </b>
        </label>
        <input className="form-control" type="text" name="q3" placeholder="third Question" /><br />
        </div>
        <div className="form-group">
        <label>
          <b>Question 4 </b>
        </label>
        <input className="form-control" type="text" name="q4" placeholder="fourth Question" /><br />
        </div>
        <button type='submit'>Add Survey</button>
      </form>
    </>
  );

}

CreateSurveyForm.propTypes = {
  onNewSurveyCreation: PropTypes.func,
  onCancelClick: PropTypes.func,
}

export default CreateSurveyForm;