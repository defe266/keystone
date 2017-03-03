import { combineReducers } from 'redux'

/*import basic from './basic';
import seasons from './seasons';
import variations from './variations';
*/
//import path from './path';
import parent from './parent';
import rates from './rates';
import seasons from './seasons';


const rootReducer = combineReducers({
  //basic,
  //variations,
  //seasons,
  path: (state = '', action) => state,
  parent,
  seasons,
  rates
})

export default rootReducer