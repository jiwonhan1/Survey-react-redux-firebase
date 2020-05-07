import React from "react";
import PropTypes from "prop-types";
import {useFirestore} from "react-redux-firebase";
import firebase from "firebase/app";

// Create Survey Form - text inputs for questions,
// 4 inputs of the multiple choice

function CreateSurveyForm(props) {
    const firestore = useFirestore();

    function addNewSurveyToFireStore(event) {
        event.preventDefault();
        props.onNewSurveyCreation();

        return firestore.collection("surveys").add({
            title: event.target.title.value,
            purpose: event.target.purpose.value,
            q1: event.target.q1.value,
            q2: event.target.q2.value,
            q3: event.target.q3.value,
            q4: event.target.q4.value,
            timeSubmitted: firestore.FieldValue.serverTimestamp(),
            userId: firebase.auth().currentUser.uid
        });
    }

    if (firebase.auth().currentUser) {
        return (
            <>
                <h1>Make your own Survey!</h1>
                <button onClick={
                    () => props.onCancelClick()
                }>
                    &larr; Back</button>
                <hr/>
                <form onSubmit={addNewSurveyToFireStore}>
                    <div className="form-group">
                        <label>
                            <b>Title
                            </b>
                        </label>
                        <input className="form-control" type="text" name="title" placeholder="Survey title"/>
                        <br/>
                    </div>
                    <div className="form-group">
                        <label>
                            <b>Purpose of the survery
                            </b>
                        </label>
                        <textarea className="form-control" type="text" name="purpose" placeholder="Purpose of the survery"/>
                        <br/>
                    </div>
                    <div className="form-group">
                        <label>
                            <b>Question 1
                            </b>
                        </label>
                        <input className="form-control" type="text" name="q1" placeholder="First Question"/>
                        <br/>
                    </div>
                    <div className="form-group">
                        <label>
                            <b>Question 2
                            </b>
                        </label>
                        <input className="form-control" type="text" name="q2" placeholder="Second Question"/>
                        <br/>
                    </div>
                    <div className="form-group">
                        <label>
                            <b>Question 3
                            </b>
                        </label>
                        <input className="form-control" type="text" name="q3" placeholder="Third Question"/>
                        <br/>
                    </div>
                    <div className="form-group">
                        <label>
                            <b>Question 4
                            </b>
                        </label>
                        <input className="form-control" type="text" name="q4" placeholder="Fourth Question"/>
                        <br/>
                    </div>
                    <button type="submit">Add Survey</button>
                </form>
            </>
        );
    } else {
        return (
            <React.Fragment>
                <h3>Please sign in to create a survey</h3>
            </React.Fragment>
        );
    }
}

CreateSurveyForm.propTypes = {
    onNewSurveyCreation: PropTypes.func,
    onCancelClick: PropTypes.func
};

export default CreateSurveyForm;
