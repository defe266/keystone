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


import Season from './Season'

var Seasons = React.createClass({

  removeItem(id){

    this.props.dispatch({type:'SEASONS_DEL', id:id});
  },
  
  changeItem(data){

    this.props.dispatch({type:'SEASONS_PUT', data:data});
  },

  render() {

    const props = this.props;

    return (
      <div> 
        
        {props.seasons.map((item, index) => {

          return <Season key={item._id} 
                        index={index}
                        path={props.path}
                        item={item}
                        onChange={this.changeItem}
                        onRemove={this.removeItem}
                        variations={props.parent.variations}
                        minDays={props.parent.minDays}
                        maxDays={props.parent.maxDays}/>

        })}
        
      </div>

    )
  }
});



const mapStateToProps = (state, ownProps) => {

  return state

}

export default connect(mapStateToProps)(Seasons)



//module.exports = App;