import React from 'react';
import { connect } from 'react-redux'
import xhr from 'xhr'
import moment from 'moment'
import extractErrors from '../lib/extractErrors'

import ModalBlockDates from './ModalBlockDates';


var id = 'BLOCKEDDATES_EDITOR';


var Form = React.createClass({//React.createClass({

	componentWillMount() {

		this.id = id;
	},

	toggleModal () {

		if(this.props.show) return this.props.dispatch({type: 'FORM_'+this.id+'_HIDE'});

		return this.props.dispatch({type: 'FORM_'+this.id+'_SHOW'});
	},

	update (data) {
		
		this.props.dispatch({type: 'FORM_'+this.id+'_UPDATE', data: data});
	},

	remove (e) {

		//console.log('aaa')
		
		e.preventDefault();

		this.props.dispatch({type: 'FORM_'+this.id+'_REMOVE_LOADING_START'});
		
		var id = this.props.editingItem.id;

	    xhr({

	      url: Keystone.adminPath + '/api/blocked-dates/'+id+'/delete',
	      responseType: 'json',
	      method: 'post',
	      json:true,

	    }, (err, resp, data) => {

			this.props.dispatch({type: 'FORM_'+this.id+'_REMOVE_LOADING_END'});

			var errors = extractErrors(err, resp, data);
			if(errors) return dispatch({type: 'FORM_'+this.id+'_ERRORS', data: errors});


			this.props.dispatch({type: 'BLOCKEDDATES_REMOVE', id: id});
			this.props.dispatch({type: 'FORM_'+this.id+'_HIDE'});

	    });
	},

	save () {

		var dispatch = this.props.dispatch;
		var data = Object.assign({},this.props.data);
	    var id = this.props.editingItem.id;


	    data.dateFrom = moment(data.dateFrom, 'DD/MM/YYYY').format('YYYY-MM-DD');
	    data.dateTo = moment(data.dateTo, 'DD/MM/YYYY').format('YYYY-MM-DD');
/*
	    data.unit = this.state.blockDatesSelected.id;
	    data.hotel = this.state.blockDatesSelected.fields.hotel;
	    data.room = this.state.blockDatesSelected.fields.room;
*/
	    //debugger;


	    dispatch({type: 'FORM_'+this.id+'_LOADING_START'});

	    xhr({

	      url: Keystone.adminPath + '/api/blocked-dates/'+id,//+'/update',
	      responseType: 'json',
	      method: 'post',
	      json:true,
	      body: data
	      //body: formData
	  
	    }, (err, resp, data) => {

	    	dispatch({type: 'FORM_'+this.id+'_LOADING_END'});

			var errors = extractErrors(err, resp, data);
			if(errors) return dispatch({type: 'FORM_'+this.id+'_ERRORS', data: errors});

			
			dispatch({type: 'BLOCKEDDATES_UPDATE', data: data});
			dispatch({type: 'FORM_'+this.id+'_HIDE'});

	    });
	},

	render () {

		var props = this.props;


		return (

			<ModalBlockDates isOpen={props.show} 
								errors={props.errors}
								data={props.data} 
								loading={props.loading}
								removeLoading={props.removeLoading}
								onUpdate={this.update} 
								onSave={this.save} 
								onClose={this.toggleModal} 
								onRemove={this.remove}/>

		);
	},

});


const mapStateToProps = (state, ownProps) => {

  return state.forms[id]
}

export default connect(mapStateToProps)(Form)