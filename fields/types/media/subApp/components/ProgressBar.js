var React = require('react');

var ProgressBar = React.createClass({  //monitor.getDropResult()

  displayName: "ProgressBar",

  render: function(){


    var style_bar = {

      width: this.props.now+'%',
    }

    return (

      
        <div className="ProgressBar">
          <div className="ProgressBar__bar" style={style_bar}/>
        </div>

    )
  }
});


module.exports = ProgressBar;