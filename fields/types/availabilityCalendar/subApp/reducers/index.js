import { combineReducers } from 'redux'

import app from './app';
import units from './units';
import blockedDates from './blockedDates';
import bookings from './bookings';
import forms from './forms';

const rootReducer = combineReducers({
  app,
  units,
  blockedDates,
  bookings,
  forms
})

export default rootReducer