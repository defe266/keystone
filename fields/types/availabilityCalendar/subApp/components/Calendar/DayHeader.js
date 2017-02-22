import React, { Component, PropTypes } from 'react'
import { css } from 'glamor'

//import HotelList from './HotelList';

//import Day from './Day'






var DayHeader = React.createClass({
  /*
  propTypes: {
    
    collection: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool.isRequired,
    error: React.PropTypes.bool.isRequired,
  },*/

  render: function () {

    const props = this.props;
    //var now = this.props.now;
    var date = props.date;


    var css_base = css({ 

  	  float: 'left',
  	  width: 100/props.total+'%',
      borderTop: '1px solid #ddd',
      borderRight: '1px solid #ddd',
  	  borderBottom: '1px solid #ddd',
  	  //border: '1px solid #ddd',
  	  fontSize: '10px',
  	  lineHeight: '11px',
  	  textAlign: 'center',
  	  padding: '4px 0px',
  	  //marginRight: '-1px',
      //marginBottom: '-1px'
      ':first-child' : {

        borderLeft: '1px solid #ddd',
      }
  	})

  	var css_labelMain = css({
  		fontWeight: 'bold',
  		fontSize: '1 2px'
  	});

    return (

      <div className={css_base}>
        
        <div>
        	<div>{date.format('ddd')}</div>
        	<div className={css_labelMain}>{date.format('DD')}</div>
        	{/*<div>{date.format('MMM')}</div>*/}
        </div>

      </div>
    )
  }

});

export default DayHeader