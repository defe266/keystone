import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor';
import moment from 'moment';
import _ from 'lodash';


//import seasons_post from '../../actions/rates_put'

import {
  FormInput,
  
} from '../../../../../../admin/client/App/elemental';




var Field = React.createClass({
  
  getInitialState() {

    var props = this.props;

    //#Busco si ya había un valor para esta configuración

    var rate = _.find(this.props.rates, (i) => {

      return props.days == i.days && i.variation == props.variation
    })

    return {

      price : rate ? rate.price : 0
    }
  },

  changePrice(e){

    this.setState({
      price: e.target.value
    });

  },

  render() {

    const props = this.props;
    const state = this.state;

    var css_input = css({

      borderRadius: '0',
      borderColor: "transparent",
      height: "37px",
      ':focus':{
        borderColor: '#0591FF'
      }

    })

    return (

       <div>
          
          <input type="hidden" name={props.path+'[]'} value={JSON.stringify({

            dateFrom: moment(props.dateFrom,'DD/MM/YYYY').format('YYYY-MM-DD'),
            dateTo: moment(props.dateTo,'DD/MM/YYYY').format('YYYY-MM-DD'),
            days: props.days,
            variation:  props.variation,
            price: state.price,

          })}/>


          <FormInput {...css_input} value={state.price} onChange={this.changePrice}/>

        </div>

    )
  }
});

module.exports = Field;