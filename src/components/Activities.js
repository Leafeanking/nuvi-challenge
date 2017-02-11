import React, { Component } from 'react'
import { connect } from 'react-redux'
import Packery from 'react-packery-component'
import ActivityCard from './ActivityCard'
import RaisedButton from 'material-ui/RaisedButton'

const BoundPackery = Packery(React)

class Activities extends Component {
  componentDidMount () {
    // Super hacky packery refresh
    const packery = this.refs.packery
    setTimeout(function () {
      packery.performLayout()
    }, 2000)
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
    loadMoreActivities: () => {
      dispatch({'type': 'LOAD_MORE_ACTIVITIES'})
    }
  }
}

Activities = connect(mapStateToProps, mapDispatchToProps)(Activities)

export default Activities
