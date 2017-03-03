var FieldType = require('../Type');
var util = require('util');
var utils = require('keystone-utils');
var _ = require('lodash');
var moment = require('moment');

/**
 * Text FieldType Constructor
 * @extends Field
 * @api public
 */
function dailyRate (list, path, options) {
	this.options = options;
	this._nativeType = [{
		//_id: 'xx',
		dateFrom: Date,
		dateTo: Date,
		days: Number,
		variation: String,
		price: Number
	}];
	this._properties = ['variations','minDays','maxDays'];
	//this._underscoreMethods = ['crop'];
	
	dailyRate.super_.call(this, list, path, options);

}
dailyRate.properName = 'DailyRate';
util.inherits(dailyRate, FieldType);

/**
 * Get client-side properties to pass to react field.
 */
 /*
dailyRate.prototype.getProperties = function () {
	console.log("thisx",this)
	debugger;
	//var refList = this.refList;
	return {
		a: JSON.stringify(this)
	};
};*/


dailyRate.prototype.validateInput = function (data, callback) {

	var valid = true;
	var value = this.getValueFromData(data);

	//console.log("data 2 >>>> ",value);

	if(value){

		valid = _.reduce(value, (memo, i) => {

			var item = JSON.parse(i);

			var test_dateFrom = item.dateFrom != '' && moment(item.dateFrom, 'YYYY-MM-DD', true).isValid()
			var test_dateTo = item.dateTo != '' && moment(item.dateTo, 'YYYY-MM-DD', true).isValid()
			var test_days = !isNaN(item.days)
			var test_price = !isNaN(item.price)

			//console.log(item.price != '', !isNaN(item.price), item.price)


			return memo && test_dateFrom && test_dateTo && test_days && test_price;

		}, true)
	}
	
	utils.defer(callback, valid);
};

dailyRate.prototype.validateRequiredInput = function (item, data, callback) {

	utils.defer(callback, value && value.length > 0);
};


/**
 * Updates the value for this field in the item from a data object
 */
dailyRate.prototype.updateItem = function (item, data, callback) {

	//console.log("data >>>> ",data);

	var value = this.getValueFromData(data);

	//console.log("data 2 >>>> ",value);

	if(value){

		var rates = value.map((i) => JSON.parse(i));
		item.set(this.path, rates);

	}else{

		item.set(this.path, []);
	}

	


	

	//console.log("rates >>>> ",this.path, rates);

	//item.set(this.path, rates);

	/*
	var value = this.getValueFromData(data);

	if (Array.isArray(value)) {
		// Only save valid dates
		value = value.filter(function (date) {
			return moment(date).isValid();
		});
	}
	if (value === null || value === undefined) {
		value = [];
	}
	if (typeof value === 'string') {
		if (moment(value).isValid()) {
			value = [value];
		}
	}
	if (Array.isArray(value)) {
		item.set(this.path, value);
	}*/

	process.nextTick(callback);
};

/**
 * Add filters to a query
 */
 /*
dailyRate.prototype.addFilterToQuery = function (filter) {
	var query = {};
	if (filter.mode === 'exactly' && !filter.value) {
		query[this.path] = filter.inverted ? { $nin: ['', null] } : { $in: ['', null] };
		return query;
	}
	var value = utils.escapeRegExp(filter.value);
	if (filter.mode === 'beginsWith') {
		value = '^' + value;
	} else if (filter.mode === 'endsWith') {
		value = value + '$';
	} else if (filter.mode === 'exactly') {
		value = '^' + value + '$';
	}
	value = new RegExp(value, filter.caseSensitive ? '' : 'i');
	query[this.path] = filter.inverted ? { $not: value } : value;
	return query;
};
*/
/* Export Field Type */
module.exports = dailyRate;