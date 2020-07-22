/* eslint-disable react/jsx-no-bind */

import assign from 'object-assign';
//import { css, StyleSheet } from 'aphrodite/no-important';
import React from 'react';
import Field from '../../Field';
//import Domify from 'react-domify';
//var HTML5Backend = require('react-dnd-html5-backend');
//var DragDropContext = require('react-dnd').DragDropContext;

import { Fields } from 'FieldTypes';
import { Button, GlyphButton } from '../../../../admin/client/App/elemental';
import InvalidFieldType from '../../../../admin/client/App/shared/InvalidFieldType';

import {
	FormInput,
	Grid,
} from '../../../../admin/client/App/elemental';

var List = React.createClass({
	getInitialState () {

		if(!this.props.value){

			return{
				nRows: 1,
				nCols: 1,
				//showTable: false,
				table: [],
				//arrayX = new Array(0),
				//arrayY = new Array(0),
			}
		}else{

			return {
				nRows: 1,
				nCols: 1,
				//showTable: true
			}
		}
	},

	generateTable () {
		
		//var result = this.state.nRows * this.state.nCols
		if(this.state.nCols != 0 && this.state.nRows != 0) {
			
			//var table = new Array;
			var table = {...this.props.value}
			var nCols = this.state.nCols
			var nRows = this.state.nRows

			for(var i = 0; i < nRows;i++ ){

				table[i] = new Array(nCols)

				for(var j = 0; j < nCols;j++ ){
					table[i][j] = ''
				}
			}

			this.props.onChange(table)

		}
		//this.setState({table:table})
	},
	onChangeInputTable(data){
		
		var newValue = this.props.value

		newValue = newValue ? newValue : []

		newValue[data.posX][data.posY] = data.data;

		this.props.onChange(newValue)

		/*this.setState({
			 table[newValue.posX][newValue.posY] : newValue.data 
			})*/
	},
	
	render: function (){

		var { label, value } = this.props;

		var table = value ? value : []
		
		/**STYLES*/
		var tableStyle = {}
		var inputTableStyle = {
			borderColor: "#ccc",
			borderRadius: "0.3rem",
			borderStyle: "solid",
			borderWidth: "1px",
			boxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.075)",
			color: "inherit",
			height: "2.4em",
			lineHheight: "2.3em",
			padding: "0 .75em",
			margin: "10px"
		}
		var divTableStyle = {
			paddingLeft : "5px",
			paddingRight : "5px",
			display: "inline-block"
		}

		//console.log("TABle",table)
		return (
			<div>
				<Grid.Row small="one-half" gutter={10}>
					<Grid.Col>
						<FormInput
						
							placeholder="nº Filas"
							onChange={(e) => this.setState({nRows: parseInt(e.target.value)})}
							//onChange={(e) => this.updateTable({nRows: parseInt(e.target.value)})}
							ref="rows"
							value={this.state.nRows}
							type="number"
							//min="1"
							//value={this.props.value}
						/>
					</Grid.Col>
					<Grid.Col>
						<FormInput
							
							placeholder="nº Columnas"
							//onChange={(e) => this.updateTable({nCols: parseInt(e.target.value)})}
							onChange={(e) => this.setState({nCols: parseInt(e.target.value)})}
							ref="cols"
							value={this.state.nCols}
							type="number"
							//min="1"
							//value={this.props.value}
						/>
					</Grid.Col>
					
				</Grid.Row>
				<br/>
				<GlyphButton color="success" glyph="plus" position="left" onClick={this.generateTable}>
					Generate
				</GlyphButton>
				<br/><br/>
				{
					table.length > 0 ? 
					<div style={tableStyle}>

						{table.map((i,index) => {
							
						return(
							<div>
								{
									i.map((j,index2) =>{
									
										return(<input onChange={(e) => this.onChangeInputTable({data: e.target.value, posX: index, posY: index2})} style={inputTableStyle} placeholder={"POS: "+index+"-"+index2}></input>)
									})
								}
							</div>) 
						})}
						{/*table.map((i,index) => {

							i[index].map((j,index2) =>{

								return <div>COL {index}</div>
							})
						
						})*/}
						
			

					</div>
					:null
				}

				
			</div>
			
		)
	}
})



module.exports = List