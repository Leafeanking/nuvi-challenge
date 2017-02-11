import React, { Component } from 'react'
import { AppBar, Drawer, MenuItem } from 'material-ui'
import { Link } from 'react-router'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {'open': false}
  }

  handleToggle () {
    this.setState({open: !this.state.open})
  }

  handleClose () {
    this.setState({open: false})
  }



  render () {
    return (
      <div className="App">
        <AppBar
          title="Nuvi Challenge"
          onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />

        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
          <Link to="/"><MenuItem onTouchTap={this.handleClose.bind(this)}>Activities</MenuItem></Link>
          <Link to="/analysis"><MenuItem onTouchTap={this.handleClose.bind(this)}>Analysis</MenuItem></Link>
        </Drawer>

        <div className="wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
