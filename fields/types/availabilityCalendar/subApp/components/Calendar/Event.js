import React, { Component, PropTypes } from 'react'
//import moment from 'moment'
import moment from 'moment-timezone';
import { css } from 'glamor'


var Event = React.createClass({

   componentWillMount () {

    if(this.props.timezone){

      moment.tz.setDefault(this.props.timezone);
    }

  },

  render: function () {

    const props = this.props;

    var color = props.color;
    var cursor = props.cursor;
    var dateStart = moment(cursor).startOf('month');
    var dateEnd = moment(cursor).endOf('month');
    var dateCursor = moment(dateStart);

    var dateFrom = moment(props.fields.dateFrom);
    var dateTo = moment(props.fields.dateTo);

    var total = dateEnd.diff(dateStart,'days') + 1;
    var event_left = dateFrom.diff(dateStart,'days');
    var event_duration = dateTo.diff(dateFrom,'days');



    var css_base = css({
        position: 'absolute',
        left: (event_left + 0.5)*100/total +'%', //# aumento medio día para ajustar entradas y salidas
        top: '2px',
        width: event_duration*100/total +'%',
        height: '17px',
        color: '#fff',
        padding: '1px',
        cursor: 'pointer'
        
    })

    var css_inside = css({
        background: color,
        'padding': '1px 5px',
        'border-radius': '2px',
        'font-size': '11px',
    })


    return (

      <div className={css_base} onClick={props.onClick}>

        <div className={css_inside}>

            {props.name}

        </div>

      </div>
    )
  }

});

export default Event