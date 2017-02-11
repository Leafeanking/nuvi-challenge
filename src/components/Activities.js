import React, { Component } from 'react'
import { connect } from 'react-redux'
import req from 'request-promise'
import Packery from 'react-packery-component'
import ActivityCard from './ActivityCard'
import RaisedButton from 'material-ui/RaisedButton'

const BoundPackery = Packery(React)

class Activities extends Component {
  constructor (props) {
    super(props)
    this.props.fetchActivities()
  }

  componentDidMount () {
    // Super hacky packery refresh
    const packery = this.refs.packery
    setTimeout(function () {
      packery.performLayout()
    }, 1000)
  }

  loadedActivities (props) {
    return props.activities.slice(0, props.activityOffset).map((activity, index) => {
      return (
        <ActivityCard ref={index} key={index} activity={activity} />
      )
    })
  }

  render () {
    const test = (
      <BoundPackery ref='packery'>
        {this.loadedActivities(this.props)}
      </BoundPackery>
    )
    return (
      <div className="Activities">
        {test}
        <RaisedButton
          label="Primary"
          primary={true}
          style={{'float': 'right'}}
          onClick={this.props.loadMoreActivities} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    'activities': state.activities,
    'activityOffset': state.activityOffset
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchActivities: () => {
      dispatch({
        'type': 'FETCH_ACTIVITIES',
        'payload': req('https://nuvi-challenge.herokuapp.com/activities')
      })
    },
    loadMoreActivities: () => {
      dispatch({'type': 'LOAD_MORE_ACTIVITIES'})
    }
  }
}

Activities = connect(mapStateToProps, mapDispatchToProps)(Activities)

export default Activities
