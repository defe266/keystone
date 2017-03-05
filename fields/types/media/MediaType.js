var FieldType = require('../Type');
var keystone = require('../../../');
var util = require('util');
var utils = require('keystone-utils');

//var _ = require('lodash');

/**
 * Text FieldType Constructor
 * @extends Field
 * @api public
 */
function media (list, path, options) {

	options.model = options.ref;

	this.options = options;

	var baseSchema = { type: String, ref: options.ref }//keystone.mongoose.Schema.Types.ObjectId

	if(options.many){

		this._nativeType = [baseSchema];

	}else{

		this._nativeType = baseSchema;
	}

	this._properties = ['many','model'];
	//this._underscoreMethods = ['crop'];
	
	media.super_.call(this, list, path, options);

}
media.properName = 'Media';
util.inherits(media, FieldType);


/**
 * Get client-side properties to pass to react field.
 */
 /*
relationship.prototype.getProperties = function () {
	var refList = this.refList;
	return {
		refList: {
			singular: refList.singular,
			plural: refList.plural,
			path: refList.path,
			key: refList.key,
		},
	};
};*/

media.prototype.validateInput = function (data, callback) {

	utils.defer(callback, true);
};

media.prototype.validateRequiredInput = function (item, data, callback) {

	utils.defer(callback, true);
};


/**
 * Updates the value for this field in the item from a data object
 */
media.prototype.updateItem = function (item, data, callback) {

	//console.log("data >>>> ",data);

	var value = this.getValueFromData(data);

	//console.log("data 2 >>>> ",value);

	if(value){

		//value = value.map((i) => JSON.parse(i));
		item.set(this.path, value);

	}else{

		item.set(this.path, []);
	}

	

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
module.exports = media;