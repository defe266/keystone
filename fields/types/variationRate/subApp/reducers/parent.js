//import moment from 'moment'

export default (state = {
 
 variations: []

}, action) => {

	switch (action.type) {
		
		case 'PARENT_CHANGE':

		  return action.data;

		default:
		  return state
	}

  return state;
}