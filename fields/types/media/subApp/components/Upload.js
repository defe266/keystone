var React = require('react');
var request = require('superagent');

var ProgressBar = require('./ProgressBar.js');



var Upload = React.createClass({  //monitor.getDropResult()

  displayName: "Upload",

  getInitialState: function(){

    return {

      url : (this.props.url) ? this.props.url : '',
      percent: 0
    }
  },

  componentDidMount: function(){

    var self = this;



    if(window.FormData !== undefined){

      this.reader = new FileReader();
      
      this.reader.onload = function (e) {

        self.setState({url : e.target.result})
      }
      
    }

    if(this.props.upload){

      //#preview
      this.reader.readAsDataURL(this.props.upload);


      //#upload...

      var formData = new FormData();
            
      formData.append('file', this.props.upload);

      request
      //.post(sd.API_URL+"/uploads")
      .post(Keystone.adminPath + '/api/uploads/create')
      //.set('auth', this.props.token)
      .send(formData)
      .on('progress', function(e) {

          //e.percent

          self.setState({percent : e.percent});
          
      })
      .end(function(err, res){
  
          //if(err) return done(err);

          //deferred.resolve(res);

          if(self.props.onEnd) self.props.onEnd(res.body.id);
      });

    }

  },

  render: function(){

    var state = this.state;

    return (

      
        <div className={'ImgUploader__item uploading'}>

          <div className="ImgUploader__item_img" style={{"backgroundImage" : "url("+state.url+")"}}></div>

          <ProgressBar now={state.percent} />

        </div>

    )
  }
});


module.exports = Upload;