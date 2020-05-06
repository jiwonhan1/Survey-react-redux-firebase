import React from "react";
import PropTypes from "prop-types";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import SurveyChart from './SurveyChart';
import { Chart } from "react-google-charts";
import firebase from "firebase";





function SurveyResult(props) {
  const { survey } = props;
  useFirestoreConnect([{ collection: "responses" }]);

  const responses = useSelector((state) => state.firestore.ordered.responses);
  console.log("response ", responses);

  if (isLoaded(responses)) {
    const relevantResponses = responses.filter(
      (response) => response.surveyId === survey.id
    );

    console.log("relevent response ", relevantResponses); 

    // function getUserResponse(propertyKey, ){
      const user = firebase.auth().currentUser;

        const userResponses = responses.filter(
          (response) => response.userId === user.uid
        );
        console.log("user responses ", userResponses);
        //sort responses by timeSubmitted
    const testTimestamp = userResponses[userResponses.length - 1].timeSubmitted;
    console.log ("This is how to access testTimeStamp: seconds ",testTimestamp.seconds);

    // console.log("user time seconds ", userResponses[userResponses.length - 1].timeSubmitted.getSeconds())



    //UserResponses.timeSubmitted.seconds =  1588801767 value for time object at 3:06 pm
    // 1588802864 value for time object at 3:08 pm

    //
            // if the user has taken this survey more than once it will return more than one property for r1, r2 etc
    // }

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
        <div style={{ display: "flex", maxWidth: 1000 }}>
          <Chart
            width={1000}
            height={480}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={[
              [
                `${survey.title}`,
                "Your Response Value",
                "Average Response Value"
              ],

              [`${survey.q1}`, 3, r1],
              [`${survey.q2}`, 3, r2],
              [`${survey.q3}`, 3, r3],
              [`${survey.q4}`, 3, r4],
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
      </>
    );
  } else {
    return (
      <>
        <h3>Loading...</h3>
      </>
    );
  }
}


            // Survey Name = survey.title
            // Your Response Value // data not yet avalible

            // Quesiton1 = survey.q1
            // Question2 = survey.q2
            // Question3 = survey.q3
            // Question4 = survey.q4

            // Average Response value for question 1 == {getAverageResponse("q1, relevantResponses")}
            // Average Response value for question 2 == {getAverageResponse("q2, relevantResponses")}
            // Average Response value for question 3 == {getAverageResponse("q3, relevantResponses")}
            // Average Response value for question 4 == {getAverageResponse("q4, relevantResponses")}


            // data={[
            //   ["Survey Name *", "Your Response Value", "Average Response Value"],
            //   ["Question 1 *", "NY", 3, 4.5],
            //   ["Question 2 *", "CA", 3, 2.3],
            //   ["Question 3 *", "IL", 3, 4.2],
            //   ["Question 4 *", "TX", 3, 1.6],
            // ]}


  // <Chart
  //   width={400}
  //   height={300}
  //   chartType="ColumnChart"
  //   loader={<div>Loading Chart</div>}
  //   data={[
  //     ["City", "2010 Population", "2000 Population"],
  //     ["New York City, NY", 8175000, 8008000],
  //     ["Los Angeles, CA", 3792000, 3694000],
  //     ["Chicago, IL", 2695000, 2896000],
  //     ["Houston, TX", 2099000, 1953000],
  //     ["Philadelphia, PA", 1526000, 1517000],
  //   ]}
  //   options={{
  //     title: "Population of Largest U.S. Cities",
  //     chartArea: { width: "30%" },
  //     hAxis: {
  //       title: "Total Population",
  //       minValue: 0,
  //     },
  //     vAxis: {
  //       title: "City",
  //     },
  //   }}
  //   legendToggle
  // />;





//   <div style={{ display: "flex", maxWidth: 900 }}>
//           <Chart
//             width={400}
//             height={300}
//             chartType="ColumnChart"
//             loader={<div>Loading Chart</div>}
//             // How to place survey info within data

//             data={[
//               [`${survey.title}`, "Your Response", "Average Response Value"],
//               [
//                 `${survey.q1}`,
//                 "NY",
//                 2,
//                 `${getAverageResponse("r4", relevantResponses)}`,
//               ],
//             ]}
//             options={{
//               title: " Survey Results",
//               chartArea: { width: "30%" },
//               hAxis: {
//                 title: "Total Population",
//                 minValue: 0,
//               },
//               vAxis: {
//                 title: "City",
//               },
//             }}
//             legendToggle
//           />
//         </div>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <h3>Loading...</h3>
//       </>
//     );
//   }
// }
 
SurveyResult.propTypes = {
  survey: PropTypes.object,
};

export default SurveyResult;