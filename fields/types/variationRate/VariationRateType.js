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
function variationRate (list, path, options) {
	this.options = options;
	this._nativeType = [{
		
		variation: String,
		price: Number
	}];
	this._properties = ['variations'];
	//this._underscoreMethods = ['crop'];
	
	variationRate.super_.call(this, list, path, options);

}
variationRate.properName = 'VariationRate';
util.inherits(variationRate, FieldType);

/**
 * Get client-side properties to pass to react field.
 */
 /*
variationRate.prototype.getProperties = function () {
	console.log("thisx",this)
	debugger;
	//var refList = this.refList;
	return {
		a: JSON.stringify(this)
	};
};*/


variationRate.prototype.validateInput = function (data, callback) {

	var valid = true;
	var value = this.getValueFromData(data);

	//console.log("data 2 >>>> ",value);

	if(value){

		valid = _.reduce(value, (memo, i) => {

			var item = JSON.parse(i);

			var test_price = !isNaN(item.price)


			return memo && test_price;

		}, true)
	}
	
	utils.defer(callback, valid);
};

variationRate.prototype.validateRequiredInput = function (item, data, callback) {

	utils.defer(callback, value && value.length > 0);
};


/**
 * Updates the value for this field in the item from a data object
 */
variationRate.prototype.updateItem = function (item, data, callback) {

	//console.log("data >>>> ",data);

	var value = this.getValueFromData(data);

	//console.log("data 2 >>>> ",value);

	if(value){

		var rates = value.map((i) => JSON.parse(i));
		item.set(this.path, rates);

	}else{

		item.set(this.path, []);
	}

	process.nextTick(callback);
};

/**
 * Add filters to a query
 */
 /*
variationRate.prototype.addFilterToQuery = function (filter) {
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
module.exports = variationRate;