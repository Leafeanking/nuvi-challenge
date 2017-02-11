import React, { Component } from 'react'
import { Polar } from 'react-chartjs-2'

class SentimentPolarGraph extends Component {
  generateSeriesData () {
    let retData = {
      'data': [],
      'backgroundColor': [
        'rgba(12,191,239,1)',
        'rgba(225,193,0,1)',
        'rgba(255,36,0,1)',
        'rgba(46,255,0,1)'
      ]
    }
    let labels = []
    Object.entries(this.props.dataByProvider).map((data, index) => {
      labels.push(data[0])
      retData.data.push(this.getTotalSentiments(data[1]))
    })
    return {'datasets': [retData], 'labels': labels}
  }

  getTotalSentiments (providerActivites) {
    let totalSentiment = 0
    for (const key in providerActivites) {
      totalSentiment += providerActivites[key].sentiments.reduce((a, b) => { return a + b })
    }
    return totalSentiment
  }

  render () {
    let SentimentPolarGraph = null
    const dataSets = this.generateSeriesData()
    if (dataSets) {
      SentimentPolarGraph = (
        <Polar
          data={dataSets}
          options={{
            'title': {
              'text': 'Overall Sentiment by Provider',
              'display': true
            }
          }} />
      )
    }

    return (
      <div className="SentimentPolarGraph">
        {SentimentPolarGraph}
      </div>
    )
  }
}

export default SentimentPolarGraph
