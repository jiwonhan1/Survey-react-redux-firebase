import React from "react";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase'

function EditSurveyForm(props) {
  const { survey } = props;
  const firestore = useFirestore();

  function handleEditSurveyFormSubmission(event){
    event.preventDefault();
    props.onEditSurveyFormSubmission(survey.id);
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
      <button className="btn btn-default" onClick={() => props.onCancelClick()}> &larr; Back</button><h1>{survey.title}</h1>     
      <h2>Edit this survey</h2>
      <hr />
      <form onSubmit={handleEditSurveyFormSubmission}>
        <label>
          <b>Title </b>
        </label>
        <input type="text" name="title" defaultValue={survey.title} /><br />

        <label>
          <b>Question 1 </b>
        </label>
        <input type="text" name="q1" defaultValue={survey.q1} /><br />

        <label>
          <b>Question 2 </b>
        </label>
        <input type="text" name="q2" defaultValue={survey.q2} /><br />

        <label>
          <b>Question 3 </b>
        </label>
        <input type="text" name="q3" defaultValue={survey.q3} /><br />

        <label>
          <b>Question 4 </b>
        </label>
        <input type="text" name="q4" defaultValue={survey.q4} /><br />

        <button type="submit">Save changes</button>
      </form>
    </>
  );

}

EditSurveyForm.propTypes = {
  onEditSurveyFormSubmission: PropTypes.func,
  survey: PropTypes.object,
  onCancelClick: PropTypes.func,
}

export default EditSurveyForm;