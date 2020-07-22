var async = require('async');
var FieldType = require('../Type');
var util = require('util');
var utils = require('keystone-utils');
var I18nText = require('../i18nText/I18nTextType');

//var isReserved = require('../../../lib/list/isReserved');

/**
 * List FieldType Constructor
 * @extends Field
 * @api public
 */
function table (keystoneList, path, options) {
	//this._underscoreMethods = ['format'];
	var mongoose = this.keystone.mongoose;
	this.options = options;

	//this._nativeType = String;
	var baseSchema = { type: mongoose.Schema.Types.Mixed }

	this._nativeType = baseSchema
	table.super_.call(this, keystoneList, path, options);
}
table.properName = 'Table';
util.inherits(table, FieldType);


//table.prototype.addToSchema = I18nText.prototype.addToSchema;

/*table.prototype.validateInput = function (data, callback) {

	utils.defer(callback, true);
};

table.prototype.validateRequiredInput = function (item, data, callback) {

	utils.defer(callback, true);
};*/




/* Export Field Type */
module.exports = table;
