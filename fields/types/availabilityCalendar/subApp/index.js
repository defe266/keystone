import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import App from './components'

module.exports = React.createClass({

  componentWillMount(){

  	this.store = createStore(reducer, applyMiddleware(thunk));
  },

  render() {
    return (
      <Provider store={this.store}>
        <App {...this.props}/>
      </Provider>
    )
  }
});