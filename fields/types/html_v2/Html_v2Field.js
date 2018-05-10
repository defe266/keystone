import Field from '../Field';
import React from 'react';

//import { FormInput } from '../../../admin/client/App/elemental';
//import evalDependsOn from '../../utils/evalDependsOn';

import Editor from './subApp';


module.exports = Field.create({

	displayName: 'Html_v2Field',

	statics: {
		type: 'Html_v2',
	},

	change: function  (value) {

		this.props.onChange({
			path: this.props.path,
			value: value,
		});
	},

	renderField () {
	
		const props = this.props;

		return (
			

			<div>
				<Editor name={this.getInputName(this.props.path)} defaultValue={props.value} onChange={this.change}/>
			</div>
		);
	},

	renderValue () {
		return (
			<FormInput multiline noedit>
				{this.props.value}
			</FormInput>
		);
	},

});
