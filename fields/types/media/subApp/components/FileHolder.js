var React = require('react');
var DropTarget = require('react-dnd').DropTarget;



var FileHolder = React.createClass({

  displayName: "FileHolder",
  /*
  componentWillReceiveProps: function (nextProps) {
    if (!this.props.isOver && nextProps.isOver) {
      // You can use this as enter handler
    }

    if (this.props.isOver && !nextProps.isOver) {
      // You can use this as leave handler
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      // You can be more specific and track enter/leave
      // shallowly, not including nested targets
    }
  },*/

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
      

      <div className="ImgUploader__fileHolder">

        <div className={"ImgUploader__fileHolder_content" + ( this.props.isOver ? " hovered" : '')}>
          {this.props.children}
        </div>
      </div>

    );
  }
});



//# hago FileHolder dropeable, para el D&D de orden
FileHolder = DropTarget('FILE', 

{ //# action events

  canDrop: function (props, monitor) {

    var item = monitor.getItem();

    //console.log(item,props);

    return (props.index != item.index) && (props.index != item.index+1); //# solo interacciona con items en otras posiciones (y que no sean el siguiente)
  },
  /*
  hover: function (props, monitor, component) {
  
    //TRIGGer hover funcion??¿
    console.log('hover',props, monitor, component);

    //monitor.canDrop()
  },*/
  
  drop: function (props, monitor, component) {
  
    //TRIGGer hover funcion??¿
    //console.log('drop',props, monitor, component);

    //monitor.getItem();
    component.changeOrder(monitor.getItem().index);//props.index, 

  }
  
  //# inject props
}, function(connect, monitor){
  
  return {
    connectDropTarget: connect.dropTarget(),
    //canDrop: monitor.canDrop(),
    isOver: monitor.isOver() && monitor.canDrop()
  }
  
})(FileHolder);


module.exports = FileHolder;