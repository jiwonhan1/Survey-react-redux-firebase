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
      <h1>Edit {survey.title}</h1>     
      <button onClick={() => props.onCancelClick()}> &larr; Back</button>
      <hr />
      <form onSubmit={handleEditSurveyFormSubmission}>
        <div className="form-group">
        <label>
          <b>Title </b>
        </label>
        <input className="form-control" type="text" name="title" defaultValue={survey.title} /><br />
        </div>
        <div className="form-group">
        <label>
          <b>Question 1 </b>
        </label>
        <input className="form-control" type="text" name="q1" defaultValue={survey.q1} /><br />
        </div>
        <div className="form-group">
       <label>
          <b>Question 2 </b>
        </label>
        <input className="form-control" type="text" name="q2" defaultValue={survey.q2} /><br />
        </div>

        <div className="form-group">
        <label>
          <b>Question 3 </b>
        </label>
        <input className="form-control" type="text" name="q3" defaultValue={survey.q3} /><br />
        </div>

        <div className="form-group">
        <label>
          <b>Question 4 </b>
        </label>
        <input className="form-control" type="text" name="q4" defaultValue={survey.q4} /><br />
        </div>

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