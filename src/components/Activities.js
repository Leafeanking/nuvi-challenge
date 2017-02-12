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
    let refreshCount = 0
    let refresher = setInterval(function () {
      if (refreshCount < 5) {
        packery.performLayout()
        refreshCount++
      } else {
        clearInterval(refresher)
      }
    }, 1000)
  }

  loadedActivities (props) {
    // Load 20 activities in DOM at a time.
    return props.activities.slice(0, props.activityOffset).map((activity, index) => {
      return (
        <ActivityCard ref={index} key={index} activity={activity} />
      )
    })
  }

  render () {
    return (
      <div className="Activities">
          <BoundPackery ref='packery'>
            {this.loadedActivities(this.props)}
          </BoundPackery>
        <RaisedButton
          label="Load More"
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
