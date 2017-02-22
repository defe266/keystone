import moment from 'moment';
import xhr from 'xhr';



export default function (){ //cursor


  return (dispatch, getState) => {

    var state = getState();

    var cursor = state.app.cursor;
    var units = state.units.collection;

    //var dispatch = this.props.dispatch;

    //var cursor = this.props.cursor;

    //console.log(cursor.format('DD/MM'))

    var dateStart = moment(cursor).startOf('month');//.subtract(1, 'month'); //# subtrac fix: rango de 3 meses para ver 1
    var dateEnd = moment(cursor).endOf('month');//.add(1, 'month');//# add fix: rango de 3 meses para ver 1


      var filters = {

      "unit":{"value": units.map((i) => i.id)},//"589b4cee7ea37948a916c6cf"

      "dateFrom":{mode: "before", value: dateEnd},

      "dateTo":{mode: "after", value: dateStart},

    }

    var query = '?filters='+ JSON.stringify(filters)//.replace(new RegExp('"', 'g'), '')//'{unit:589b4cee7ea37948a916c6cf}'//encodeURIComponent(JSON.stringify(filters));

    //#Load BlockedDates
    dispatch({type : 'BLOCKEDDATES_FETCH_REQUEST'});

    xhr({

      url: Keystone.adminPath + '/api/blocked-dates'+query,//post-categories
      responseType: 'json',

    }, (err, resp, data) => {

      if (err || !data) return dispatch({type : 'BLOCKEDDATES_FETCH_ERROR'});

      dispatch({type : 'BLOCKEDDATES_FETCH_SUCCESS', data: data.results});

    });

    //#Load bookings
    dispatch({type : 'BOOKINGS_FETCH_REQUEST'});

    xhr({

      url: Keystone.adminPath + '/api/bookings'+query,//post-categories
      responseType: 'json',

    }, (err, resp, data) => {

      if (err || !data) return dispatch({type : 'BOOKINGS_FETCH_ERROR'});

      dispatch({type : 'BOOKINGS_FETCH_SUCCESS', data: data.results});

    });

  }  
}