//var sd = require('sharify').data;
import unionClassNames from 'union-class-names';
import React, { Component } from 'react';

//import ProgressBar from 'react-bootstrap/lib/ProgressBar';
//import DnDHandler from '../../Misc/Components/DnDHandler';


export default React.createClass({

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
    const { preview, loading, imageId } = contentState.getEntity(block.getEntityAt(0)).getData();


    /*
    console.log('loading',loading)

    debugger;*/

    //selection
    //contentState

    var src = imageId ? '/uploads/'+ imageId : preview;

    return (
      <div {...elementProps} className={className + ' draft-Image'}>

        <img ref="content" src={src} role="presentation" draggable={false}/>

        {/*loading < 100 ? 
          <ProgressBar now={loading} srOnly/>
        :null*/}
        

        {/*<DnDHandler onDragStart={elementProps.onDragStart} contentRef={this.refs.content}/>*/}

      </div>
    );
  }
})
