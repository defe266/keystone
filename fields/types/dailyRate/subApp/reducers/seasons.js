import _ from 'lodash'

export default (state = [], action) => {

	switch (action.type) {

		case 'SEASONS_DEL':

	      return _.filter(state, (i) => {

	          	return i._id != action.id
	        })


	    case 'SEASONS_PUT':

	      return state.map((item) => {

				if(item._id == action.data._id) return Object.assign({}, item, action.data);

				return item
			})
	      

	    case 'SEASONS_POST':

	      return [...state, action.data]

		default:
		  return state
	}

  return state;
}