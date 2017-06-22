/*var Field = require('../Field');

module.exports = Field.create({
	displayName: 'I18nTextField'
});
*/

import React from 'react';
import Field from '../Field';
import { css } from 'glamor';
import { FormInput } from '../../../admin/client/App/elemental';
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

		newValue[lang] = event.target.value
		
		this.props.onChange({
			path: this.props.path,
			value: newValue,
		});

		
	},

	//+'.'+event.target.name

	renderField () {

		//<input value={this.props.value}/>

		var langs = this.props.langs;

		var css_base = css({ 

		  color: 'red',
		  ':hover': {
		    color: 'pink'
		  },
		  /*'@media(min-width: 800px)': {
		    color: 'green',
		    ':hover': {
		      color: 'yellow'
		    }
		  }*/
		})

		/*var css_base = css({ 

		  color: 'red',
		  ':hover': {
		    color: 'pink'
		  },
		  '@media(min-width: 800px)': {
		    color: 'green',
		    ':hover': {
		      color: 'yellow'
		    }
		  }
		})*/

		/*
		let mono = css({
		  'color': 'red'
		})

		let bolder = css({
		  'fontWeight': 'bolder'
		})
		{...css(bolder)}*/

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
			<div>
			
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

					return <FormInput {...{
								value:this.props.value ? this.props.value[lang] : '',
								//autoFocus: this.props.autoFocus,
								//inputProps: this.props.inputProps
								name: this.getInputName(this.props.path+'.'+lang),
								autoComplete: 'off',
								//name: this.getInputName(this.props.path),
								onChange: (e) => this.valueChanged(lang,e),
								ref: 'focusTarget',

							}} {...rules}/>

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