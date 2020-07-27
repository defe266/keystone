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
		console.log("initial state generate",this.props)
		if(!this.props.value){

			return{
				nRows: 1,
				nCols: 1,
				//table: {},
	
			}
		}else{
		
			//var rows = Object.keys(this.props.value).length
			var rows = this.props.value.length
			var cols = this.props.value[0].length
			console.log("rowwws",rows)
			console.log("colss",cols)
			return {
				nRows: rows,
				nCols: cols,
				//showTable: true
			}
		}
	},

	generateTable () {
		//e.preventDefault()
		//var result = this.state.nRows * this.state.nCols
		if(this.state.nCols != 0 && this.state.nRows != 0) {
			
	
			//var table = {...this.props.value}
			//var table = [...this.props.value]
			var nCols = this.state.nCols
			var nRows = this.state.nRows
			var newTable = []

			//comprobar si el array se hace mas grande, en ese caso se mantienen datos sino lo mejor es crear nuevo

			/*if(this.props.value.length >= nRows && this.props.value[0].length >= nCols){
				var newTable = [...this.props.value]
				
			}else{
				var newTable = []
			}*/

			for(var i = 0; i < nRows;i++ ){

				//table[i] = new Array(nCols)
				newTable[i] = new Array(nCols)
				
				for(var j = 0; j < nCols;j++ ){
					//table[i][j] = ''
					
					if(this.props.value.length - 1  >= i && this.props.value[i].length - 1  >= j && this.props.value[i][j] != ''){
						newTable[i][j] = this.props.value[i][j]
					}else{
						newTable[i][j] = ''
					}
					
				}
			}

			//this.props.onChange(table)
			this.props.onChange(newTable)

		}
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
		var float = {

			float:"left"
		}
		var marginLeft = {

			marginLeft:"10px"
		}
		var buttonStyle = {
			
			appearance: "none",
			background: "-webkit-linear-gradient(to bottom, #fafafa 0%, #eaeaea 100%)",
			background: "-moz-linear-gradient(to bottom, #fafafa 0%, #eaeaea 100%)",
			background: "linear-gradient(to bottom, #fafafa 0%, #eaeaea 100%)",
			borderWidth: "1px",
			borderStyle: "solid",
			borderColor: "#ccc #c0c0c0 #b4b4b4",
			borderRadius: "0.3rem",
			cursor: "pointer",
			display: "inline-block",
			fontWeight: "500",
			height: "2.4em",
			lineHeight: "2.3em",
			marginBottom: "0",
			padding: "0 1em",
			outline: "0",
			textAlign: "center",
			touchAction: "manipulation",
			userSelect: "none",
			verticalAlign: "middle",
			whiteSpace: "nowrap",
			color: "#1A1A1A",
			textShadow: "0 1px 0 white",
			marginTop:"28px"
		}
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

		console.log("valor en render de generate",table)
		return (
			<div>
				{/*<Grid.Row small="one-half" gutter={10}>
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
					<Grid.Col>
						<GlyphButton color="success" glyph="plus" position="left" onClick={this.generateTable}>
							Aplicar
						</GlyphButton>
					</Grid.Col>
		
					
				</Grid.Row>*/}
				<div>
					<div style={float}>
						<div style={marginLeft}>Filas</div>
						<input 
							placeholder="nº Filas"
							onChange={(e) => this.setState({nRows: parseInt(e.target.value)})}
							ref="rows"
							value={this.state.nRows}
							type="number"
							style={inputTableStyle}
							
						/>
					</div>

					<div style={float}>
						<div style={marginLeft}>Columnas</div>
						<input
							placeholder="nº Columnas"
							onChange={(e) => this.setState({nCols: parseInt(e.target.value)})}
							ref="cols"
							value={this.state.nCols}
							type="number"
							style={inputTableStyle}
						/>
					</div>

					<div style={float}>
					
						
						<Button color="default" style={buttonStyle} position="left" onClick={this.generateTable}>
							Aplicar
						</Button>
						{/*<button style={buttonStyle} onClick={(e) => this.generateTable(e)}>Aplicar</button>*/}
					</div>
		
				</div>
				<br/>
				
				<br/><br/>
				<br/><br/>
				{/*
					table ?
					<div>
						{
							Object.keys(table).map( (i, index) =>{
								
								return(
									<div>
										{
											table[i].map((j,index2) =>{
											
											return(<input name={this.props.path+'['+index+']['+index2+']'} onChange={(e) => this.onChangeInputTable({data: e.target.value, posX: index, posY: index2})} style={inputTableStyle} placeholder={"POS: "+index+"-"+index2} value={table[index][index2]}/>)
											})
										}
									</div>
								)
							})
						}	
					</div> 
					:null
					*/}
				

				{
					table.length > 0 ? 
					<div style={tableStyle}>

						{table.map((i,index) => {
							
						return(
							<div>
								{
									i.map((j,index2) =>{

										var indexAdapted = index+1
										var index2Adapted = index2+1

										var labelTableStyle = {
											marginLeft:"10px",
										
										}
										var alignStyle = {
											display:"inline-grid"
										}
										return(

											<span style={alignStyle}>
												<span style={labelTableStyle}>Fila: <b>{indexAdapted}</b>, Col: <b>{index2Adapted}</b></span>
												<input name={this.props.path+'['+index+']['+index2+']'} onChange={(e) => this.onChangeInputTable({data: e.target.value, posX: index, posY: index2})} style={inputTableStyle} value={table[index][index2]} />
											</span>
											)
									})
								}
							</div>) 
						})}
					
						
			

					</div>
					:null
					}

				
			</div>
			
		)
	}
})



module.exports = List