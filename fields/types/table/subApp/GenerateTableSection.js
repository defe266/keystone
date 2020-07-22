/* eslint-disable react/jsx-no-bind */

import assign from 'object-assign';
//import { css, StyleSheet } from 'aphrodite/no-important';
import React from 'react';
import Field from '../../Field';
//import Domify from 'react-domify';
//var HTML5Backend = require('react-dnd-html5-backend');
//var DragDropContext = require('react-dnd').DragDropContext;

import { Fields } from 'FieldTypes';
import { Button, GlyphButton } from '../../../../admin/client/App/elemental';
import InvalidFieldType from '../../../../admin/client/App/shared/InvalidFieldType';

import {
	FormInput,
	Grid,
} from '../../../../admin/client/App/elemental';

var List = React.createClass({

	generateTable () {
		/*const { path, value, onChange } = this.props;
		onChange({
			path,
			value: [
				...value,
				{
					id: generateId(),
					_isNew: true,
				},
			],
        });*/
        console.log("geneeeerar")
	},
	render: function (){

		const { label, value } = this.props;
        const generateTable = this.generateTable;
		return (
			<div>
				<Grid.Row small="one-half" gutter={10}>
					<Grid.Col>
						<FormInput
						
							placeholder="nº Filas"
				
						/>
					</Grid.Col>
					<Grid.Col>
						<FormInput
							
							placeholder="nº Columnas"
						/>
					</Grid.Col>
					
				</Grid.Row>
				<br/>
				<GlyphButton color="success" glyph="plus" position="left" onClick={generateTable}>
					Generate
				</GlyphButton>
			</div>
			
		)
	}
})



module.exports = List