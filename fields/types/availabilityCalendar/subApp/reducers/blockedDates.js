import _ from 'lodash'


var defaultState = {

  collection : [],
  error : false,
  loading : false
}

export default (state = defaultState, action) => {

  switch (action.type) {

    case 'BLOCKEDDATES_FETCH_REQUEST':

      return Object.assign({}, state, {
        loading: true,
      });

    case 'BLOCKEDDATES_FETCH_SUCCESS':

      return Object.assign({}, state, {
        collection: action.data,
        loading: false,
        error: false
      });

    case 'BLOCKEDDATES_FETCH_ERROR':

      return Object.assign({}, state, {
        loading: false,
        error: true
      });

    case 'BLOCKEDDATES_REMOVE':

      return Object.assign({}, state, {

        collection : _.filter(state.collection, (i) => {

          return i.id != action.id
        })

      });


    case 'BLOCKEDDATES_UPDATE':

      return Object.assign({}, state, {

        collection : state.collection.map((item) => {

          if(item.id == action.data.id) return action.data;

          return item
        })

      });

    case 'BLOCKEDDATES_CREATE':

      return Object.assign({}, state, {

        collection : [...state.collection, action.data]

      });

      

    default:

      return state

  }
}