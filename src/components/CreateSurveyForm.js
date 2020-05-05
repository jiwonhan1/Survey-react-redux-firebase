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
        q4: event.target.q4.value
      }
    )
  }

  return (
    <>
      <h2>Make your own Survey!</h2>
      <hr />
      <form onSubmit={addNewSurveyToFireStore}>
        <label>
          <b>Title </b>
        </label>
        <input type="text" name="title" placeholder="survey title" />

        <label>
          <b>Question 1 </b>
        </label>
        <input type="text" name="q1" placeholder="first Question" />

        <label>
          <b>Question 2 </b>
        </label>
        <input type="text" name="q2" placeholder="second Question" />

        <label>
          <b>Question 3 </b>
        </label>
        <input type="text" name="q3" placeholder="third Question" />

        <label>
          <b>Question 4 </b>
        </label>
        <input type="text" name="q4" placeholder="fourth Question" />
        <button type='submit'>Add Survey</button>
      </form>
    </>
  );

}

CreateSurveyForm.propTypes = {
  onNewSurveyCreation: PropTypes.func
}

export default CreateSurveyForm;