import React, { Component, PropTypes } from 'react'
import { css } from 'glamor'

//import HotelList from './HotelList';

//import Day from './Day'






var Day = React.createClass({
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


    var css_base = css(
	    { 
		  float: 'left',
		  //width: '24px',
		  width: 100/props.total+'%',//Math.floor()
		  height: '25px',
		  borderRight: '1px solid #ddd',
		  borderBottom: '1px solid #ddd',
		  //border: '1px solid #ddd',
		  padding: '4px 0px',
		  //'margin-right': '-1px',

		  ':nth-child(odd)' : {

		  	background: '#EFEEEF',
		  },
		  ':first-child' : {

	        borderLeft: '1px solid #ddd',
	      }
		},
	)

	/*nthChild('2n', {
		    background: 'red'    
		})  */

    return (

      <div className={css_base}>

      </div>
    )
  }

});

export default Day