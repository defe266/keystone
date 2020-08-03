/* eslint-disable react/jsx-no-bind */

import assign from 'object-assign';
//import { css, StyleSheet } from 'aphrodite/no-important';
import React from 'react';
import Field from '../../Field';
//import Domify from 'react-domify';
//var HTML5Backend = require('react-dnd-html5-backend');
//var DragDropContext = require('react-dnd').DragDropContext;

import { Fields } from 'FieldTypes';
import { Button, GlyphButton, Modal } from '../../../../admin/client/App/elemental';
import InvalidFieldType from '../../../../admin/client/App/shared/InvalidFieldType';
import Holder from './Holder'
import ItemDrag from './ItemDrag'

let i = 0;
function generateId () {
	return i++;
};

const ItemDom = ({ name, id, index, onRemove, onChangeOrder, onDuplicate, children,  collapse, onShow }) => (


	<div>

		<Holder index={index} onChangeOrder={onChangeOrder}>

			<ItemDrag index={index}>

				<div style={{
					borderTop: '2px solid #eee',
					paddingTop: 15,
				}}>
					{name && <input type="hidden" name={name} value={id}/>}

					<div style={{ float: collapse ? 'left' : 'none'}}>
						{children}
					</div>

					<div style={{ textAlign: 'right', paddingBottom: 10, float: collapse ? 'right' : 'none'}}>

						{collapse ? 

							<span>
								<Button size="xsmall" color="primary" onClick={e => onShow(index)}>
									Edit
								</Button>
								&nbsp;&nbsp;
							</span>

						:null}
						
						<span>
							<Button size="xsmall" color="primary" onClick={e => onDuplicate(index)}>
								Duplicate
							</Button>
							&nbsp;&nbsp;
						</span>

						<Button size="xsmall" color="danger" onClick={onRemove}>
							Remove
						</Button>
					</div>

					<div style={{clear: "both"}} />
				</div>

			</ItemDrag>

		</Holder>

	</div>
);


var List = React.createClass({

	getInitialState () {

		return {
			showModal: null
		}
	},

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

	    const { value: oldValue, path, onChange } = this.props;

	    let item = oldValue[indexFrom]

	    let value = oldValue.filter((i) => i.id != item.id)

	    let index = indexTo

	    value  = [

	      ...value.slice(0, index),
	      item,
	      ...value.slice(index)
	    ]

	    onChange({ path, value });
	},

	duplicate (index) {

		const { value: oldValue, path, onChange } = this.props;

		var newItem = {...oldValue[index], ...{
			id: generateId(),
			_isNew: true,
		}}

		const value = oldValue.slice(0, index+1).concat([newItem]).concat(oldValue.slice(index));

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

	handleClose () {
		
		this.setState({showModal:null});
	},

	handleShow (index) {
		
		this.setState({showModal:index});

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
		const collapse = this.props.collapse
		

		return (
			<div>

				{value.map((value, index) => {

					const { id, _isNew } = value;
					const name = !_isNew && `${path}[${index}][id]`;
					const onRemove = e => this.removeItem(index);
					const onChangeOrder = this.changeOrder
					const onDuplicate = this.duplicate
					

					if(collapse){

						var collapseKeys = collapse.split(' ')
					}

					return (
						<ItemDom key={id} {...{ id, index, name, onRemove, onChangeOrder, onDuplicate, collapse}} onShow={this.handleShow}>
							
							{!collapse ? this.renderFieldsForItem(index, value) :

								<div style={{lineHeight: "25px"}}>


									<span className="octicon octicon-three-bars" /> &nbsp;&nbsp;


									{collapseKeys.map(k => {

										var subKs = k.split('.');

										if(subKs.length > 1){

											return value[subKs[0]] ? value[subKs[0]][subKs[1]] : ''

										}else{

											return value[k]
										}

									}).join(' ')}

									{/*Only for submit propose*/}
									<div style={{display: 'none'}}>{this.renderFieldsForItem(index, value)}</div>

									<Modal.Dialog isOpen={this.state.showModal == index} onClose={this.handleClose} backdropClosesModal>
										<Modal.Header
											onClose={this.handleClose}
											showCloseButton
											text={'Edit Item'}
										/>
										<Modal.Body>

											<br/>
											{this.state.showModal == index ? this.renderFieldsForItem(index, value) : null}
											<br/>
											
										</Modal.Body>
										<Modal.Footer>
											{/*<Button color="primary" submit>Update</Button>
											<Button color="cancel" variant="link" onClick={this.handleClose}>Cancel</Button>*/}
											<Button color="primary" onClick={this.handleClose}>Aceptar</Button>
										</Modal.Footer>
									</Modal.Dialog>
									
								</div>
							}


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