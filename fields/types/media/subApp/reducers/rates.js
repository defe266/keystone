import _ from 'lodash'

export default (state = [], action) => {

	switch (action.type) {

		case 'RATES_DEL':

	      return _.filter(state, (i) => {

	          	return i._id != action.id
	        })


	    case 'RATES_PUT':

	      return state.map((item) => {

				if(item._id == action.data._id) return Object.assign({}, item, action.data);

				return item
			})
	      

	    case 'RATES_POST':

	      return [...state, action.data]


	    case 'RATES_BULK_POST':

	      return [...state, ...action.data]

	      

		default:
		  return state
	}

  return state;
}
