var React = require('react');
var _ = require('lodash');
var request = require('superagent');

var UploaderBlock = require('./UploaderBlock.js');
var ButtonFileInput = require('./ButtonFileInput.js');

var File = require('./File.js');
var Upload = require('./Upload.js');
var ModalLibraryBtn = require('./ModalLibraryBtn.js');

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

    if(this.props.value){

      //if(window.confirm("¿Seguro que quieres sustituir el archivo?")){

        this.setState({upload : files[0]});
     //}

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

    if(self.props.onChange) self.props.onChange(file);

    self.setState({upload : null});
    /*

    //# si existía, la eliminamos
    if(this.props.value){

      //# Request
      request
      .post(Keystone.adminPath + '/api/uploads/'+this.props.value+'/delete')
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
    }*/

  },

  addFromGallery: function(file){

    //if(window.confirm("¿Seguro que quieres sustituir el archivo?")){

      if(this.props.onChange) this.props.onChange(file);

    //}
  },

  deleteFile: function(id){

    //console.log(files);
    if(this.props.onChange) this.props.onChange(null);
  },

  uploadedAbort: function(file) {

    this.setState({upload : null});

  },

  render: function () {

    var self = this;
    

    if(this.props.value){

      var file = <File id={this.props.value} path={self.props.path} model={self.props.model} onDelete={self.deleteFile}/>;
    }

    if(this.state.upload){

      var file = <Upload upload={this.state.upload} sizeMax={self.props.sizeMax} onEnd={self.uploaded} onError={self.uploadedAbort}/>
    }

    return (

      <div className="ImgUploader ImgUploader__individual">

        <UploaderBlock onSuccess={this.uploadFiles}>

          <div className="ImgUploader__header">

            <span className="ImgUploader__header_text"> Arrastra archivos aquí </span>

            <span className="ImgUploader__header_or">o</span>


            <Button component={ButtonFileInput} size="small" onChangeFile={this.uploadFilesManual}>Subir</Button>
            &nbsp;&nbsp;
            <ModalLibraryBtn hiddenFiles={this.props.value ? [this.props.value] : []} onAdd={this.addFromGallery} single/>

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