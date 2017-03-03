import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor';


//import seasons_post from '../../actions/rates_put'

import {
  Button,
  //FormInput,
  //Grid,
  //Glyph,
  //Alert,
  //Center,
  //Spinner
} from '../../../../../../admin/client/App/elemental';


import Rate from './Rate'

var Rates = React.createClass({
  
  changeItem(data){

    this.props.dispatch({type:'RATES_PUT', data:data});
  },

  render() {

    const props = this.props;

    return (
      <div> 
        
        {props.rates.map((item) => {

          return <Rate key={item._id} item={item} onChange={(data) => this.changeItem( Object.assign({_id: item._id}, data) )}/>

        })}
        
      </div>

    )
  }
});



const mapStateToProps = (state, ownProps) => {

  return {
    rates: state.rates
  }

}

export default connect(mapStateToProps)(Rates)



//module.exports = App;