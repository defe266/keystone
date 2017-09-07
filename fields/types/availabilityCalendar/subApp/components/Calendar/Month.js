import React, { Component, PropTypes } from 'react'
//import moment from 'moment'
import moment from 'moment-timezone';


import Day from './Day'


moment.locale('es')


var Month = React.createClass({
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

  render: function () {

    const props = this.props;
    //var now = this.props.now;
    var cursor = this.props.cursor;
    //var events = this.props.events;

    var dateStart = moment(cursor).startOf('month');
    var dateEnd = moment(cursor).endOf('month');
    var dateCursor = moment(dateStart);

    var total = dateEnd.diff(dateStart,'days') + 1;

    var DAYS = [];

    while(dateCursor <= dateEnd){
      
      DAYS.push(<Day key={dateCursor.format('x')} date={moment(dateCursor)} total={total}/>)
      // EventContent={props.EventContent} events={events} today={now.format('YYYY-MM-DD') == dateCursor.format('YYYY-MM-DD')} onClickEvent={props.onClickEvent} onClickDay={props.onClickDay}

      dateCursor.add(1,'days');

    }

    

    return (

      <div>

        {DAYS}

        <div style={{clear: 'both'}}/>

      </div>
    )
  }

});

export default Month