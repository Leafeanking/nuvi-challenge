import React, { Component } from 'react'
import { connect } from 'react-redux'
import req from 'request-promise'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'


import SentimentLineGraph from './SentimentLineGraph'
import SentimentPolarGraph from './SentimentPolarGraph'

class Analysis extends Component {
  constructor (props) {
    super(props)
    this.props.fetchActivities()
  }

  gatherDataByProvider () {
    let dataByProvider = {}
    this.props.activities.map((activity, index) => {
      if (!dataByProvider.hasOwnProperty(activity.provider)) {
        dataByProvider[activity.provider] = {}
      }
      if (!dataByProvider[activity.provider].hasOwnProperty(activity.activity_date)) {
        dataByProvider[activity.provider][activity.activity_date] = {
          sentiments: [],
          lonlat: []
        }
      }
      dataByProvider[activity.provider][activity.activity_date] = {
        ...dataByProvider[activity.provider][activity.activity_date],
        activity_shares: activity.activity_shares,
        activity_likes: activity.activity_likes,
        activity_comments: activity.activity_comments
      }
      dataByProvider[activity.provider][activity.activity_date].lonlat.push({
        longitude: activity.activity_longitude,
        latitude: activity.activity_latitude
      })
      dataByProvider[activity.provider][activity.activity_date].sentiments.push(activity.activity_sentiment)
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
  return {
    fetchActivities: () => {
      dispatch({
        'type': 'FETCH_ACTIVITIES',
        'payload': req('https://nuvi-challenge.herokuapp.com/activities')
      })
    }
  }
}

Analysis = connect(mapStateToProps, mapDispatchToProps)(Analysis)

export default Analysis
