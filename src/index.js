import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import App from './App'
import './index.css'
import store from './store'

import Activities from './components/Activities'
import Analysis from './components/Analysis'

injectTapEventPlugin()

ReactDOM.render((
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Activities} />
            <Route path="analysis" component={Analysis} />
          </Route>
        </Router>
      </MuiThemeProvider>
    </Provider>
), document.getElementById('root'))

// ReactDOM.render(
//   <Provider store={store}>
//     <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
//       <App />
//     </MuiThemeProvider>
//   </Provider>,
//   document.getElementById('root')
// )
