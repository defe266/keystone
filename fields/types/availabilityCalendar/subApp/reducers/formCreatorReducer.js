import moment from 'moment'

export default (id) => {


  var defaultState = {

    id: id,
    data : {
      unit:'',
      name:'',
      dateFrom: '',
      dateTo: ''
    },
    show : false,
    loading: false,
    removeLoading: false,
    errors: [],
    editingItem: null
  }

  return (state = defaultState, action) => {

    switch (action.type) {

      case 'FORM_'+id+'_UPDATE':

        return Object.assign({}, state, {

          data: Object.assign({}, state.data, action.data),

        });

      case 'FORM_'+id+'_SELECT':

        return Object.assign({}, state, {

          errors: defaultState.errors,
          show: true,
          editingItem: action.data,
          data: Object.assign({}, state.data, {

            name: action.data.fields.name,
            dateFrom: moment(action.data.fields.dateFrom).format('DD/MM/YYYY'),
            dateTo: moment(action.data.fields.dateTo).format('DD/MM/YYYY'),
            unit: action.data.fields.unit,
            hotel: action.data.fields.hotel,
            room: action.data.fields.room,
          })

        });

      case 'FORM_'+id+'_RESET':

        if(state.editingItem){

          return Object.assign({}, state, {

            errors: defaultState.errors,
            data: {

              name: state.editingItem.fields.name,
              dateFrom: moment(state.editingItem.fields.dateFrom).format('DD/MM/YYYY'),
              dateTo: moment(state.editingItem.fields.dateTo).format('DD/MM/YYYY'),
              unit: state.editingItem.fields.unit,
              hotel: state.editingItem.fields.hotel,
              room: state.editingItem.fields.room,
            }

          });

        }else{

          return Object.assign({}, state, {

            errors: defaultState.errors,
            data: defaultState.data

          });
        }

      case 'FORM_'+id+'_SHOW':

        return Object.assign({}, state, {
          show: true
        });

      case 'FORM_'+id+'_HIDE':

        return Object.assign({}, state, {
          show: false
        });

      case 'FORM_'+id+'_LOADING_START':

        return Object.assign({}, state, {
          loading: true
        });

      case 'FORM_'+id+'_LOADING_END':

        return Object.assign({}, state, {
          loading: false
        });

      case 'FORM_'+id+'_REMOVE_LOADING_START':

        return Object.assign({}, state, {
          removeLoading: true
        });

      case 'FORM_'+id+'_REMOVE_LOADING_END':

        return Object.assign({}, state, {
          removeLoading: false
        });

      case 'FORM_'+id+'_ERRORS':

        return Object.assign({}, state, {
          errors: action.data
        });

      default:

        return state

    }
  }
}