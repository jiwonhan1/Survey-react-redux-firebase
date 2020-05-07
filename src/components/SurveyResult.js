import React from "react";
import PropTypes from "prop-types";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import SurveyChart from "./SurveyChart";
import { Chart } from "react-google-charts";
import firebase from "firebase";

function SurveyResult(props) {
  const { survey } = props;

  useFirestoreConnect([{ collection: "responses" }]);
  const responses = useSelector((state) => state.firestore.ordered.responses);

  if (isLoaded(responses)) {
    const relevantResponses = responses.filter(
      (response) => response.surveyId === survey.id
    );

    function getAverageResponse(propertyKey, responseArray) {
      let sum = 0;
      if (responseArray.length < 1 || responseArray === undefined) {
        return "No results yet";
      }
      responseArray.forEach((response) => {
        sum += response[propertyKey];
      });
      return sum / responseArray.length;
    }

    const r1 = getAverageResponse("r1", relevantResponses);
    const r2 = getAverageResponse("r2", relevantResponses);
    const r3 = getAverageResponse("r3", relevantResponses);
    const r4 = getAverageResponse("r4", relevantResponses);

    // if user is logged in
    if (firebase.auth().currentUser) {
      const user = firebase.auth().currentUser;

      const userResponses = responses.filter(
        (response) => response.userId === user.uid
      );

      const uR1 = getAverageResponse("r1", userResponses);
      const uR2 = getAverageResponse("r2", userResponses);
      const uR3 = getAverageResponse("r3", userResponses);
      const uR4 = getAverageResponse("r4", userResponses);

      console.log("average userResponse", getAverageResponse("r1", userResponses))
      console.log("average Responses", getAverageResponse("r1", relevantResponses))

      const getChart = () => {
        return (
          <div style={{ display: "flex", maxWidth: 1000, marginLeft: "50px" }}>
            <Chart
              width={1000}
              height={480}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={[
                [
                  `${survey.title}`,
                  "Your Response Value",
                  "Average Response Value",
                ],

                [`${survey.q1}`, uR1, r1],
                [`${survey.q2}`, uR2, r2],
                [`${survey.q3}`, uR3, r3],
                [`${survey.q4}`, uR4, r4],
              ]}
              options={{
                title: "Current feelings",
                chartArea: { width: "50%" },
                hAxis: {
                  title: "Survey Questions",
                  minValue: 0,
                },
                vAxis: {
                  title: "User Results",
                },
              }}
              legendToggle
            />
          </div>
        );
      };
      return (
        <>
          <h1>{survey.title}</h1>

          <h3>Results</h3>
          <p> Total number of responses: {relevantResponses.length}</p>
          <label className="lead">{survey.q1}</label>
          <p> Average answer: {getAverageResponse("r1", relevantResponses)}</p>
          <p className="lead">{survey.q2}</p>
          <p> Average answer: {getAverageResponse("r2", relevantResponses)}</p>
          <p className="lead">{survey.q3}</p>
          <p> Average answer: {getAverageResponse("r3", relevantResponses)}</p>
          <p className="lead">{survey.q4}</p>
          <p> Average answer: {getAverageResponse("r4", relevantResponses)}</p>

          <h3>{user.email}'s responses</h3>
          {getChart()}
        </>
      );
    } else {
      return (
        <>
          <h1>{survey.title}</h1>

          <h3>Results</h3>
          <p> Total number of responses: {relevantResponses.length}</p>
          <label className="lead">{survey.q1}</label>
          <p> Average answer: {getAverageResponse("r1", relevantResponses)}</p>
          <br />
          <p className="lead">{survey.q2}</p>
          <p> Average answer: {getAverageResponse("r2", relevantResponses)}</p>
          <br />
          <p className="lead">{survey.q3}</p>
          <p> Average answer: {getAverageResponse("r3", relevantResponses)}</p>
          <br />
          <p className="lead">{survey.q4}</p>
          <p> Average answer: {getAverageResponse("r4", relevantResponses)}</p>
          <br />
        </>
      );
    }
  } else {
    return (
      <>
        <h3>Loading...</h3>
      </>
    );
  }
}

SurveyResult.propTypes = {
  survey: PropTypes.object,
};

export default SurveyResult;
