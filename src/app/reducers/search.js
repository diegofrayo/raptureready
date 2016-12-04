import { SET_QUERY, ACTIVATE_SEARCH, DEACTIVATE_SEARCH } from '../actions'

const search = (state = {query: '', isActive: false}, action) => {
  switch (action.type) {
    case SET_QUERY:
      let active = true
      if (action.search === null || action.search === '')
        active = false
      return {
        ...state,
        query: action.search,
        isActive: active
      }
    case ACTIVATE_SEARCH:
      return {
        ...state,
        isActive: true
      }
    case DEACTIVATE_SEARCH:
      return {
        ...state,
        isActive: false
      }
    default:
      return state
  }
}
export default search
