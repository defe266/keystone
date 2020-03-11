/*var Field = require('../Field');

module.exports = Field.create({
	displayName: 'I18nTextField'
});
*/

import React from 'react';
import Field from '../Field';
import { css } from 'glamor';
import tinymce from 'tinymce';
//import { FormInput } from '../../../admin/client/App/elemental';
import HtmlField from '../html/HtmlField.js';
import { FormNote } from '../../../admin/client/App/elemental';
//import tinymce from 'tinymce';
//import { FormInput } from '../../../admin/client/App/elemental';
//import evalDependsOn from '../../utils/evalDependsOn';


module.exports = Field.create({

	displayName: 'I18nTextField',
	statics: {
		type: 'I18nText',
	},

	getInitialState () {

		return {

			active : this.props.defaultLang ? this.props.defaultLang : this.props.langs[0]
		}
	},

	changeLang (lang) {

		this.setState({active: lang});
	},

	valueChanged (lang, event) {

		

		var newValue = this.props.value ? this.props.value : {};

		newValue[lang] = event.value
		
		this.props.onChange({
			path: this.props.path,
			value: newValue,
		});

		
	},

	renderNote () {
		if (!this.props.note) return null;
		return <FormNote html={this.props.note}/>;
	},

	//+'.'+event.target.name

	renderField () {


		var langs = this.props.langs;

		var props2 = Object.assign({}, this.props);

		delete props2.dependsOn;
		delete props2.note;
		

		var css_base = css({ 

			'& label': {//field-type-i18nHtml FormField__inner label
				'display': 'none',
			},
			/*'@media(min-width: 800px)': {
			color: 'green',
			':hover': {
			  color: 'yellow'
			}
			}*/
		})


		let css_tab  = css({
		  //'fontWeight': 'bolder',
		  'float': 'left',
		  //border': '1px solid #CBCBCB'
		  'padding': '5px 10px',
		  'cursor':'pointer'
		})

		let css_tab_selected  = css({
		  'color' : '#398BEB',
		  //'background' : '#fff',
		})

		let css_input  = css({
		  'display': 'none !important',
		  'clear': 'both'
		})

		let css_input_selected  = css({
		  'display': 'block !important'
		})
		




		return (
			<div className={css_base}>
			
				{langs.length > 1 ? 

					<div>
						{langs.map((lang) => {

							if(lang == this.state.active){

								var rules = css(css_tab, css_tab_selected);

							}else{

								var rules = css(css_tab);
							}
							

							return <div onClick={(e) => this.changeLang(lang)} {...rules}>{lang}</div>
						})}
					</div>

				:null}

				{langs.map((lang) => {

					//const { autoFocus, value, inputProps } = this.props;
					//...inputProps,

					if(lang == this.state.active){

						var rules = css(css_input, css_input_selected);

					}else{

						var rules = css(css_input);
					}


					
					
					return (

						<div {...rules}>

							<HtmlField {...props2} {...{
								value: this.props.value ? this.props.value[lang] : '',
								//name: this.getInputName(this.props.path+'.'+lang),
								//autoComplete: 'off',
								onChange: (e) => this.valueChanged(lang,e),
								//ref: 'focusTarget',

								values : this.props.value,
								path: this.props.paths[lang],
								//path: this.props.path,
								//inputNamePrefix : `${this.props.path}`,//[${index}]
								//key : lang,
								mode: 'edit'

							}} />

						</div>
					)

				})}
				
			</div>
		);
	},

	renderValue () {

		
		return (
			<FormInput multiline noedit>
				{this.props.value}
			</FormInput>
		);
	},

});

/*var className = this.state.isFocused ? 'is-focused' : '';
		var style = {
			height: this.props.height,
		};*/

		/*

		<FormInput
					id={this.state.id}
					multiline
					name={this.getInputName(this.props.path)}
					onChange={this.valueChanged}
					className={this.props.wysiwyg ? 'wysiwyg' : 'code'}
					style={style}
					value={this.props.value}
				/>
		*/