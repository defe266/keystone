import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import { css } from 'glamor'


var Event = React.createClass({

  render: function () {

    const props = this.props;

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
        top: '4px',
        width: event_duration*100/total +'%',
        height: '17px',
        background: '#0076D1',
        color: '#fff',
        'border-radius': '2px',
        'padding': '1px 5px',
        'font-size': '11px',
    })


    return (

      <div className={css_base} onClick={props.onClick}>

        {props.name}

      </div>
    )
  }

});

export default Event