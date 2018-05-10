import React from 'react'
import {Editor, EditorState, RichUtils} from 'draft-js';


const getBlockStyle = (block) => {

    switch (block.getType()) {

        case 'left':
            return 'align-left';
        case 'center':
            return 'align-center';
        case 'right':
            return 'align-right';
        default:
            return null;
    }   
}

module.exports = React.createClass({

  getInitialState: function () {

    return {
      editorState: EditorState.createEmpty()
    }
  },

  onChange: function (editorState) {

    this.setState({editorState : editorState})
  },


  toggleInlineStyle: function (e, style) {

    e.preventDefault();

    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      style
    ));
  },

  toggleBlockType: function (e, style) {

    e.preventDefault();

    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      style
    ));
  },

  insertLink: function(e){ //!! faltan cosass... no es tan simple

    e.preventDefault();

    const urlValue = 'http://test.com'

    const {editorState} = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {url: urlValue}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ),
      showURLInput: false,
      urlValue: '',
    }, () => {
      //setTimeout(() => this.refs.editor.focus(), 0);
    });
  },

  render: function() {

    return (

      <div onClick={(e) => e.stopPropagation()}>

        <button onClick={(e) => this.toggleInlineStyle(e,'BOLD')}>Bold</button>
        <button onClick={(e) => this.toggleInlineStyle(e,'ITALIC')}>Italic</button>

        <button onClick={(e) => this.toggleBlockType(e,'header-one')}>H1</button>
        <button onClick={(e) => this.toggleBlockType(e,'unordered-list-item')}>UL</button>
        <button onClick={(e) => this.toggleBlockType(e,'ordered-list-item')}>OL</button>

        <button onClick={(e) => this.toggleBlockType(e,'right')}>right</button>


        <button onClick={this.insertLink}>LINK</button>
        
        <style>
          {`

            .align-right{
              text-align: right;
            }
            
          `}
        </style>
        

        <Editor 
                editorState={this.state.editorState} 
                blockStyleFn={getBlockStyle}
                onChange={this.onChange} />

      </div>
    )
  }
});