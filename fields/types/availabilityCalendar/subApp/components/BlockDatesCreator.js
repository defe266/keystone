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



import ModalBlockDates from './ModalBlockDates';

var id = 'BLOCKEDDATES_CREATOR';


var Form = React.createClass({//React.createClass({

	componentWillMount() {

		this.id = id;
	},

	componentWillUpdate(nextProps){

		const props = this.props;


		//# al abrir, selecionamos la primera unidad
		if(!props.show && nextProps.show){

			this.props.dispatch({type: 'FORM_'+this.id+'_UPDATE', data : { 
				unit : props.units.collection[0].id
			}});	
		}
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
		var data = Object.assign({},this.props.data);
		var unit = _.find(this.props.units.collection, (i) => i.id == data.unit);

	    data.dateFrom = moment(data.dateFrom, 'DD/MM/YYYY').format('YYYY-MM-DD');
	    data.dateTo = moment(data.dateTo, 'DD/MM/YYYY').format('YYYY-MM-DD');

	    data.hotel = unit.fields.hotel;
	    data.room = unit.fields.room;

	    dispatch({type: 'FORM_'+this.id+'_LOADING_START'});

	    xhr({

	      url: Keystone.adminPath + '/api/blocked-dates/create',
	      responseType: 'json',
	      method: 'post',
	      json:true,
	      body: data

	    }, (err, resp, data) => {

	    	dispatch({type: 'FORM_'+this.id+'_LOADING_END'});

	    	var errors = extractErrors(err, resp, data);
	    	if(errors) return dispatch({type: 'FORM_'+this.id+'_ERRORS', data: errors});			

			dispatch({type: 'BLOCKEDDATES_CREATE', data: data});
			dispatch({type: 'FORM_'+this.id+'_HIDE'});
			

	    });
	},

	render () {

		var props = this.props;
		

		/*const BUTTON_SIZES = ['large', 'medium', 'small', 'xsmall'];
		const BUTTON_VARIANTS = ['fill', 'hollow', 'link'];
		const BUTTON_COLORS = ['default', 'primary', 'success', 'warning', 'danger', 'cancel', 'delete'];
		*/

		return (


			<ModalBlockDates isOpen={props.show} 
								errors={props.errors}
								data={props.data} 
								units={props.units}
								loading={props.loading}
								onUpdate={this.update} 
								onSave={this.save} 
								onClose={this.toggleModal}/>

		);
	},

});


const mapStateToProps = (state, ownProps) => {

	//var newState = state.forms.BLOCKEDDATES_CREATOR;
	//newState.units = state.units;


  return Object.assign({},state.forms[id], {

  	units: state.units

  });

}

export default connect(mapStateToProps)(Form)