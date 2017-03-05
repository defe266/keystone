var mongoose = require('mongoose');





export default function (){ //cursor


  return (dispatch, getState) => {
    /*
    var state = getState();

    var minDays = state.parent.minDays;
    var maxDays = state.parent.maxDays;
    var variations = state.parent.variations.length > 0 ? state.parent.variations : ['default'];

    var rates = [];

    for(var i = minDays; i <= maxDays; i++){

      var ratesVariations = variations.map((item) => {

        return {
          _id: mongoose.Types.ObjectId().toString(),
          dateFrom: '',
          dateTo: '',
          days: i,
          variation: item,
          price: 0

        }

      })

      rates = rates.concat(ratesVariations);

    }*/

    var season = {
      _id: mongoose.Types.ObjectId().toString(),
      dateFrom: '',
      dateTo: '',
      rates: []//rates.map((i) => i._id)
    }


    //dispatch({type : 'RATES_BULK_POST', data: rates});
    dispatch({type : 'SEASONS_POST', data: season});

    /*
    dispatch({type : 'SEASONS_POST', data: {

      _id: 'xx',
      dateFrom: '',
      dateTo: '',
      days: 1,
      variation: 'default',
      price: ''//0

    }});*/

  }  
}