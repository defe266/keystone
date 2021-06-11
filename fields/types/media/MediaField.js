import React from 'react';
import Field from '../Field';

import ImgUploader from './subApp';
import ImgUploaderNoEdit from './noEdit';

module.exports = Field.create({//React.createClass({

	displayName: 'MediaField',

	statics: {

		type: 'Media',
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

				{/*<DailyRateApp parent={parent} rates={rates} path={this.props.path}/>*/}
				<ImgUploader path={this.getInputName(this.props.path)} many={props.many} sizeMax={props.sizeMax} model={props.model} value={props.value} onChange={this.change}/>

			</div>
		);
	},

	renderValue () {
		
		const props = this.props;
		
		return (
			<div>
			
				<ImgUploaderNoEdit path={this.getInputName(this.props.path)} many={props.many} model={props.model} value={props.value}/>
				
			</div>
		);
	},

});