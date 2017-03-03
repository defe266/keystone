//import moment from 'moment'

export default (state = {
 
 minDays: 1,
 maxDays: 1,
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