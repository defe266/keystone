import React, { Component } from 'react';
import unionClassNames from 'union-class-names';


import {
  EditorState,
  AtomicBlockUtils,
} from 'draft-js';


import addHR from '../addHR';

import Icon from 'app/components/Icon';

export default class HRButton extends Component {

	  activate (event) {

      event.preventDefault();

      var editorState = this.props.getEditorState();

      var newEditorState = addHR(editorState);

      this.props.setEditorState(newEditorState);
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    render() {

      const { theme } = this.props;
      const className = theme.button;//this.isActive() ? unionClassNames(theme.button, theme.active) : theme.button;
      return (
        <div
          className={theme.buttonWrapper}
          onMouseDown={this.preventBubblingUp}
        >
          <button
            className={className}
            onClick={::this.activate}
            type="button"
          >
        
		      	<Icon style={{fontSize : '10px'}} name="sk-hr"/>

          </button>

        </div>
      );
    }
}