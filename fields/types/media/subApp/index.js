import App from './components'

module.exports = App

/*import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import App from './components'
import ratesToseasons from './lib/ratesToseasons'

module.exports = React.createClass({

  componentWillMount(){


    this.store = createStore(reducer, applyMiddleware(thunk));
  },

  componentWillReceiveProps(nextProps){

    //console.log('.this.props.parent',this.props.parent)
    //# maintain in sync with form parent data changes
    //this.store.dispatch({type:'PARENT_CHANGE', data: nextProps.parent});
  }, 

  render() {
    return (
      <Provider store={this.store}>
        <App/>
      </Provider>
    )
  }
});*/