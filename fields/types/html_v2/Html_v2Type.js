var FieldType = require('../Type');
var TextType = require('../text/TextType');
var util = require('util');


/**
 * HTML FieldType Constructor
 * @extends Field
 * @api public
 */
function html_v2 (list, path, options) {
	//this._nativeType = String;
	//this._defaultSize = 'full';
	//this.wysiwyg = options.wysiwyg || false;
	//this.height = options.height || 180;
	//this._properties = ['wysiwyg', 'height'];

	this._nativeType = String;
	this.options = options;
	this._properties = [];
	html_v2.super_.call(this, list, path, options);
}
html_v2.properName = 'Html_v2';
util.inherits(html_v2, FieldType);


html_v2.prototype.validateInput = TextType.prototype.validateInput;
html_v2.prototype.validateRequiredInput = TextType.prototype.validateRequiredInput;

/* Inherit from TextType prototype */
html_v2.prototype.addFilterToQuery = TextType.prototype.addFilterToQuery;

/* Export Field Type */
module.exports = html_v2;
