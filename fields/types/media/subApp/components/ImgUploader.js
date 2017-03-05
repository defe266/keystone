var React = require('react');
var _ = require('lodash');
var request = require('superagent');

var UploaderBlock = require('./UploaderBlock.js');
var ButtonFileInput = require('./ButtonFileInput.js');

var File = require('./File.js');
var Upload = require('./Upload.js');

import {
  
  Button

} from '../../../../../admin/client/App/elemental';


var ImgUploader = React.createClass({ //monitor.getDropResult()


  displayName: "ImgUploader",
  

  getInitialState: function(){

    return {

      upload : null
    }
  },

  uploadFiles: function(files){

    if(this.props.file){

      if(window.confirm("¿Seguro que quieres sustituir el archivo?")){

        this.setState({upload : files[0]});
      }

    }else{

      this.setState({upload : files[0]});
    }
 
  },

  uploadFilesManual: function(e, files){

    //console.log("UPLOAD files manual", files, e)

    this.uploadFiles(files);
  },

  uploaded: function(file){

    var self = this;

    //# si existía, la eliminamos
    if(this.props.file){

      //# Request
      request
      .post(Keystone.adminPath + '/api/uploads/'+this.props.file+'/delete')
      //.set('auth', this.props.token)
      .end(function(err, res){

          //if(err) return alert('No se ha podido eliminar')

          if(err) console.error('No se pudo eliminar la imagen anterior');

          if(self.props.onChange) self.props.onChange(file);

          self.setState({upload : null});
      });

    }else{


      if(self.props.onChange) self.props.onChange(file);

      self.setState({upload : null});
    }

  },

  deleteFile: function(id){

    //console.log(files);
    if(this.props.onChange) this.props.onChange(null);
  },

  render: function () {

    var self = this;

    if(this.props.file){

      var file = <File id={this.props.file} path={self.props.path} model={self.props.model} onDelete={self.deleteFile}/>;
    }

    if(this.state.upload){

      var file = <Upload upload={this.state.upload} onEnd={self.uploaded}/>
    }

    return (

      <div className="ImgUploader ImgUploader__individual">

        <UploaderBlock onSuccess={this.uploadFiles}>

          <div className="ImgUploader__header">

            <span className="ImgUploader__header_text"> Arrastra archivos aquí </span>

            <span className="ImgUploader__header_or">o</span>


            <Button component={ButtonFileInput} size="small" onChangeFile={this.uploadFilesManual}>Subir</Button>

          </div>


          <div>
            {file}
          </div>

        </UploaderBlock>

        <style>{require('./css.js').default}</style>

      </div>

    );
  }
});


module.exports = ImgUploader;