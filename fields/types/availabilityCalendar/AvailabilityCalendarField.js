import React from 'react';
import Field from '../Field';
/*import { css } from 'glamor';
import moment from 'moment'
import xhr from 'xhr';
import async from 'async';*/

/*
//import 'moment/locale/fr';
//import 'moment/src/locale/es';

//moment.locale('fr-ca')


require('moment/locale/es.js');

console.log(moment().locale('es').format('LLL'));

//import m from 'moment'

//window.m = m;

window.moment = moment;

//debugger;

//moment.locale('es')
*/

//import { FormInput } from '../../../admin/client/App/elemental';
//import tinymce from 'tinymce';
//import { FormInput } from '../../../admin/client/App/elemental';
//import evalDependsOn from '../../utils/evalDependsOn';


/*
import {
  Button,
  Alert
} from '../../../admin/client/App/elemental';

import DateInput from '../../components/DateInput';

import Calendar from './components/Calendar';
import ModalBlockDates from './components/ModalBlockDates';
*/

import CalendarApp from './subApp';


module.exports = Field.create({//React.createClass({

	displayName: 'AvailabilityCalendarField',

	statics: {

		type: 'AvailabilityCalendar',
	},

	renderField () {

		if(this.props.model == 'Room'){

			var hotel = this.props.values.hotel
		}

		return (

			<div>

				<CalendarApp model={this.props.model} hotel={hotel} hideName={this.props.hideName}/>
				
			</div>
		);
	},

	renderValue () {

		
		return (
			<div>
			
				<CalendarApp model={this.props.model} hideName={this.props.hideName}/>
				
			</div>
		);
	},

});