import unionClassNames from 'union-class-names';
import React, { Component } from 'react';

var Graphic = require('app/views/Parts/Graphic');
import DnDHandler from '../Misc/Components/DnDHandler';

export default class BlockComponent extends Component {

  componentDidUpdate (){
    
    this.refs.content.resize_debounced()
  }

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

    
    //{"padding":{"top":45,"left":65,"bottom":85,"right":50},"renderer":"svg","signals":[{"init":{},"streams":[{"expr":"{}","type":"symbol:mouseout"},{"expr":"datum","type":"symbol:mouseover"}],"name":"tooltip"},{"init":{},"streams":[{"expr":"datum","type":"symbol:click"}],"name":"click"}],"data":[{"values":[{"filterX":"date","xaxis":"30-04-2017","filterSep":"","filterY":"post_id","fieldSep":"","xaxisShort":"30-04-2017","y":1,"fieldY":"post_id","fieldX":"published_at","separador":""},{"filterX":"date","xaxis":"01-05-2017","filterSep":"","filterY":"post_id","fieldSep":"","xaxisShort":"01-05-2017","y":87,"fieldY":"post_id","fieldX":"published_at","separador":""},{"filterX":"date","xaxis":"02-05-2017","filterSep":"","filterY":"post_id","fieldSep":"","xaxisShort":"02-05-2017","y":58,"fieldY":"post_id","fieldX":"published_at","separador":""}],"name":"table"}],"scales":[{"domain":{"data":"table","field":"xaxis"},"name":"x","range":"width","type":"ordinal","points":true},{"domain":{"data":"table","field":"y"},"name":"y","range":"height","type":"linear","nice":true},{"domain":{"data":"table","field":"separador"},"name":"color","range":["rgb(41,157,214)","rgb(80,73,213)","rgb(184,38,197)","rgb(217,65,44)","rgb(253,144,11)","rgb(240,212,25)","rgb(125,196,40)","rgb(41,194,112)"],"type":"ordinal"}],"width":500,"axes":[{"tickSizeEnd":5,"scale":"x","type":"x","properties":{"labels":{"dx":{"value":3},"angle":{"value":50},"baseline":{"value":"middle"},"align":{"value":"left"}}}},{"scale":"y","type":"y"}],"marks":[{"from":{"transform":[{"groupby":["separador"],"type":"facet"}],"data":"table"},"marks":[{"type":"line","properties":{"enter":{"strokeWidth":{"value":2},"x":{"field":"xaxis","scale":"x"},"y":{"field":"y","scale":"y"},"interpolate":{"value":"monotone"},"stroke":{"field":"separador","scale":"color"}}}},{"type":"symbol","properties":{"enter":{"strokeWidth":{"value":2},"cursor":{"value":"pointer"},"size":{"value":25},"shape":{"value":"square"},"x":{"field":"xaxis","scale":"x"},"y":{"field":"y","scale":"y"},"fill":{"field":"separador","scale":"color"},"stroke":{"field":"separador","scale":"color"}}}},{"type":"text","properties":{"update":{"dx":{"mult":0.5,"scale":"x","band":true},"fillOpacity":[{"test":"datum._id == tooltip._id","value":1},{"value":0}],"x":{"field":"xaxis","scale":"x"},"y":{"offset":-15,"scale":"y","signal":"tooltip.y"},"text":{"template":"{{tooltip.y|number:','}}"}},"enter":{"fontSize":{"value":"14"},"align":{"value":"center"},"fill":{"value":"#333"}}}},{"type":"text","properties":{"update":{"dx":{"mult":0.5,"scale":"x","band":true},"fillOpacity":[{"test":"datum._id == tooltip._id","value":1},{"value":0}],"x":{"field":"xaxis","scale":"x"},"y":{"offset":-27,"scale":"y","signal":"tooltip.y"},"text":{"signal":"tooltip.xaxis"}},"enter":{"fontSize":{"value":"14"},"align":{"value":"center"},"fill":{"value":"#333"}}}}],"type":"group"}],"height":300}
    //draggable="true" 

    return (


      <div {...elementProps} className={className} >


        
        <div className="draft-Graphic">
        
          <Graphic ref="content" spec={data.data} height={220}/>

          <DnDHandler onDragStart={elementProps.onDragStart} contentRef={this.refs.content}/>

        </div>
      

      </div>
          
    );
  }
}