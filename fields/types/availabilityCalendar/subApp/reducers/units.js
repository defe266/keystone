var defaultState = {

	collection : [],
	error : false,
	loading : false
}

export default (state = defaultState, action) => {

  switch (action.type) {

  	case 'UNITS_FETCH_REQUEST':

      return Object.assign({}, state, {
        loading: true,
      });

    case 'UNITS_FETCH_SUCCESS':

      return Object.assign({}, state, {
      	collection: action.data,
        loading: false,
        error: false
      });

    case 'UNITS_FETCH_ERROR':

      return Object.assign({}, state, {
        loading: false,
        error: true
      });


    case 'UNITS_CREATE':

      return Object.assign({}, state, {

        collection : state.collection.concat(action.data) //[...state.collection, action.data]

      });

      

    default:

      return state

  }
}