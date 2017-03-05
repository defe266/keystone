var React = require('react');
var ReactDOM = require('react-dom');



module.exports = React.createClass({

	changeFile: function(e){


		var elm = ReactDOM.findDOMNode(this.refs.fileInput);

		//console.info('>',elm.files)
		//console.info(e,e.target.value,e.target.name);
		
		//if(this.props.onChange) this.props.onChange(e, elm.files);
		if(this.props.onChangeFile) this.props.onChangeFile(e, elm.files);
		//this.$el.find(".file")[0].files


	},
	
	render: function () {


		var style_container = {
			overflow: 'hidden',
    		position: 'relative'
		}

		var style_input = {

			background: '#fff',
		    cursor: 'inherit',
		    display: 'block',
		    fontSize: '100px',
		    minHeight: '100%',
		    minWidth: '100%',
		    opacity: '0',
		    outline: 'medium none',
		    position: 'absolute',
		    right: '0',
		    textAlign: 'right',
		    top: '0'
		}

		return (
		
			<div {...this.props} style={style_container}>

				{this.props.children}
				<input ref="fileInput" name={this.props.name} type="file" style={style_input} onChange={this.changeFile} multiple={this.props.multiple}/>

			</div>

		)
	}
});

