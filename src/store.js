import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'

const initialState = {
  'activities': [],
  'fetchingActivities': false,
  'activityOffset': 20,
  'error': null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ACTIVITIES_PENDING': {
      state = {...state, 'fetchingActivities': true}
      break
    }
    case 'FETCH_ACTIVITIES_FULFILLED': {
      state = {...state, activities: JSON.parse(action.payload), 'fetchingActivities': false}
      break
    }
    case 'FETCH_ACTIVITIES_REJECTED': {
      state = {...state, 'error': action.payload, 'fetchingActivities': false}
      break
    }
    case 'LOAD_MORE_ACTIVITIES': {
      state = {...state, 'activityOffset': state.activityOffset + 20}
      break
    }
    default: {}
  }

  return state
}

const middleware = applyMiddleware(promiseMiddleware(), logger())

export default createStore(
  reducer,
  middleware
)
