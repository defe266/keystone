import React from 'react';
import { connect } from 'react-redux'
import xhr from 'xhr'
import _ from 'lodash'
//import Field from '../Field';
//import { css } from 'glamor';
import moment from 'moment'
import extractErrors from '../lib/extractErrors'

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


var id = 'UNITS_CREATOR';

function xhr_promise(data){

	return new Promise((resolve, reject) => {

		xhr({

	      url: Keystone.adminPath + '/api/units/create',
	      responseType: 'json',
	      method: 'post',
	      json:true,
	      body: data

	    }, (err, resp, data) => {

	    	var errors = extractErrors(err, resp, data);

	    	if(errors){

	    		reject(errors)

	    	}else{

	    		resolve(data)
	    	}
	    });
	})

	
}


var Form = React.createClass({//React.createClass({

	componentWillMount() {

		this.id = id;
	},

	componentWillUpdate(nextProps){
		/*
		const props = this.props;


		//# al abrir, selecionamos la primera unidad
		if(!props.show && nextProps.show){

			this.props.dispatch({type: 'FORM_'+this.id+'_UPDATE', data : { 
				unit : props.units.collection[0].id
			}});	
		}*/
	},

	toggleModal () {

		if(this.props.show) return this.props.dispatch({type: 'FORM_'+this.id+'_HIDE'});

		return this.props.dispatch({type: 'FORM_'+this.id+'_SHOW'});
	},

	update (data) {
		
		this.props.dispatch({type: 'FORM_'+this.id+'_UPDATE', data: data});
	},

	save (e) {

		var dispatch = this.props.dispatch;
	    var data = [];

	    for(var i = 0; i < this.props.data.number; i++){

	    	data.push({

	    		code : String(this.props.size + i),
	    		createdAt: new Date(),
	    		hotel : this.props.hotel,
	    		room : this.props.room,
	    	})
	    }


	    dispatch({type: 'FORM_'+this.id+'_LOADING_START'});


	    Promise.all(

	    	data.map((i) => xhr_promise(i))

	    ).then((results) => {

	    	dispatch({type: 'FORM_'+this.id+'_LOADING_END'});
			dispatch({type: 'UNITS_CREATE', data: results});
			dispatch({type: 'FORM_'+this.id+'_HIDE'});

	    }).catch((errors) => {

	    	dispatch({type: 'FORM_'+this.id+'_LOADING_END'});

	    	alert('Se ha producido un error')
	    	location.reload();


	    })
	    
	},

	render () {

		var props = this.props;
		
		var data = props.data;
		/*const BUTTON_SIZES = ['large', 'medium', 'small', 'xsmall'];
		const BUTTON_VARIANTS = ['fill', 'hollow', 'link'];
		const BUTTON_COLORS = ['default', 'primary', 'success', 'warning', 'danger', 'cancel', 'delete'];
		*/

		return (


			<Modal.Dialog  isOpen={props.show} width='300' onClose={this.toggleModal} backdropClosesModal enableKeyboardInput>{/*enableKeyboardInput*/}
		        <Modal.Header text="Añadir unidades" showCloseButton/>
		        <Modal.Body>

		        	{props.errors && props.errors.length > 0 ? 

		        		<Alert color="danger">
		        			{props.errors.map((error) => {

		        				return <div>{error}</div>
		        			})}
		        		</Alert>

		        	:null}

		        
		          
		          	<label>Cantidad de unidades a crear</label>
		        	<FormInput type="number" min="1" autoComplete="off" value={data.number} onChange={(e) => this.update({number : e.target.value})}/>
		        	<br/>


		        </Modal.Body>
		        <Modal.Footer>

		          <LoadingButton color="primary" loading={props.loading} disabled={props.loading} onClick={this.save}>Crear</LoadingButton> &nbsp; &nbsp;
		          
		          <Button color="default" variant="link" onClick={this.toggleModal}>Cerrar</Button>

		        </Modal.Footer>
		      </Modal.Dialog>

		);
	},

});


export default connect((state, ownProps) => {

  return state.forms[id]

})(Form)