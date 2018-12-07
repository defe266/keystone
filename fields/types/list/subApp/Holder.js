var React = require('react');
//var DropTarget = require('react-dnd').DropTarget;
import { DropTarget } from 'react-dnd';



var ListItemHolder = React.createClass({

  displayName: "ListItemHolder",
 
  changeOrder: function(indexFrom){

    if(this.props.onChangeOrder){

      this.props.onChangeOrder(indexFrom, this.props.index)
    }
  },

  render: function () {
    // Your component receives its own props as usual
    var position = this.props.position;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    //var isOver = this.props.isOver;
    //var canDrop = this.props.canDrop;
    var connectDropTarget = this.props.connectDropTarget;

    //<div className={"col-sm-6 col-md-3" + ( this.props.isOver ? " col-sm-offset-6 col-md-offset-3" : '')}>
    return connectDropTarget(
      

      <div>

        <div className={"" + ( this.props.isOver ? " hovered" : '')}>
          {this.props.children}
        </div>

      </div>

    );
  }
});



//# hago FileHolder dropeable, para el D&D de orden
ListItemHolder = DropTarget('LIST_ITEM', 

{ //# action events

  canDrop: function (props, monitor) {

    var item = monitor.getItem();

    return (props.index != item.index) && (props.index != item.index+1); //# solo interacciona con items en otras posiciones (y que no sean el siguiente)
  },

  
  drop: function (props, monitor, component) {
  
    component.changeOrder(monitor.getItem().index);//props.index, 

  }
  
  //# inject props
}, function(connect, monitor){
  
  return {
    connectDropTarget: connect.dropTarget(),
    //canDrop: monitor.canDrop(),
    isOver: monitor.isOver() && monitor.canDrop()
  }
  
})(ListItemHolder);


module.exports = ListItemHolder;