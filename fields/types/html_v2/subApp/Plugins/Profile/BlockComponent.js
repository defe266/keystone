import unionClassNames from 'union-class-names';
import React, { Component } from 'react';
import Immutable from 'immutable'

var UserItem = require('app/views/Parts/UserItem');
import DnDHandler from '../Misc/Components/DnDHandler';

export default class BlockComponent extends Component {

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
    const combinedClassName = unionClassNames(theme.image, className);
    //const { src } = contentState.getEntity(block.getEntityAt(0)).getData();
    const data = contentState.getEntity(block.getEntityAt(0)).getData();

  
    //draggable="true" 

    return (


      <div {...elementProps} className={combinedClassName} >

        
        <div className="draft-Profile">
          
          <div ref="content">
            <UserItem item={Immutable.fromJS(data.data)} noAdders noLists expanded bordered/>
          </div>

          <DnDHandler onDragStart={elementProps.onDragStart} contentRef={this.refs.content}/>

        </div>
      

      </div>
          
    );
  }
}