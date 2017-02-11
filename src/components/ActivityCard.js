import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import './ActivityCard.css'



class ActivityCard extends Component {
  render () {
    const activity = this.props.activity
    let media = null
    let message = <p>{activity.activity_message}</p>

    if (activity.activity_attachment !== undefined && activity.activity_attachment !== null) {
      media = <img src={activity.activity_attachment} alt="Place Holder" className="responsive-img" />
      message = null
    }

    return (
      <Card className="ActivityCard">
        <CardHeader
          title={activity.actor_name}
          subtitle={`from ${activity.provider}`}
          avatar={activity.actor_avator} />
        <CardText>
        {message}
        {media}
        </CardText>
        <CardActions className="actions">
          <FlatButton label={`Like | ${activity.activity_likes}`} />
          <FlatButton label={`Comment | ${activity.activity_comments}`} />
          <FlatButton label={`Share | ${activity.activity_shares}`} />
        </CardActions>
      </Card>
    )
  }
}

export default ActivityCard
