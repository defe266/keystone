var defaultState = {

  collection : [],
  error : false,
  loading : false
}

export default (state = defaultState, action) => {

  switch (action.type) {

    case 'BOOKINGS_FETCH_REQUEST':

      return Object.assign({}, state, {
        loading: true,
      });

    case 'BOOKINGS_FETCH_SUCCESS':

      return Object.assign({}, state, {
        collection: action.data,
        loading: false,
        error: false
      });

    case 'BOOKINGS_FETCH_ERROR':

      return Object.assign({}, state, {
        loading: false,
        error: true
      });

    default:

      return state

  }
}