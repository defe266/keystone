import React from 'react';
//import Field from '../Field';
//import { css } from 'glamor';
//import moment from 'moment'

//import { FormInput } from '../../../admin/client/App/elemental';
//import tinymce from 'tinymce';
//import { FormInput } from '../../../admin/client/App/elemental';
//import evalDependsOn from '../../utils/evalDependsOn';

import {
  Modal,
  Button,
  FormInput
} from '../../../../admin/client/App/elemental';

import DateInput from '../../../components/DateInput';


module.exports = React.createClass({//React.createClass({


	update (data) {

		//debugger;

		 //format="DD/MM/YYYY"
		this.props.update(data);

	},

	save (e) {

		e.preventDefault();
		this.props.save();
	},

	render () {

		var props = this.props;
		var data = props.data;

		/*const BUTTON_SIZES = ['large', 'medium', 'small', 'xsmall'];
		const BUTTON_VARIANTS = ['fill', 'hollow', 'link'];
		const BUTTON_COLORS = ['default', 'primary', 'success', 'warning', 'danger', 'cancel', 'delete'];
		*/

		return (


				<Modal.Dialog isOpen={props.isOpen} width='300' onClose={props.onClose} backdropClosesModal>{/*enableKeyboardInput*/}
			        <Modal.Header text="Bloquear fechas" showCloseButton/>
			        <Modal.Body>
			          
			          	<label>Nombre</label>
			        	<FormInput autoComplete="off" value={data.name} onChange={(e) => this.update({name : e.target.value})}/>
			        	<br/>

			        	<label>Desde</label>
			        	<DateInput value={data.dateFrom} format="DD/MM/YYYY" onChange={(data) => this.update({dateFrom : data.value})}/>
			        	<br/>

						<label>Hasta</label>
			        	<DateInput value={data.dateTo} format="DD/MM/YYYY" onChange={(data) => this.update({dateTo : data.value})}/>
			        	<br/>

			        </Modal.Body>
			        <Modal.Footer>
			          <Button color="primary" onClick={this.save}>Guardar</Button> &nbsp; &nbsp;

			          {props.onRemove ?

			          	<span><Button color="danger" onClick={props.onRemove}>Eliminar</Button>&nbsp;  &nbsp;</span>

			          :null}
			          
			          <Button color="default" variant="link" onClick={props.onClose}>Cerrar</Button>
			        </Modal.Footer>
			      </Modal.Dialog>

		);
	},

});