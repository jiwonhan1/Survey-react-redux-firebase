import React from "react";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase'

function EditSurveyForm(props) {
  const { survey } = this.props;
  const firestore = useFirestore();
  function handleEditSurveyFormSubmission(event){
    event.preventDefault();
    props.onEditSurveyFormSubmission();
    const propertiesToUpdate = {
      title: event.target.title.value,
      q1: event.target.q1.value,
      q2: event.target.q2.value,
      q3: event.target.q3.value,
      q4: event.target.q4.value,
    }

    return firestore.update({
      collection: "surveys",
      doc: survey.id,
    }, propertiesToUpdate);
  }

  return (
    <>
      <h2>Edit this survey</h2>
      <hr />
      <form onSubmit={handleEditSurveyFormSubmission}>
        <label>
          <b>Title </b>
        </label>
        <input type="text" name="title" defaultValue={survey.title} />

        <label>
          <b>Question 1 </b>
        </label>
        <input type="text" name="Question1" defaultValue={survey.q1} />

        <label>
          <b>Question 2 </b>
        </label>
        <input type="text" name="Question2" defaultValue={survey.q2} />

        <label>
          <b>Question 3 </b>
        </label>
        <input type="text" name="Question3" defaultValue={survey.q3} />

        <label>
          <b>Question 4 </b>
        </label>
        <input type="text" name="Question4" defaultValue={survey.q4} />

        <button type="submit">Save changes</button>
      </form>
    </>
  );

}

EditSurveyForm.PropTypes = {
  onEditSurveyFormSubmission: PropTypes.func,
  survey: PropTypes.object,
}

export default EditSurveyForm;