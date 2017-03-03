import React from 'react';
import Field from '../Field';

import DailyRateApp from './subApp';

module.exports = Field.create({//React.createClass({

	displayName: 'DailyRateField',

	statics: {

		type: 'DailyRate',
	},

	renderField () {

		var values = this.props.values;

		var parent = {
				
			variations: values[this.props.variations],
			minDays: values[this.props.minDays],
			maxDays: values[this.props.maxDays]
		}

		var rates = this.props.value;


		//console.log('this.props',this.props,parent)

		return (

			<div>

				<DailyRateApp parent={parent} rates={rates} path={this.props.path}/>
				
			</div>
		);
	},

	renderValue () {

		
		return (
			<div>
			
				Not value
				
			</div>
		);
	},

});