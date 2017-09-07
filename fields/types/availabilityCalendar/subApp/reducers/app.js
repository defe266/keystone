export default (state = {
 
	error: false,
	cursor: null,
	loading: false,

}, action) => {

	switch (action.type) {

		case 'LOADING_START':

		  return Object.assign({}, state, {
	        loading: true,
	      });

		case 'LOADING_END':

		  return Object.assign({}, state, {
	        loading: false,
	      });

	    case 'ERROR':

		  return Object.assign({}, state, {
	        error: true,
	      });

	    case 'CURSOR_CHANGE':

		  return Object.assign({}, state, {
	        cursor: action.cursor,
	      });

		default:
		  return state
	}

  return state;
}
