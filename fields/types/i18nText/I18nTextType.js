var _ = require('underscore');
var FieldType = require('../Type');
var util = require('util');
var utils = require('keystone-utils');

/**
 * i18nText FieldType Constructor
 * @extends Field
 * @api public
 */
function i18nText (list, path, options) {

//console.log("> ",list)//multilang

	this.options = options;
	this._nativeType = String;
	this._properties = ['langs'];

	//this._underscoreMethods = ['crop'];
	i18nText.super_.call(this, list, path, options);
}

i18nText.properName = 'i18nText';
util.inherits(i18nText, FieldType);



/*
html.prototype.validateInput = TextType.prototype.validateInput;
html.prototype.validateRequiredInput = TextType.prototype.validateRequiredInput;


html.prototype.addFilterToQuery = TextType.prototype.addFilterToQuery;
*/


/**
 * Registers the field on the List's Mongoose Schema.
 */
i18nText.prototype.addToSchema = function (schema) {

	var field = this;
	var options = this.options;

	
	this.paths = {};

	_.each(options.langs, (lang) => {

		this.paths[lang] = this.path + '.'+lang;
	});


	var paths  = this.paths;


	var schemaDef = {};

	_.each(options.langs, (lang) => {

		schemaDef[lang] = { type: String }
	})

	schema.nested[this.path] = true;

	schema.add(schemaDef, this.path + '.');

	
/*
	schema.virtual(paths.serialised).get(function () {
		return _.compact(

				options.langs.map((lang) => this.get(paths[lang]))

			).join(', ');
	});*/




	/*
	var paths = this.paths = {
		number: this.path + '.number',
		name: this.path + '.name',
	};

	var getFieldDef = function (type, key) {
		var def = { type: type };
		if (options.defaults[key]) {
			def.default = options.defaults[key];
		}
		return def;
	};

	schema.nested[this.path] = true;
	schema.add({
		number: getFieldDef(String, 'number'),
		name: getFieldDef(String, 'name'),
		street1: getFieldDef(String, 'street1'),
		street2: getFieldDef(String, 'street2'),
		street3: getFieldDef(String, 'street3'),
		suburb: getFieldDef(String, 'suburb'),
		state: getFieldDef(String, 'state'),
		postcode: getFieldDef(String, 'postcode'),
		country: getFieldDef(String, 'country'),
		geo: { type: [Number], index: '2dsphere' },
	}, this.path + '.');

	schema.virtual(paths.serialised).get(function () {
		return _.compact([
			this.get(paths.number),
			this.get(paths.name),
			this.get(paths.street1),
			this.get(paths.street2),
			this.get(paths.suburb),
			this.get(paths.state),
			this.get(paths.postcode),
			this.get(paths.country),
		]).join(', ');
	});

	// pre-save hook to fix blank geo fields
	// see http://stackoverflow.com/questions/16388836/does-applying-a-2dsphere-index-on-a-mongoose-schema-force-the-location-field-to
	schema.pre('save', function (next) {
		var obj = field._path.get(this);
		var geo = (obj.geo || []).map(Number).filter(_.isFinite);
		obj.geo = (geo.length === 2) ? geo : undefined;
		next();
	});*/

	//this.bindUnderscoreMethods();
};


i18nText.prototype.getInputFromData = function (data) {
	// Allow JSON structured data
	var input = this.getValueFromData(data);

	// If there is no structured data, look for the flat paths
	if (!input) {

		input = {}

		_.each(this.options.langs, (lang) => {

			input[lang] = data[this.paths[lang]];
		});
	}

	return input;
};


/**
 * Updates the value for this field in the item from a data object
 */
i18nText.prototype.updateItem = function (item, data, callback) {

	var values = this.getValueFromData(data);

	
	_.each(this.options.langs,(lang) => {

		var pathFull = this.path+'.'+lang;
		var value = data[pathFull];

		item.set(pathFull, value);
	});	

	process.nextTick(callback);
};

i18nText.prototype.validateInput = function (data, callback) {
    // Utility function to get that exact field value from all the form data
    //var value = this.getValueFromData(data);
    // Checks that the value is either undefined, null or a string
    //var result = value === undefined || value === null || typeof value === 'string';

    //value = value[Object.keys(value)[0]]  //# return first lang

    var value = this.getInputFromData(data);
    var result = !!value;

    if(result){

    	result = _.every(this.options.langs, (lang) => {

	    	return value[lang] === undefined || value[lang] === null || typeof value[lang] === 'string';
	    })	
    }

    
    utils.defer(callback, result);
};

i18nText.prototype.validateRequiredInput = function (item, data, callback) {
	/*
    // Utility function to get that exact field value from all the form data
    var value = this.getValueFromData(data);
    // If the value is null, undefined or empty string this will be false
    var result = !!value;
    // If the value is undefined but we have something in the database already we can let it pass
    if (value === undefined && item.get(this.path)) {
        result = true;
    }*/

    // Utility function to get that exact field value from all the form data
    var value = this.getInputFromData(data);

    console.log('required?',value)

    // If the value is null, undefined or empty string this will be false
    var result = !!value;

    if(result){

    	result = _.every(this.options.langs, (lang) => {

	    	var result = !!value[lang];

		    // If the value is undefined but we have something in the database already we can let it pass
		    if (value[lang] === undefined && item.get(this.path)[lang]) {

		        result = true;
		    }

		    return result;
	    })
    }
    

    utils.defer(callback, result);

};

/*
i18nText.prototype.getInputFromData = function (data) {
	// Allow JSON structured data
	var input = this.getValueFromData(data);

	// If there is no structured data, look for the flat paths
	if (!input) {

		_.each(this.options.langs, (lang) => {

			input[lang] = data[this.paths[lang]]
		})
	}

	return input;
};
*/





/*
i18nText.prototype.validateInput = function (data, callback) {
	var max = this.options.max;
	var min = this.options.min;
	var value = this.getValueFromData(data);
	var result = value === undefined || value === null || typeof value === 'string';
	if (max && typeof value === 'string') {
		result = value.length < max;
	}
	if (min && typeof value === 'string') {
		result = value.length > min;
	}
	utils.defer(callback, result);
};*/
/*
i18nText.prototype.validateRequiredInput = function (item, data, callback) {
	var value = this.getValueFromData(data);
	var result = !!value;
	if (value === undefined && item.get(this.path)) {
		result = true;
	}
	utils.defer(callback, result);
};*/

/**
 * Add filters to a query
 *//*
i18nText.prototype.addFilterToQuery = function (filter) {
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
};*/

/**
 * Crops the string to the specifed length.
 *//*
i18nText.prototype.crop = function (item, length, append, preserveWords) {
	return utils.cropString(item.get(this.path), length, append, preserveWords);
};*/

/* Export Field Type */
module.exports = i18nText;