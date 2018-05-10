/* eslint-disable react/no-array-index-key */
import React from 'react';
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';


const getRelativeParent = (element) => {
  if (!element) {
    return null;
  }

  const position = window.getComputedStyle(element).getPropertyValue('position');
  if (position !== 'static') {
    return element;
  }

  return getRelativeParent(element.parentElement);
};


export default React.createClass({

  getInitialState: function () {

    return {
      position: {
        transform: 'scale(0)',
      }
    }
  },

  componentDidMount: function () {
    this.props.store.subscribeToItem('editorState', this.onEditorStateChange);
  },

  componentWillUnmount:function () {
    this.props.store.unsubscribeFromItem('editorState', this.onEditorStateChange);
  },

  onEditorStateChange: function(editorState) {


    const self = this;
    const selection = editorState.getSelection();


    if (!selection.getHasFocus()) {
      this.setState({
        position: {
          transform: 'scale(0)',
        },
      });
      return;
    }

    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());


    if(!currentBlock) return;
    
    //# exclude atomic blocks (img, post, etc)
    if(currentBlock.getType() == 'atomic') {
      this.setState({
        position: {
          transform: 'scale(0)',
        },
      });
      return;
    }

    

    //const entity = currentContent.getEntity(currentBlock.getEntityAt(0));

    //console.log("entity",entity)

    // TODO verify that always a key-0-0 exists
    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
    // Note: need to wait on tick to make sure the DOM node has been create by Draft.js
    setTimeout(() => {
      const node = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0];
      const top = node.getBoundingClientRect().top;
      const left = node.getBoundingClientRect().left
      //const editor = self.props.store.getItem('getEditorRef')().refs.editor;

      const relativeParent = getRelativeParent(this.toolbar.parentElement);
      const relativeRect = relativeParent ? relativeParent.getBoundingClientRect() : document.body.getBoundingClientRect();
      //relativeRect.x
//debugger;
      
      self.setState({
        position: {
          top: top - relativeRect.y - 5,// + window.scrollY)
          left: left - 100,//editor.getBoundingClientRect().left - 80,
          transform: 'scale(1)',
          transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        },
      });
    }, 50);
  },

  render: function() {

    const { theme, store } = this.props;

    return (
      <div
        className="SideToolbar"
        style={this.state.position}
        ref={(toolbar) => { this.toolbar = toolbar; }}
      >
        {this.props.structure.map((Component, index) => (
          <Component
            key={index}
            getEditorState={store.getItem('getEditorState')}
            setEditorState={store.getItem('setEditorState')}
            //theme={theme}
          />
        ))}
      </div>
    );
  }
})