import React from "react";
import PropTypes from "prop-types";

function SurveyCard(props){
  const { survey } = props;

  return (
    <React.Fragment>
      <h1>Survey Card</h1>
      <h3>{survey.title}</h3>
      <p>{survey.p1}</p>
      <p>{survey.p2}</p>
      <p>{survey.p3}</p>
      <p>{survey.p4}</p>

    </React.Fragment>
  )
}

SurveyCard.proptype = {
  survey: PropTypes.object,

}

export default SurveyCard;