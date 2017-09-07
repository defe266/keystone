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

    var blockedDates = props.blockedDates;
    var bookings = props.bookings;
    var isDisabled = this.props.item.fields.state == 'disabled';

    //debugger

    /*
      _id : this.state._id,
      name : '',
      bookings: this.state.bookings,
      blockedDates:  this.state.blockedDates,
    */

    var css_container = css({ 
      position: 'relative',
    })

    var css_base = css({ 
      position: 'relative',
      overflow: 'hidden'
    })

    var css_label = css({ 
      position: 'absolute',
      display: 'block',
      left: '-100px',
      width: '92px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
      
    })

    var css_label_disabled = css({

      textDecoration: 'line-through',
      opacity: '0.5'

    })

    
    /*
    var css_container_disabled = css();

    if(this.props.item.fields.state == 'disabled'){

        var css_container_disabled = css({
          background: 'red',
        })
    }*/

    var css_container_disabled = css({
          background: 'rgba(0,0,0,0.3)',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: '0',
          left: '0',
          textAlign: 'center',
          color: '#fff',
          lineHeight: '25px',
          //zIndex: '10'
        })

//console.log(blockedDates)


    return (

      <div className={css_container}>

        {props.showName ? 

          <label className={css_label +' '+ (isDisabled ? css_label_disabled : '')}>
            <a title={props.item.id} href={"/keystone/units/"+props.item.id}>{props.item.name}</a>
          </label>

        : null}

        <div className={css_base}>

          <Month cursor={props.cursor} timezone={props.timezone}/>

          {isDisabled ? 

            <div className={css_container_disabled}>Deshabilitada</div>

          : null}

          {blockedDates.map((item) => {

            return <Event key={item.id} cursor={props.cursor} timezone={props.timezone} {...item} color="#0076D1" onClick={() => props.onSelectBlockedDates(item)}/>

          })}

          {bookings.map((item) => {

            return <Event key={item.id} cursor={props.cursor} timezone={props.timezone} {...item} color="#1ED45F"/>

          })}

        </div>

      </div>
    )
  }

});

export default Accomodation