import React, { Component } from 'react';
import unionClassNames from 'union-class-names';
import _ from 'lodash'

import {EditorState, RichUtils, Modifier} from 'draft-js'
import fontStyleMap from '../../fontStyleMap'



//import Icon from 'app/components/Icon';



export default React.createClass({
  
    defaultSize: 18,

    fontUp: function(){

      var size = 40;

      //const toggledSize = 'font_size_9';//`font_size_${size}`
      const editorState = this.props.getEditorState();
      const selection = editorState.getSelection();


      //# remove others sizes
      const nextContentState = Object.keys(fontStyleMap).reduce((contentState, size) => {

          return Modifier.removeInlineStyle(contentState, selection, size)

      }, editorState.getCurrentContent());

      
      let nextEditorState = EditorState.push(
        editorState,
        nextContentState,
        'change-inline-style'
      );
      
      //# search current size and calculate next size.
      const currentStyle = editorState.getCurrentInlineStyle();


      var currentSizeRule = currentStyle.find((i) => i.indexOf('font_size_') != -1);

      if(currentSizeRule){

        var currentSize = parseInt(currentSizeRule.replace('font_size_',''))

      }else{

        var currentSize = this.defaultSize;
      }

      

      const toggledSize = 'font_size_' + (currentSize - 1)
      
      

      //# Unset style override for current size.
      if (selection.isCollapsed()) {
        nextEditorState = currentStyle.reduce((state, toggledSize) => {

          return RichUtils.toggleInlineStyle(state, toggledSize);

        }, nextEditorState);
      }

      //# If the color is being toggled on, apply it.
      if (!currentStyle.has(toggledSize)) {
        nextEditorState = RichUtils.toggleInlineStyle(
          nextEditorState,
          toggledSize
        );
      }


      this.props.setEditorState(nextEditorState);


    },

    preventBubblingUp: (event) => { event.preventDefault(); },

    render: function () {
      const { theme } = this.props;
      const className = theme.button;


      return (
        <div
          className={theme.buttonWrapper}
          onMouseDown={this.preventBubblingUp}
        >

            <button
              className={className}
              onClick={this.fontUp}
              type="button"
            >
          
              {/*<Icon name='font'/>-*/}

              <span className="octicon octicon-size"></span>-

            </button>


        </div>
      );
    }
})