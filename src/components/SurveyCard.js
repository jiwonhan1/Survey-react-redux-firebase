import React from "react";
import PropTypes from "prop-types";

function SurveyCard(props){
  const { survey, whenSurveyClicked } = props;
  console.log(survey);
  return (
    <React.Fragment>
      <div onClick={() => whenSurveyClicked(survey.id)}>
      <h1><small>survey:</small> {survey.title}</h1>
      {/* <p>{survey.q1}</p>
      <p>{survey.q2}</p>
      <p>{survey.q3}</p>
      <p>{survey.q4}</p> */}
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