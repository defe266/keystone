var React = require('react');
//var DragSource = require('react-dnd').DragSource;
import { DragSource } from 'react-dnd';
//var ButtonLoader = require('./buttonLoader.js');



var ListItem = React.createClass({  //monitor.getDropResult()

  displayName: "ListItem",

  render: function(){

    var props = this.props;

    var connectDragSource = this.props.connectDragSource;


    var output = (

      <div>

        {props.children}

      </div>
    )

    //if(props.dragable) return connectDragSource(output);
    return connectDragSource(output);


    return output;
  }

});



//# hago File dragable, para el D&D de orden
ListItem = module.exports = DragSource('LIST_ITEM', {
  
  beginDrag: function (props) {
    
      //console.log('beginDrag',props);

    //var item = { id: props.id };
    return {
      index : props.index
    }//props//item;
  }
  
}, function(connect, monitor){

    return {
      connectDragSource: connect.dragSource()//,
      //isDragging: monitor.isDragging()    
    }
    
})(ListItem);


module.exports = ListItem;