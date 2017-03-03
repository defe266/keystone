import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor';


//import seasons_post from '../../actions/rates_put'

import {
  //Button,
  FormInput,
  //Grid,
  //Glyph,
  //Alert,
  //Center,
  //Spinner
} from '../../../../../../admin/client/App/elemental';



var Rate = React.createClass({
  

  render() {

    const props = this.props;
    const item = props.item;


    return (
      <div> 
        {item.variation} {item.days}
        <FormInput value={item.price} onChange={ (e) => props.onChange({price:e.target.value})}/>
        
      </div>

    )
  }
});

module.exports = Rate;