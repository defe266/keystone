import React from 'react';
import Field from '../Field';

import RateApp from './subApp';

module.exports = Field.create({//React.createClass({

	displayName: 'VariationField',

	statics: {

		type: 'VariationRate',
	},

	renderField () {

		var values = this.props.values;

		var parent = {
				
			variations: values[this.props.variations],
		}

		var rates = this.props.value;

		return (

			<div>

				<RateApp parent={parent} rates={rates} path={this.props.path}/>
				
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