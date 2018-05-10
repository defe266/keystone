import unionClassNames from 'union-class-names';
import React, { Component } from 'react';
import Immutable from 'immutable'

import PostItem from 'app/views/Parts/PostItem';
import DnDHandler from '../Misc/Components/DnDHandler';

export default class PostComponent extends Component {
  render() {
    const {
      block,
      className,
      theme = {},
      ...otherProps
    } = this.props;
    // leveraging destructuring to omit certain properties from props
    const {
      blockProps, // eslint-disable-line no-unused-vars
      customStyleMap, // eslint-disable-line no-unused-vars
      customStyleFn, // eslint-disable-line no-unused-vars
      decorator, // eslint-disable-line no-unused-vars
      forceSelection, // eslint-disable-line no-unused-vars
      offsetKey, // eslint-disable-line no-unused-vars
      selection, // eslint-disable-line no-unused-vars
      tree, // eslint-disable-line no-unused-vars
      contentState,
      ...elementProps
    } = otherProps;
   // const combinedClassName = unionClassNames(theme.image, className);
    //const { src } = contentState.getEntity(block.getEntityAt(0)).getData();
    const data = contentState.getEntity(block.getEntityAt(0)).getData();

    
    //draggable="true" onDragStart={this.props.onDragStart} contentEditable={false}


    //draggable="true" 

    //delete elementProps.onClick


    if(this.props.readOnly){

      delete elementProps.onClick
    }

    return (


      <div {...elementProps} className={className} >


        
        <div className="draft-Post">
        
          <PostItem ref="content" item={Immutable.fromJS(data.data)} noAdders={true} bordered noMargin disabledGallery/>

          <DnDHandler onDragStart={elementProps.onDragStart} contentRef={this.refs.content}/>

        </div>
      

      </div>
          
    );
  }
}