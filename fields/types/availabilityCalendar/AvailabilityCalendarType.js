var FieldType = require('../Type');
var util = require('util');
var utils = require('keystone-utils');

/**
 * Text FieldType Constructor
 * @extends Field
 * @api public
 */
function availabilityCalendar (list, path, options) {
	this.options = options;
	this._nativeType = String;
	this._properties = ['model','hideName'];
	//this._underscoreMethods = ['crop'];
	
	availabilityCalendar.super_.call(this, list, path, options);

	this.model = this.list.key;
	this.hideName = options.hideName;
}
availabilityCalendar.properName = 'AvailabilityCalendar';
util.inherits(availabilityCalendar, FieldType);

/**
 * Get client-side properties to pass to react field.
 */
 /*
availabilityCalendar.prototype.getProperties = function () {
	console.log("thisx",this)
	debugger;
	//var refList = this.refList;
	return {
		a: JSON.stringify(this)
	};
};*/


availabilityCalendar.prototype.validateInput = function (data, callback) {
	
	utils.defer(callback, true);
};

availabilityCalendar.prototype.validateRequiredInput = function (item, data, callback) {

	utils.defer(callback, true);
};

/**
 * Add filters to a query
 */
 /*
availabilityCalendar.prototype.addFilterToQuery = function (filter) {
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
module.exports = availabilityCalendar;
