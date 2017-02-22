import React from 'react';
import { css } from 'glamor'

//import Field from '../Field';
//import { css } from 'glamor';
//import moment from 'moment'

//import { FormInput } from '../../../admin/client/App/elemental';
//import tinymce from 'tinymce';
//import { FormInput } from '../../../admin/client/App/elemental';
//import evalDependsOn from '../../utils/evalDependsOn';

import {
  Alert,
  Modal,
  Button,
  FormInput,
  FormSelect,
  LoadingButton
} from '../../../../../admin/client/App/elemental';

import DateInput from '../../../../components/DateInput';


module.exports = React.createClass({//React.createClass({


	update (data) {

		this.props.onUpdate(data);
	},

	save (e) {

		e.preventDefault();
		this.props.onSave();
	},

	render () {

		var props = this.props;
		var data = props.data;
		var units = props.units;

		if(units){

			var units_options = []//{value: '', label:'Sin definir'}

			units_options = units_options.concat(units.collection.map((i) => { return {value: i.id, label:i.name}}))	
		}


		var css_base = css({
	        position: 'absolute',
	    })

		/*const BUTTON_SIZES = ['large', 'medium', 'small', 'xsmall'];
		const BUTTON_VARIANTS = ['fill', 'hollow', 'link'];
		const BUTTON_COLORS = ['default', 'primary', 'success', 'warning', 'danger', 'cancel', 'delete'];
		*/

		//firstOption="Select" 

		return (


				<Modal.Dialog  isOpen={props.isOpen} width='300' onClose={props.onClose} backdropClosesModal enableKeyboardInput>{/*enableKeyboardInput*/}
			        <Modal.Header text="Bloquear fechas" showCloseButton/>
			        <Modal.Body>

			        	{props.errors && props.errors.length > 0 ? 

			        		<Alert color="danger">
			        			{props.errors.map((error) => {

			        				return <div>{error}</div>
			        			})}
			        		</Alert>

			        	:null}

			        	{units && units.collection.length > 1 ? 

			        		<div>
			        			<label>Alojamiento</label>
					        	<FormSelect value={data.unit} options={units_options} autoComplete="off" onChange={(e) => this.update({unit : e.target.value})}/>
					        	<br/>

			        		</div>

			        	:null}

			        	
			        
			          
			          	<label>Nombre</label>
			        	<FormInput placeholder="Ej.: Mantenimiento" autoComplete="off" value={data.name} onChange={(e) => this.update({name : e.target.value})}/>
			        	<br/>

			        	<label>Desde</label>
			        	<DateInput value={data.dateFrom} format="DD/MM/YYYY" onChange={(data) => {   console.log(data); this.update({dateFrom : data.value})  }}/>
			        	<br/>

						<label>Hasta</label>
			        	<DateInput value={data.dateTo} format="DD/MM/YYYY" onChange={(data) => this.update({dateTo : data.value})}/>
			        	<br/>

			        </Modal.Body>
			        <Modal.Footer>
			          <LoadingButton color="primary" loading={props.loading} disabled={props.loading} onClick={this.save}>Guardar</LoadingButton> &nbsp; &nbsp;

			          {props.onRemove ?

			          	<span><LoadingButton color="danger" loading={props.removeLoading} disabled={props.removeLoading} onClick={props.onRemove}>Eliminar</LoadingButton>&nbsp;  &nbsp;</span>

			          :null}
			          
			          <Button color="default" variant="link" onClick={props.onClose}>Cerrar</Button>
			        </Modal.Footer>
			      </Modal.Dialog>

		);
	},

});