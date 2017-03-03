import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor';


import seasons_post from '../actions/seasons_post'

import {
  Button,
  //FormInput,
  //Grid,
  //Glyph,
  //Alert,
  //Center,
  //Spinner
} from '../../../../../admin/client/App/elemental';

//import Rates from './Rates'
import Seasons from './Seasons'

/*
import moment from 'moment'
import xhr from 'xhr';
import async from 'async';

import loadItemsBetweenDates from '../actions/loadItemsBetweenDates'


import {
  Button,
  Glyph,
  Alert,
  Center,
  Spinner
} from '../../../../../admin/client/App/elemental';

//import DateInput from '../../../../components/DateInput';

import Calendar from './Calendar';
import BlockDatesCreator from './BlockDatesCreator';
import BlockDatesEditor from './BlockDatesEditor';

//import ModalBlockDates from './ModalBlockDates';

*/
var App = React.createClass({
 
  componentDidMount () {
    
  },

  addSeason () {

    this.props.dispatch( seasons_post() );
  },
  

  render() {

    const props = this.props;


    /*
    var cursor = props.app.cursor;

    if(props.app.error) return <Alert color="danger"><strong>Se ha producido un error</strong></Alert>
    if(props.app.loading) return <Center height={60}><Spinner size="sm"/></Center>

    var css_header = css({

      padding: '10px 0'

    });    

    var css_header_left = css({

      float: 'left',
      width:'200px'
    });

    var css_header_right = css({
      float: 'left',
      textAlign: 'right',
      width:'calc(100% - 200px)'
    });
    */

//placeholder="Ej.: Mantenimiento" autoComplete="off" value={data.name} onChange={(e) => this.update({name : e.target.value})}

    return (
      <div> 
        
        <Button onClick={this.addSeason}>Añadir temporada</Button>

        <br/><br/>
        
        <Seasons/>
        {/*<Rates/>*/}

      {/*
        <Grid.Row gutter="16">
          <Grid.Col large="one-half">

            <label>Días mínimos</label>
            <FormInput />    
          </Grid.Col>
          <Grid.Col large="one-half">

            <label>Días máximos</label>
            <FormInput />

          </Grid.Col>
        </Grid.Row>
      */}
        
      </div>

    )
  }
});

/*

const mapStateToProps = (state, ownProps) => {

  return {
    rates: state.rates
  }

}
*/
export default connect()(App)



//module.exports = App;