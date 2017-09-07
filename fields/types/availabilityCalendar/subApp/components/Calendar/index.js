import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
//import moment from 'moment'
import moment from 'moment-timezone';
import xhr from 'xhr';
import async from 'async';
import _ from 'lodash';
//import HotelList from './HotelList';

import loadItemsBetweenDates from '../../actions/loadItemsBetweenDates'

import {
  Alert,
  Center,
  Spinner,
  Button
} from '../../../../../../admin/client/App/elemental';


//import { Alert, BlankState, Center, Spinner } from '../../../../elemental';

import DayHeader from './DayHeader'
import Accomodation from './Accomodation'



var Calendar = React.createClass({
  /*
  propTypes: {
    
    collection: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool.isRequired,
    error: React.PropTypes.bool.isRequired,
  },*/

  componentWillMount () {

    if(this.props.timezone){

      moment.tz.setDefault(this.props.timezone);
    }

  },

  componentDidMount () {

    //this.loadItemsBetweenDates(this.props.cursor);

    this.props.dispatch(loadItemsBetweenDates());
    
  },
  
  /*
  prev: function(e){

    e.preventDefault();

    var newCursor = moment(this.props.cursor).subtract(1, 'month')

    this.props.dispatch({type : 'CURSOR_CHANGE', cursor: newCursor});

    //console.log(newCursor.format('DD/MM'))

    this.loadItemsBetweenDates(newCursor);
  },

  next: function(e){

    e.preventDefault();

    var newCursor = moment(this.props.cursor).add(1, 'month')

    this.props.dispatch({type : 'CURSOR_CHANGE', cursor: newCursor});

    //console.log(newCursor.format('DD/MM'))

    this.loadItemsBetweenDates(newCursor);
  },*/

  selectBlockedDates: function(item){

    this.props.dispatch({type : 'FORM_BLOCKEDDATES_EDITOR_SELECT', data: item});
  },

  render: function () {

    const props = this.props;
    //var now = this.props.now;
    var cursor = this.props.cursor;
    var blockedDates = this.props.blockedDates;
    var bookings = this.props.bookings;
    //var events = this.props.events;
    //console.log(props);

    var dateStart = moment(cursor).startOf('month');
    var dateEnd = moment(cursor).endOf('month');
    var dateCursor = moment(dateStart);

    var HEADER_DAYS = [];

    var total = dateEnd.diff(dateStart,'days') + 1;

    while(dateCursor <= dateEnd){
      
      HEADER_DAYS.push(<DayHeader key={dateCursor.format('x')} date={moment(dateCursor)} total={total}/>)
      // EventContent={props.EventContent} events={events} today={now.format('YYYY-MM-DD') == dateCursor.format('YYYY-MM-DD')} onClickEvent={props.onClickEvent} onClickDay={props.onClickDay}

      dateCursor.add(1,'days');

    }

    if(props.units.error) var notReady = <Alert color="danger"><strong>Error al cargar alojamientos</strong></Alert>
    if(props.units.loading) var notReady = <Center height={60}><Spinner size="sm"/></Center>

//console.log('blockedDates',blockedDates)

//{ console.log(i.unit,item.id); return i.unit == item.id)}

    var showName = !props.hideName;//props.units.collection.length > 1;

    return (

      <div className="AvailabilityCalendar__Calendar">
        
        <div>
          {HEADER_DAYS}

          <div style={{clear: 'both'}}/>
        </div>


        {notReady ? notReady : 

          <div>
            {_.sortBy(props.units.collection, (i) => new Date(i.fields.createdAt).getTime()).map((item) => {

              return <Accomodation key={item.id} 
                                    cursor={cursor} item={item} 
                                    timezone={props.timezone}
                                    blockedDates={_.filter(blockedDates.collection, (i) => i.fields.unit == item.id)} 
                                    bookings={_.filter(bookings.collection, (i) => i.fields.unit == item.id)} 
                                    onSelectBlockedDates={this.selectBlockedDates} showName={showName}/>

            })}
          </div>
        }

        

      </div>
    )
  }

});



const mapStateToProps = (state, ownProps) => {

  return {
    cursor: state.app.cursor,
    units : state.units,
    blockedDates: state.blockedDates,
    bookings: state.bookings
  }
}

export default connect(mapStateToProps)(Calendar)