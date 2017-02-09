var FieldType = require('../Type');
var I18nText = require('../i18nText/I18nTextType');
var util = require('util');


/**
 * i18nHtml FieldType Constructor
 * @extends Field
 * @api public
 */
function i18nHtml (list, path, options) {

//console.log("> ",list)//multilang

	this.options = options;
	this._nativeType = String;
	this._defaultSize = 'full';
	this.wysiwyg = options.wysiwyg || false;
	this.height = options.height || 180;
	this._properties = ['wysiwyg', 'height', 'langs','defaultLang'];

	i18nHtml.super_.call(this, list, path, options);
}

i18nHtml.properName = 'i18nHtml';
util.inherits(i18nHtml, FieldType);


i18nHtml.prototype.addToSchema = I18nText.prototype.addToSchema;
i18nHtml.prototype.getInputFromData = I18nText.prototype.getInputFromData;
i18nHtml.prototype.updateItem = I18nText.prototype.updateItem;
i18nHtml.prototype.validateInput = I18nText.prototype.validateInput;
i18nHtml.prototype.validateRequiredInput = I18nText.prototype.validateRequiredInput;
//i18nHtml.prototype.addFilterToQuery = I18nText.prototype.addFilterToQuery;


/* Export Field Type */
module.exports = i18nHtml;