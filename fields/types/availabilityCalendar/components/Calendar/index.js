import React, { Component, PropTypes } from 'react'
import moment from 'moment'
//import HotelList from './HotelList';


import {
  Center,
  Spinner,
  Button
} from '../../../../../admin/client/App/elemental';


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

  prev: function(e){

    e.preventDefault();

    var newCursor = moment(this.props.cursor).subtract(1, 'month')

    this.props.onChange(newCursor)
  },

  next: function(e){

    e.preventDefault();

    var newCursor = moment(this.props.cursor).add(1, 'month')

    this.props.onChange(newCursor)
  },

  render: function () {

    const props = this.props;
    //var now = this.props.now;
    var cursor = this.props.cursor;
    //var events = this.props.events;

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


    return (

      <div className="AvailabilityCalendar__Calendar">

        <br/>
        <Button color="default" size="small" onClick={this.prev}>Anterior</Button> &nbsp;&nbsp; {cursor.format('MMMM')} &nbsp;&nbsp;
        <Button color="default" size="small" onClick={this.next}>Siguiente</Button>
        <br/><br/>
        
        <div>
          {HEADER_DAYS}

          <div style={{clear: 'both'}}/>
        </div>


        {props.loading ? <Center height={60}><Spinner size="md"/></Center> : 

          <div>
            {props.accomodations.map((item) => {

              return <Accomodation key={item.unit.id} cursor={cursor} {...item} onLoadBlockedDates={props.onLoadBlockedDates}/>

            })}
          </div>
        }

        

      </div>
    )
  }

});

export default Calendar