import React, { Component, PropTypes } from 'react'
import { css } from 'glamor'
//import moment from 'moment'
//import HotelList from './HotelList';

import Month from './Month'
import Event from './Event'


//moment.locale('es')


var Accomodation = React.createClass({

  render: function () {

    const props = this.props;

    /*
      _id : this.state._id,
      name : '',
      bookings: this.state.bookings,
      blockedDates:  this.state.blockedDates,
    */

    var css_base = css({ 
      position: 'relative',
      overflow: 'hidden'
    })



    return (

      <div className={css_base}>

        <Month cursor={props.cursor}/>

        {props.blockedDates.map((item) => {

          return <Event key={item.id} cursor={props.cursor} {...item} onClick={() => props.onLoadBlockedDates(item)}/>

        })}

      </div>
    )
  }

});

export default Accomodation