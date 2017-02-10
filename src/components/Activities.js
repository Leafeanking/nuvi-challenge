import React, { Component } from 'react'
import { connect } from 'react-redux'
import req from 'request-promise'
import Packery from 'react-packery-component'
import ActivityCard from './ActivityCard'

const BoundPackery = Packery(React)

const packeryOptions = {
  transitionDuration: 0
}

class Activities extends Component {
  constructor (props) {
    super(props)
    this.props.fetchActivities()
  }

  loadedActivities (props) {
    return props.activities.slice(0, 20).map((activity, index) => {
      return (
        <ActivityCard key={index} activity={activity} />
      )
    })
  }

  render () {
    return (
      <div className="Activities">
        <BoundPackery
          className={'packery'}
          elementType={'div'}
          options={packeryOptions}
          disableImagesLoaded={false} >
          {this.loadedActivities(this.props)}
        </BoundPackery>
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

Activities = connect(mapStateToProps, mapDispatchToProps)(Activities)

export default Activities
