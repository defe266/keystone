import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor';
import moment from 'moment'
import xhr from 'xhr';
import async from 'async';

import loadItemsBetweenDates from '../actions/loadItemsBetweenDates'


import {
  Button,
  Glyph,
  Alert,
  Center,
  Spinner
} from '../../../../../admin/client/App/elemental';

//import DateInput from '../../../../components/DateInput';

import Calendar from './Calendar';
import BlockDatesCreator from './BlockDatesCreator';
import BlockDatesEditor from './BlockDatesEditor';

//import ModalBlockDates from './ModalBlockDates';


var App = React.createClass({
 
  componentDidMount () {

    var dispatch = this.props.dispatch;
    var model = this.props.model;

    //# get item _id from url. It would be better to get it through props, but i can`t find a way...
    var urlParts = window.location.pathname.split('/');

    var _id = urlParts[urlParts.length -1 ];


    //# if room, load related units
    if(model == 'Room'){

      var filters = {

        "room":{"value":_id},
      }

      var query = '?filters='+ JSON.stringify(filters)
      
      dispatch({type : 'LOADING_START'});
      dispatch({type : 'UNITS_FETCH_REQUEST'});
      
      //# load units data
      xhr({
        url: Keystone.adminPath + '/api/units'+query,
        responseType: 'json',

      }, (err, resp, data) => {

        if (err || !data) return dispatch({type : 'UNITS_FETCH_ERROR'});

        dispatch({type : 'UNITS_FETCH_SUCCESS', data: data.results});
        dispatch({type : 'LOADING_END'});
      });

    }

    //# if unit, load only de singular unit
    if(model == 'Unit'){
      

      dispatch({type : 'LOADING_START'});
      dispatch({type : 'UNITS_FETCH_REQUEST'});
      
      //# load unit data
      xhr({
        url: Keystone.adminPath + '/api/units/'+_id,
        responseType: 'json',

      }, (err, resp, data) => {

        if (err || !data) return dispatch({type : 'UNITS_FETCH_ERROR'});

        dispatch({type : 'UNITS_FETCH_SUCCESS', data: [data]});
        dispatch({type : 'LOADING_END'});
      });
    }
    

    
    
  },

  

  //#creator
  showBlockDatesCreator (e){

    if(e) e.preventDefault();

    this.props.dispatch({type: 'FORM_BLOCKEDDATES_CREATOR_RESET'});
    this.props.dispatch({type: 'FORM_BLOCKEDDATES_CREATOR_SHOW'});
  },

  prev: function(e){

    e.preventDefault();

    var newCursor = moment(this.props.cursor).subtract(1, 'month')

    this.props.dispatch({type : 'CURSOR_CHANGE', cursor: newCursor});

    this.props.dispatch(loadItemsBetweenDates());

    //console.log(newCursor.format('DD/MM'))

    //this.loadItemsBetweenDates(newCursor);
  },

  next: function(e){

    e.preventDefault();

    var newCursor = moment(this.props.cursor).add(1, 'month')

    this.props.dispatch({type : 'CURSOR_CHANGE', cursor: newCursor});

    this.props.dispatch(loadItemsBetweenDates());

    //console.log(newCursor.format('DD/MM'))

    //this.loadItemsBetweenDates(newCursor);
  },

  render() {

    const props = this.props;

    var cursor = props.app.cursor;

    if(props.app.error) return <Alert color="danger"><strong>Se ha producido un error</strong></Alert>
    if(props.app.loading) return <Center height={60}><Spinner size="sm"/></Center>

    var css_header = css({

      padding: '10px 0'

    });    

    var css_header_left = css({

      float: 'left',
      width:'200px'
    });

    var css_header_right = css({
      float: 'left',
      textAlign: 'right',
      width:'calc(100% - 200px)'
    });
    

    return (
      <div>

        <div className={css_header}>
          <div className={css_header_left}>        
            <Button color="default" variant="link" size="small" onClick={this.prev}><Glyph name="arrow-left" color="default"/></Button> &nbsp;&nbsp; 

            {cursor.format('MMMM YYYY')} &nbsp;&nbsp;

            <Button color="default" variant="link" size="small" onClick={this.next}><Glyph name="arrow-right" color="default"/></Button>
          </div>

          <div className={css_header_right}>
            {props.units.collection.length > 0 ?

              <Button color="primary" size="small" onClick={this.showBlockDatesCreator}>Bloquear fechas</Button>

            :null}
            
          </div>

          <div style={{clear:'both'}}/>
        </div>
      
        <Calendar/>

        <BlockDatesCreator/>
        <BlockDatesEditor/>
{/*
        

        <ModalBlockDates isOpen={state.modalBlockDates} data={state.formBlockDates} update={this.updateFormBlockDates} save={this.saveFormBlockDates} onClose={this.toggleModalBlockDates}/>

        {state.formBlockDatesEdit && state.blockDatesSelected ? 

          <ModalBlockDates isOpen={state.modalBlockDatesEdit} data={state.formBlockDatesEdit} update={this.updateFormBlockDatesEdit} save={this.saveFormBlockDatesEdit} onClose={this.toggleModalBlockDatesEdit} onRemove={this.removeFormBlockDates}/>

        :null}

      */}
        
      </div>

    )
  }
});



const mapStateToProps = (state, ownProps) => {

  return {
    app: state.app,
    units: state.units
  }
}

export default connect(mapStateToProps)(App)

/*

  , {

  //dispatch: (action) => action,
  loadHotels : hotels_get

}
*/


//module.exports = App;