var mongoose = require('mongoose');
var _ = require('lodash');
var moment = require('moment');


export default function(rates){

	var seasons = [];

	var ratesGrouped = _.groupBy(rates, (i) => {

		return i.dateFrom + i.dateTo
	})

	_.forEach(ratesGrouped, (item) => {

		seasons.push({
	      _id: mongoose.Types.ObjectId().toString(),
	      dateFrom: moment(item[0].dateFrom).format('DD/MM/YYYY'),
	      dateTo: moment(item[0].dateTo).format('DD/MM/YYYY'),
	      rates: item
	    })
	})


	return seasons
}