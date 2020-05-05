import React from "react";
import PropTypes from "prop-types";
import SurveyCard from "./SurveyCard";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase"; 

function SurveyList(props){
  useFirestoreConnect([
    {collection: 'surveys'}
  ])

  const surveys = useSelector(state => state.firestore.ordered.surveys)

  if (isLoaded(surveys)){
  return (
    <React.Fragment>
      <hr/>
      {surveys.map((survey) => {
        return <SurveyCard
        survey={survey}
        whenSurveyClicked = {props.onSurveySelection}
        />
      })}
    </React.Fragment>
  )
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}

SurveyList.proptype = {
  onSurveySelection: PropTypes.func
}

export default SurveyList;