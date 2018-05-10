import React, { Component } from 'react';
import unionClassNames from 'union-class-names';
/*
import {
  EditorState,
  Entity,
  //AtomicBlockUtils,
} from 'draft-js';
*/

import {EditorState, RichUtils, Modifier} from 'draft-js'
import colorStyleMap from './colorStyleMap'

//import addImage from './modifiers/addImage';

import DraftToolsDropdownButton from '../../Utils/DraftToolsDropdownButton';

//var ColorPicker = require('react-color').TwitterPicker;
import {GithubPicker} from 'react-color';//TwitterPicker

import Icon from 'app/components/Icon';

import './index.css'


var ColorPicker = GithubPicker;



export default class ColorButton extends Component {

    state = {

      open : false
    }

    onToggle (newState){
      
      this.setState({open : newState})
    }

    changeColor(color){

      const safeName = color.hex.replace('#', '');
      const toggledColor = `color_${safeName}`//'red';//
      //console.log("toggledColor",toggledColor)
      const editorState = this.props.getEditorState();
      const selection = editorState.getSelection();



      // Let's just allow one color at a time. Turn off all active colors.
      const nextContentState = Object.keys(colorStyleMap)
        .reduce((contentState, color) => {

          return Modifier.removeInlineStyle(contentState, selection, color)
        }, editorState.getCurrentContent());

      let nextEditorState = EditorState.push(
        editorState,
        nextContentState,
        'change-inline-style'
      );

      const currentStyle = editorState.getCurrentInlineStyle();

      // Unset style override for current color.
      if (selection.isCollapsed()) {
        nextEditorState = currentStyle.reduce((state, color) => {

          return RichUtils.toggleInlineStyle(state, color);

        }, nextEditorState);
      }

      // If the color is being toggled on, apply it.
      if (!currentStyle.has(toggledColor)) {
        nextEditorState = RichUtils.toggleInlineStyle(
          nextEditorState,
          toggledColor
        );
      }

      this.props.setEditorState(nextEditorState);

      this.setState({open : false});

      /*
    	//e.preventDefault()

      	//console.log('color!', color);
      	//this.props.openModal(type)
        //color.hex

        const editorState = this.props.getEditorState()
        const currentStyle = editorState.getCurrentInlineStyle()

        //debugger;


//active={currentStyle.has(type.style)}
        
        const safeName = color.hex.replace('#', '')
        const style = `color-${safeName}`

        //if (!currentStyle.has(style)) {


          this.props.setEditorState(
            RichUtils.toggleInlineStyle(editorState, style)//'BOLD'
          )
          //this.props.closeModal()
        //}

        console.log(currentStyle.toString())

        */






        /*

        const selection = editorState.getSelection();

          // Let's just allow one color at a time. Turn off all active colors.
          const nextContentState = Object.keys(colorStyleMap)
            .reduce((contentState, color) => {
              return Modifier.removeInlineStyle(contentState, selection, color)
            }, editorState.getCurrentContent());

          let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
          );

          const currentStyle = editorState.getCurrentInlineStyle();

          // Unset style override for current color.
          if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce((state, color) => {
              return RichUtils.toggleInlineStyle(state, color);
            }, nextEditorState);
          }

          // If the color is being toggled on, apply it.
          if (!currentStyle.has(toggledColor)) {
            nextEditorState = RichUtils.toggleInlineStyle(
              nextEditorState,
              toggledColor
            );
          }
        */


        /*
        const colorStyleMap = {
        red: {
          color: 'rgba(255, 0, 0, 1.0)',
        },
        orange: {
          color: 'rgba(255, 127, 0, 1.0)',
        },
        yellow: {
          color: 'rgba(180, 180, 0, 1.0)',
        },
        green: {
          color: 'rgba(0, 180, 0, 1.0)',
        },
        blue: {
          color: 'rgba(0, 0, 255, 1.0)',
        },
        indigo: {
          color: 'rgba(75, 0, 130, 1.0)',
        },
        violet: {
          color: 'rgba(127, 0, 255, 1.0)',
        },
      };

        */

        //https://codepen.io/Kiwka/embed/oBpVve?height=281&theme-id=0&slug-hash=oBpVve&default-tab=js%2Cresult&user=Kiwka&embed-version=2&pen-title=Color%20-%20Draft.js%20example
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    render() {
      const { theme } = this.props;
      const className = theme.button;//this.isActive() ? unionClassNames(theme.button, theme.active) : theme.button;


      const colors = Object.keys(colorStyleMap).map((key, index)  => colorStyleMap[key].color);



      return (
        <div
          className={theme.buttonWrapper}
          onMouseDown={this.preventBubblingUp}
        >
            <div className="Draft-ColorButton">

              <DraftToolsDropdownButton className={className} title={<Icon name='tint'/>} id="color picker" open={this.state.open} onToggle={::this.onToggle}>

                    <ColorPicker colors={colors} onChangeComplete={::this.changeColor}/>{/*color={data.get('color')}  onChangeComplete={ (color) => props.onChangeData({color : color.hex}) }*/}

              </DraftToolsDropdownButton>
            
		  	    </div>


        </div>
      );
    }
}