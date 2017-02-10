import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

const colorSchemes = [
  {
    transparent: 'rgba(12,191,239,0.4)',
    solid: 'rgba(12,191,239,1)'
  },
  {
    transparent: 'rgba(225,193,0,0.4)',
    solid: 'rgba(225,193,0,1)'
  },
  {
    transparent: 'rgba(255,36,0,0.4)',
    solid: 'rgba(255,36,0,1)'
  },
  {
    transparent: 'rgba(46,255,0,0.4)',
    solid: 'rgba(46,255,0,1)'
  }
]

const detasetDefaults = {
  fill: true,
  lineTension: 0.1,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10
}

class SentimentLineGraph extends Component {
  generateSeriesData () {
    return Object.entries(this.props.dataByProvider).map((data, index) => {
      let wat = {
        ...detasetDefaults,
        label: data[0],
        backgroundColor: colorSchemes[index].transparent,
        borderColor: colorSchemes[index].solid,
        pointBorderColor: colorSchemes[index].solid,
        pointHoverBackgroundColor: colorSchemes[index].solid,
        pointHoverBorderColor: colorSchemes[index].solid,
        data: Object.entries(data[1]).map((dayData, i) => {
          let actualData = dayData[1]
          return actualData.sentiments.reduce((a, b) => { return a + b })
        })
      }
      return wat
    })
  }

  render () {
    let sentimentLineGraph = null
    const dataSets = this.generateSeriesData()
    if (dataSets.length) {
      sentimentLineGraph = (
        <Line
          data={{
            'labels': ['Two Days Ago', 'Yesterday', 'Today'], // Taking the easy way out.
            'datasets': dataSets
          }}
          options={{
            'title': {
              'text': 'Daily Sentiment by Provider',
              'display': true
            }
          }} />
      )
    }

    return (
      <div className="SentimentLineGraph">
        {sentimentLineGraph}
      </div>
    )
  }
}

export default SentimentLineGraph
