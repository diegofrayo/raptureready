export const REQUEST_CHANNELS = 'REQUEST_CHANNELS'
export const requestChannels = () => ({
  type: REQUEST_CHANNELS,
})

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS'
export const receiveChannels = (json) => ({
  type: RECEIVE_CHANNELS,
  channels: json,
  receivedAt: Date.now()
})

export const SEARCH_CHANNELS = 'SEARCH_CHANNELS'
export const searchChannels = (search) => ({
  type: SEARCH_CHANNELS,
  search,
})

export const SET_LOCATION = 'SET_LOCATION'
export const setLocation = (location) => ({
  type: SET_LOCATION,
  location,
})

export const SET_QUERY = 'SET_QUERY'
export const setQuery = (search) => ({
  type: SET_QUERY,
  search,
})


export const ACTIVATE_SEARCH = 'ACTIVATE_SEARCH'
export const activateSearch = (search) => ({
  type: ACTIVATE_SEARCH,
})



export const DEACTIVATE_SEARCH = 'DEACTIVATE_SEARCH'
export const deactivateSearch = (search) => ({
  type: DEACTIVATE_SEARCH,
})

export const fetchChannels = () => (dispatch, getState) => {
  if(getState().channels.visibleChannelIds <= 0) {
    dispatch(requestChannels())
    return fetch(`http://www.eternityready.com/api/channels/all`,
      {mode:"cors"})
      .then(response => response.json())
      .then(json => dispatch(receiveChannels(json)))
    }
}

