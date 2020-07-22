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
function display (list, path, options) {

	//console.log('options.handler',options.handler)

	options.handler = options.handler ? options.handler.toString() : null//'testx'//options.handler ? JSON.stringify(options.handler) : null;

	//this.options = options;

	//handler
	this._properties = ['handler'];

	this._nativeType = String; //# dummy: dont save nothing, only display
	
	display.super_.call(this, list, path, options);

}

display.properName = 'Display';
util.inherits(display, FieldType);


display.prototype.validateInput = function (data, callback) {

	utils.defer(callback, true);
};

display.prototype.validateRequiredInput = function (item, data, callback) {

	utils.defer(callback, true);
};


/**
 * Updates the value for this field in the item from a data object
 */
display.prototype.updateItem = function (item, data, callback) {

	//item.set(this.path, null);

	//# dont save nothing, only display

	process.nextTick(callback);
};

/* Export Field Type */
module.exports = display;