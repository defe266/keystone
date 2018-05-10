import unionClassNames from 'union-class-names';
import React, { Component } from 'react';

import DnDHandler from '../Misc/Components/DnDHandler';

export default class HRComponent extends Component {

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
    //const combinedClassName = unionClassNames(theme.image, className);
    //const { src } = contentState.getEntity(block.getEntityAt(0)).getData();
    const data = contentState.getEntity(block.getEntityAt(0)).getData();


    // draggable={typeof elementProps.onDragStart !== 'undefined'} 

    return (


      <div className="draft-HR__container">
        <div {...elementProps} className={className}>

          <div ref="content" className="draft-HR">
          
            <div className="draft-HR__content"/>

          </div>

          <DnDHandler onDragStart={elementProps.onDragStart} contentRef={this.refs.content}/>

        </div>
      </div>
          
    );
  }
}