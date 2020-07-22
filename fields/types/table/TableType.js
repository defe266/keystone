var async = require('async');
var FieldType = require('../Type');
var util = require('util');
var utils = require('keystone-utils');
var I18nText = require('../i18nText/I18nTextType');
var keystone = require('../../../');

//var isReserved = require('../../../lib/list/isReserved');

/**
 * List FieldType Constructor
 * @extends Field
 * @api public
 */
function table (keystoneList, path, options) {
	//this._underscoreMethods = ['format'];
	
	this.options = options;

	//this._nativeType = String;
	//var baseSchema = { type: keystone.mongoose.Schema.Types.Mixed }
	var baseSchema = []
	this._nativeType = baseSchema
	table.super_.call(this, keystoneList, path, options);
}
table.properName = 'Table';
util.inherits(table, FieldType);


//table.prototype.addToSchema = I18nText.prototype.addToSchema;

table.prototype.validateInput = function (data, callback) {

	utils.defer(callback, true);
};

table.prototype.validateRequiredInput = function (item, data, callback) {

	utils.defer(callback, true);
};



/**
 * Updates the value for this field in the item from a data object
 */
table.prototype.updateItem = function (item, data, callback) {

	var value = this.getValueFromData(data);
	console.log(value)
	if(value){

		item.set(this.path, value);

	}else{

		item.set(this.path, null);
		
	}

	process.nextTick(callback);
};




/* Export Field Type */
module.exports = table;
