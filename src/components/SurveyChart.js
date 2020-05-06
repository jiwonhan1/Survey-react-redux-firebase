import React from "react";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase'
import { Chart } from "react-google-charts";


function SurveyChart(){
  return (
    <div style={{ display: 'flex', maxWidth: 1200 }}>
      <Chart
        width={1000}
        height={600}
        chartType="ColumnChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['City', '2010 Population', '2000 Population'],
          ['New York City, NY', 8175000, 8008000],
          ['Los Angeles, CA', 3792000, 3694000],
          ['Chicago, IL', 2695000, 2896000],
          ['Houston, TX', 2099000, 1953000],
          ['Philadelphia, PA', 1526000, 1517000],
        ]}
        options={{
          title: 'Population of Largest U.S. Cities',
          chartArea: { width: '30%' },
          hAxis: {
            title: 'Total Population',
            minValue: 0,
          },
          vAxis: {
            title: 'City',
          },
        }}
        legendToggle
      />
    </div>
  )
}

export default SurveyChart;