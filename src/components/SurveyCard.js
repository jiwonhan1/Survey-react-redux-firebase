import React from "react";
import PropTypes from "prop-types";

function SurveyCard(props){
  const { survey, whenSurveyClicked } = props;
  return (
    <React.Fragment>
      <div onClick={() => whenSurveyClicked(survey.id)}>
      <h3>{survey.title}</h3>
      <hr /> 
      </div>
    </React.Fragment>
  )
}

SurveyCard.proptype = {
  survey: PropTypes.object,
  whenSurveyClicked: PropTypes.func,
}

export default SurveyCard;