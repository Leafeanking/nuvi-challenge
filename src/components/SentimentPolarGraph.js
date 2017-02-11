import React, { Component } from 'react'
import { Polar } from 'react-chartjs-2'

class SentimentPolarGraph extends Component {
  generateSeriesData () {
    let labels = []
    let datasets = {
      'data': [],
      'backgroundColor': [
        'rgba(12,191,239,1)',
        'rgba(225,193,0,1)',
        'rgba(255,36,0,1)',
        'rgba(46,255,0,1)'
      ]
    }

    // populate Datasets and Labels
    Object.entries(this.props.dataByProvider).map((data, index) => {
      labels.push(data[0])
      datasets.data.push(this.getTotalSentiments(data[1]))
      // Linter requires map to return a value.
      return null
    })

    return {'datasets': [datasets], 'labels': labels}
  }

  getTotalSentiments (providerActivites) {
    let totalSentiment = 0

    // Iterate over each date for provider and create cumlative sentiment total.
    for (const key in providerActivites) {
      if (providerActivites.hasOwnProperty(key)) {
        totalSentiment += providerActivites[key].sentiments.reduce((a, b) => { return a + b })
      }
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
