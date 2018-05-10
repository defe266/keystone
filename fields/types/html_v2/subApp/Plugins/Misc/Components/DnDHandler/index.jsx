import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Icon from 'app/components/Icon';

import './index.css';

export default class DnDHandler extends Component {
  render() {
    const {

      onDragStart,
      contentRef
      
    } = this.props;


    if(!onDragStart) return <span/>

    return (

      <div className="DnDHandler">

        <div className="DnDHandler__handle" draggable="true" onMouseDown={(e) => e.stopPropagation()} onDragStart={(e) => {

          if(contentRef){

            var preview = ReactDOM.findDOMNode(contentRef)

            e.dataTransfer.setDragImage(preview, 0, 0);

          }
          
          onDragStart(e);

        }}>

          <div className="DnDHandler__icon">
            <Icon name="ellipsis-v"/>
            <Icon name="ellipsis-v"/>
            {/*<Icon name="ellipsis-v"/>*/}
            {/*<Icon name="arrows"/>*/}
          </div>
          
        </div>

      </div>

          
    );
  }
}