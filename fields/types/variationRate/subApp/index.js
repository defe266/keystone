import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import App from './components'

module.exports = React.createClass({

  componentWillMount(){

    var prevState = {

      path: this.props.path,
      parent: this.props.parent,
      rates: this.props.rates
     
    }

  	this.store = createStore(reducer, prevState, applyMiddleware(thunk));
  },

  componentWillReceiveProps(nextProps){

    //# maintain in sync with form parent data changes
    this.store.dispatch({type:'PARENT_CHANGE', data: nextProps.parent});
  }, 

  render() {
    return (
      <Provider store={this.store}>
        <App/>
      </Provider>
    )
  }
});