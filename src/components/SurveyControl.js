import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withFirestore, isLoaded } from "react-redux-firebase";
import CreateSurveyForm from "./CreateSurveyForm";
import SurveyList from "./SurveyList";
import SurveyResult from "./SurveyResult";
import EditSurveyForm from "./EditSurveyForm";
import Survey from "./Survey";

class SurveyControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createSurveyFormVisible: false,
      editSurveyFormVisible: false,
      selectedSurvey: null,
      respondToSurveyFormVisible: false,
      surveyResultsVisible: false,
    };
  }

  handleAddingNewSurvey = () => {
    this.setState({createSurveyFormVisible: false});
  }

  handleAddingSurveyResponse = (id) => {
    this.setState({surveyResultsVisible: true})
  }

  handleSelectingSurvey = (id) => {
    this.props.firestore.get({collection: "surveys", doc: id})
    .then((survey) => {
      const firestoreSurvey = {
        title: survey.get("title"),
        q1: survey.get("q1"),
        q2: survey.get("q2"),
        q3: survey.get("q3"),
        q4: survey.get("q4"),
        id: survey.id,
      }
      this.setState({ selectedSurvey: firestoreSurvey });
    })
  }

  handleViewSurveyResponseClick = () => {
    this.setState({surveyResultsVisible: true});
  }

  handleClickToDeleteSurvey = () => {
    this.props.firestore.delete({ collection: "surveys", doc: this.state.selectedSurvey.id });
    this.setState({
      selectedSurvey: null,
    });
  };

  handleEditSurvey = (id) => {
    this.setState({editSurveyFormVisible: false});
    this.handleSelectingSurvey(id);
  };

  handleClickToEditSurvey = () => {
    this.setState({editSurveyFormVisible: true});
  };
  
  handleClickToCreateSurvey = () => {
    this.setState({createSurveyFormVisible: true});
  }

  handleCancelClick = () => {
    this.setState({
      createSurveyFormVisible: false, editSurveyFormVisible:false, respondToSurveyFormVisible:false, selectedSurvey: null, surveyResultsVisible:false,
    })
  }

  setVisibleComponent = () => {
    if (this.state.editSurveyFormVisible){
      return (<EditSurveyForm survey={this.state.selectedSurvey} onCancelClick={this.handleCancelClick} onEditSurveyFormSubmission={this.handleEditSurvey}/>);
    } else if (this.state.surveyResultsVisible) {
      return (
        <>
          <button onClick={this.handleCancelClick}>Back to List</button>
          <SurveyResult survey={this.state.selectedSurvey}/>
        </>
        )
    } else if (this.state.selectedSurvey != null){
      return (
        <Survey
          survey={this.state.selectedSurvey}
          onCancelClick={this.handleCancelClick}
          onSurveyResponseSubmit={this.handleAddingSurveyResponse}
          onViewResponsesClick={this.handleViewSurveyResponseClick}
          onDeleteSurveyClick={this.handleClickToDeleteSurvey}
          onEditSurveyClick={this.handleClickToEditSurvey}
        />
      );
    } else if (this.state.createSurveyFormVisible) {
      return (
        <CreateSurveyForm
          onNewSurveyCreation={this.handleAddingNewSurvey}
          onCancelClick={this.handleCancelClick}
        />
      );
    } else {
      return (
        <>
          <button onClick={this.handleClickToCreateSurvey}>Make your own survey</button>
          <SurveyList onSurveySelection={this.handleSelectingSurvey}/>
        </>
      )
    }
  }

  render(){
    let currentView = this.setVisibleComponent();
    return (
      <>
      {currentView}
      </>
    )
  }
}

// SurveyControl.propTypes = {
// }

const mapStateToProps = (state) => {
  return {}
}

SurveyControl = connect(mapStateToProps)(SurveyControl);
export default withFirestore(SurveyControl);