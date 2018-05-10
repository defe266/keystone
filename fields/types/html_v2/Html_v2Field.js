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


	renderField () {
	
		return (
			
			<Editor/>
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
