/* eslint-disable react/jsx-no-bind */

import assign from 'object-assign';
import { css, StyleSheet } from 'aphrodite/no-important';
import React from 'react';
import Field from '../Field';
import Domify from 'react-domify';


import List from './subApp/List';






var FieldElm = Field.create({
	displayName: 'ListField',
	statics: {
		type: 'List',
	},
	propTypes: {
		fields: React.PropTypes.object.isRequired,
		label: React.PropTypes.string,
		onChange: React.PropTypes.func.isRequired,
		path: React.PropTypes.string.isRequired,
		value: React.PropTypes.array,
	},
	
	renderUI () {
		const { label, value } = this.props;
		return (
			<div className={css(classes.container)}>

				<h3 data-things="whatever">{label}</h3>


				{this.shouldRenderField() ? (

					<List {...this.props}/>

				) : (
					<Domify value={value} />
				)}

				{this.renderNote()}
				

			</div>
		);
	},
});

const classes = StyleSheet.create({
	container: {
		marginTop: '2em',
		paddingLeft: '2em',
		boxShadow: '-3px 0 0 rgba(0, 0, 0, 0.1)',
	},
});



module.exports = FieldElm