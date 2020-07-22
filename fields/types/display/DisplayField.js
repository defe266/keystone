import React from 'react';
import Field from '../Field';


module.exports = Field.create({//React.createClass({

	displayName: 'DisplayField',

	statics: {

		type: 'Display',
	},

	/*
	change: function  (value) {

		this.props.onChange({
			path: this.props.path,
			value: value,
		});


	},*/

	componentWillMount(){

		//console.log('init',this.props)
		//console.log('handler',this.props.handler)

		if(this.props.handler){

			this.handler = new Function('return ' + this.props.handler)()//JSON.parse(this.props.handler, Function.deserialise)
		}
	},

	renderField () {

		const props = this.props;
		var content = this.handler ? this.handler(props.values) : ''

		return (

			<div dangerouslySetInnerHTML={{__html: content}}/>
		);
	},

	renderValue () {
		
		const props = this.props;
		var content = this.handler ? this.handler(props.values) : ''

		return (

			<div dangerouslySetInnerHTML={{__html: content}}/>
		);
	},

});