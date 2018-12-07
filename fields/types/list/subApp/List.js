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
import Holder from './Holder'
import ItemDrag from './ItemDrag'

let i = 0;
function generateId () {
	return i++;
};

const ItemDom = ({ name, id, index, onRemove, onChangeOrder, children }) => (


	<div>

		<Holder index={index} onChangeOrder={onChangeOrder}>

			<ItemDrag index={index}>

				<div style={{
					borderTop: '2px solid #eee',
					paddingTop: 15,
				}}>
					{name && <input type="hidden" name={name} value={id}/>}
					{children}
					<div style={{ textAlign: 'right', paddingBottom: 10 }}>
						<Button size="xsmall" color="danger" onClick={onRemove}>
							Remove
						</Button>
					</div>
				</div>

			</ItemDrag>

		</Holder>

	</div>
);


var List = React.createClass({

	addItem () {
		const { path, value, onChange } = this.props;
		onChange({
			path,
			value: [
				...value,
				{
					id: generateId(),
					_isNew: true,
				},
			],
		});
	},
	removeItem (index) {
		const { value: oldValue, path, onChange } = this.props;
		const value = oldValue.slice(0, index).concat(oldValue.slice(index + 1));
		onChange({ path, value });
	},

	//# Add sort
	changeOrder: function(indexFrom, indexTo){


	    function moveObjectAtIndex(array, sourceIndex, destIndex) {

	        var placeholder = {};
	        // remove the object from its initial position and
	        // plant the placeholder object in its place to
	        // keep the array length constant
	        var objectToMove = array.splice(sourceIndex, 1, placeholder)[0];
	        // place the object in the desired position
	        array.splice(destIndex, 0, objectToMove);
	        // take out the temporary object
	        array.splice(array.indexOf(placeholder), 1);
	    }

	    const { value: oldValue, path, onChange } = this.props;

	    var value = oldValue.slice();

	    moveObjectAtIndex(value, indexFrom, indexTo);

	    onChange({ path, value });

	},

	handleFieldChange (index, event) {
		const { value: oldValue, path, onChange } = this.props;
		const head = oldValue.slice(0, index);
		const item = {
			...oldValue[index],
			[event.path]: event.value,
		};
		const tail = oldValue.slice(index + 1);
		const value = [...head, item, ...tail];
		onChange({ path, value });
	},
	renderFieldsForItem (index, value) {
		return Object.keys(this.props.fields).map((path) => {
			const field = this.props.fields[path];
			if (typeof Fields[field.type] !== 'function') {
				return React.createElement(InvalidFieldType, { type: field.type, path: field.path, key: field.path });
			}
			const props = assign({}, field);
			props.value = value[field.path];
			props.values = value;
			props.onChange = this.handleFieldChange.bind(this, index);
			props.mode = 'edit';
			props.inputNamePrefix = `${this.props.path}[${index}]`;
			props.key = field.path;
			// TODO ?
			// if (props.dependsOn) {
			// 	props.currentDependencies = {};
			// 	Object.keys(props.dependsOn).forEach(dep => {
			// 		props.currentDependencies[dep] = this.state.values[dep];
			// 	});
			// }
			return React.createElement(Fields[field.type], props);
		}, this);
	},
	renderItems () {
		const { value = [], path } = this.props;
		const onAdd = this.addItem;
		return (
			<div>

				{value.map((value, index) => {
					const { id, _isNew } = value;
					const name = !_isNew && `${path}[${index}][id]`;
					const onRemove = e => this.removeItem(index);
					const onChangeOrder = this.changeOrder

					return (
						<ItemDom key={id} {...{ id, index, name, onRemove, onChangeOrder }}>
							{this.renderFieldsForItem(index, value)}
						</ItemDom>
					);
				})}
				<GlyphButton color="success" glyph="plus" position="left" onClick={onAdd}>
					Add
				</GlyphButton>
			</div>
		);
	},

	render: function (){

		const { label, value } = this.props;

		return (

			<div>
				
				{this.renderItems()}

			</div>
		)
	}
})

//List = DragDropContext(HTML5Backend)(List);


module.exports = List