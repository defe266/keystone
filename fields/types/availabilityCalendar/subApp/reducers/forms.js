import { combineReducers } from 'redux'

import formCreatorReducer from './formCreatorReducer';

const formsReducer = combineReducers({
	
  BLOCKEDDATES_CREATOR : formCreatorReducer('BLOCKEDDATES_CREATOR',{
  	data: {
      unit:'',
      name:'',
      dateFrom: '',
      dateTo: ''
    }
  }),

  BLOCKEDDATES_EDITOR : formCreatorReducer('BLOCKEDDATES_EDITOR', {
  	data: {
      unit:'',
      name:'',
      dateFrom: '',
      dateTo: ''
    }
  }),

  UNITS_CREATOR : formCreatorReducer('UNITS_CREATOR',{
  	data: {
  		number: 1,
  	}
  }),
  
})

export default formsReducer