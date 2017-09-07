import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import App from './components'
import moment from 'moment-timezone';

module.exports = React.createClass({

  componentWillMount(){

  	this.store = createStore(reducer, applyMiddleware(thunk));


    if(this.props.timezone){

      moment.tz.setDefault(this.props.timezone);
    }
    
    //# init cursor
    this.store.dispatch({type : 'CURSOR_CHANGE', cursor: moment()});

  },

  render() {
    return (
      <Provider store={this.store}>
        <App {...this.props}/>
      </Provider>
    )
  }
});