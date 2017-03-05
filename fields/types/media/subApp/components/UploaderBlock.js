var React = require('react');
var classNames = require('classnames');
var DropTarget = require('react-dnd').DropTarget;
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');//react-dnd/modules/backends/HTML5
//var _ = require('underscore');

/*
var Types = {
  CHESSPIECE: 'chesspiece'
};
*/


/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
/*var chessSquareTarget = { //spec
  canDrop: function (props, monitor) {
    // You can disallow drop based on props or item
    var item = monitor.getItem();
    //return canMakeChessMove(item.fromPosition, props.position);
    return true;
  },

  hover: function (props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.

    // You can access the coordinates if you need them
    var clientOffset = monitor.getClientOffset();
    var componentRect = findDOMNode(component).getBoundingClientRect();

    // You can check whether we're over a nested drop target
    var isJustOverThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    var canDrop = monitor.canDrop();
  },

  drop: function (props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    var item = monitor.getItem();

    // You can do something with it
    ChessActions.movePiece(item.fromPosition, props.position);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};
*/



var fileTarget = {
  drop: function (props, monitor) {

    //console.log(monitor.getItem().files);

    //console.log(props, monitor)

    if(props.onSuccess && !props.disabled) props.onSuccess(monitor.getItem().files);

    //return monitor.getItem().files;
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) { //(connect, monitor) {

  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    isOver: monitor.isOver()
  };
}



/**
 * componente real
 */
var uploaderBlock = React.createClass({	//monitor.getDropResult()

	render: function () {

		var self = this;

		var isOver = this.props.isOver;
    var canDrop = this.props.canDrop;

		var classes = classNames({
			'uploaderBlock' : true,
			'highlighted': canDrop && !this.props.disabled,
      		'hovered': isOver && !this.props.disabled
		});


		/*

		{!isOver && !canDrop && 'Drag files from the hard drive'}
		        {!isOver && canDrop && 'Drag the files here'}
		        {isOver && 'Drop the files'}
		        
		*/

		return this.props.connectDropTarget(

			<div className={classes}>

		        {this.props.children}

		  </div>

		);
	}
});


/**
 * Componemos el componente dandole las capacidades descritas
 */


uploaderBlock = DropTarget(HTML5Backend.NativeTypes.FILE, fileTarget, collect)(uploaderBlock);

module.exports = DragDropContext(HTML5Backend)(uploaderBlock);