import { combineReducers } from 'redux'

import formCreatorReducer from './formCreatorReducer';

const formsReducer = combineReducers({
	
  BLOCKEDDATES_CREATOR : formCreatorReducer('BLOCKEDDATES_CREATOR'),
  BLOCKEDDATES_EDITOR : formCreatorReducer('BLOCKEDDATES_EDITOR'),
  
})

export default formsReducer