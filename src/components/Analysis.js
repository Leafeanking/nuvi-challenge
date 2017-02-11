import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Card, CardText} from 'material-ui/Card'
import SentimentLineGraph from './SentimentLineGraph'
import SentimentPolarGraph from './SentimentPolarGraph'

class Analysis extends Component {
  gatherDataByProvider () {
    // Restructures Data by Provider and dates of activities.
    let dataByProvider = {}
    this.props.activities.map((activity, index) => {
      // Ensure the Provider is present or else Initialize it.
      if (!dataByProvider.hasOwnProperty(activity.provider)) {
        dataByProvider[activity.provider] = {}
      }

      // Ensure Activity date is present in provider's data or else Initialize it.
      if (!dataByProvider[activity.provider].hasOwnProperty(activity.activity_date)) {
        dataByProvider[activity.provider][activity.activity_date] = {
          sentiments: [],
          lonlat: []
        }
      }

      // Compute an update cumlative data.
      dataByProvider[activity.provider][activity.activity_date] = {
        ...dataByProvider[activity.provider][activity.activity_date],
        activity_shares: activity.activity_shares,
        activity_likes: activity.activity_likes,
        activity_comments: activity.activity_comments
      }

      // Keep a record of where geographically activities are happening. Currently unused.
      dataByProvider[activity.provider][activity.activity_date].lonlat.push({
        longitude: activity.activity_longitude,
        latitude: activity.activity_latitude
      })

      // Keep a record of the sentiment of activities.
      dataByProvider[activity.provider][activity.activity_date].sentiments.push(activity.activity_sentiment)

      // Linter requires map to return a value.
      return null
    })

    return dataByProvider
  }

  render () {
    let dataByProvider = null

    if (this.props.activities) {
      dataByProvider = this.gatherDataByProvider()
    }

    return (
      <div className="Analysis">
        <Card className="analysisCard">
          <CardText>
            <SentimentLineGraph dataByProvider={dataByProvider} />
          </CardText>
        </Card>
        <Card className="analysisCard">
          <CardText>
            <SentimentPolarGraph dataByProvider={dataByProvider} />
          </CardText>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    'activities': state.activities
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

Analysis = connect(mapStateToProps, mapDispatchToProps)(Analysis)

export default Analysis
