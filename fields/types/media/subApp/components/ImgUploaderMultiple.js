var React = require('react');
var _ = require('lodash');
var HTML5Backend = require('react-dnd-html5-backend');
var DragDropContext = require('react-dnd').DragDropContext;

var UploaderBlock = require('./UploaderBlock.js');
var ButtonFileInput = require('./ButtonFileInput.js');


var File = require('./File.js');
var Upload = require('./Upload.js');
var FileHolder = require('./FileHolder.js');


import {
  
  Grid,
  Button
} from '../../../../../admin/client/App/elemental';


var ImgUploaderMultiple = React.createClass({	//monitor.getDropResult()


  displayName: "ImgUploader",
  /*
  guid: function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  },*/

  getInitialState: function(){

    return {

      uploads : []
    }
  },
  /*
  componentDidMount: function(){

    var self = this;

    if(window.FormData !== undefined){


      this.reader = new FileReader();
      
      this.reader.onload = function (e) {

        self.setState({img : e.target.result})
      }
    }
  },*/

  uploadFiles: function(files){

    //console.log("UPLOAD files ", files)

    /*
    if(window.FormData !== undefined){

      this.reader.readAsDataURL(files[0]);
    }*/

    var uploads = this.state.uploads;


    _.each(files, function(file){

      uploads.push(file);

    });
    

    this.setState({uploads : uploads});
  },

  uploadFilesManual: function(e, files){

    //console.log("UPLOAD files manual", files, e)

    this.uploadFiles(files);
  },

  uploaded: function(index){

    var self = this;

    return function(id){

      //console.log(">>>>>>>>> ",id)

      //# remove upload at index
      //var uploads = _.reject(self.state.uploads, function(file, i){ return i == index});

      var uploads = self.state.uploads;

      delete uploads[index];

      self.setState({uploads : uploads});

      //# trigger change of img list with the new path added
      var files = self.props.value;

      files.push(id); //index ??????

      if(self.props.onChange) self.props.onChange(files);
    }
  },

  deleteFile: function(id){

    var self = this;

    if(self.props.onChange){

      var files = self.props.value;

      files = _.reject(files, function(i){

        return i == id
      })

      //console.log(files);
      self.props.onChange(files);
    } 
  },

  changeOrder: function(indexFrom, indexTo){

    var self = this;
    /*
    var move = function (old_index, new_index) {

        while (old_index < 0) {
            old_index += this.length;
        }
        while (new_index < 0) {
            new_index += this.length;
        }
        if (new_index >= this.length) {
            var k = new_index - this.length;
            while ((k--) + 1) {
                this.push(undefined);
            }
        }
        this.splice(new_index, 0, this.splice(old_index, 1)[0]);
        return this; // for testing purposes
    };*/

    function moveObjectAtIndex(array, sourceIndex, destIndex) {

        var placeholder = {};
        // remove the object from its initial position and
        // plant the placeholder object in its place to
        // keep the array length constant
        var objectToMove = array.splice(sourceIndex, 1, placeholder)[0];
        // place the object in the desired position
        array.splice(destIndex, 0, objectToMove);
        // take out the temporary object
        array.splice(array.indexOf(placeholder), 1);
    }

    if(self.props.onChange){

      var files = self.props.value;

      moveObjectAtIndex(files, indexFrom, indexTo);
      /*
      var temp = files[index1];
      files[index1] = files[index2];
      files[index2] = temp;*/

      self.props.onChange(files);
    } 
  },

	render: function () {

    var self = this;

    var files = [];


    //# uploaded
    _.each(this.props.value, function(id, index){

      files.push(

        <Grid.Col key={id} small="one-half" medium="one-third" large="one-quarter">

          <FileHolder index={index} onChangeOrder={self.changeOrder}>
            <File id={id} index={index} onDelete={self.deleteFile} path={self.props.path} model={self.props.model} many={true} dragable/>
          </FileHolder>

        </Grid.Col>

      );

    });

    //# uploading...
    _.each(this.state.uploads, function(file, index){

      if(file){

        files.push(

          <Grid.Col key={"upload_"+index}  small="one-half" medium="one-third" large="one-quarter">

            <Upload upload={file} onEnd={self.uploaded(index)}/>

          </Grid.Col>
          
        );

      }

    });


		return (

      <div className="ImgUploader">

        <UploaderBlock onSuccess={this.uploadFiles}>

          <div className="ImgUploader__header">

            <span className="ImgUploader__header_text"> Arrastra archivos aquí </span>

            <span className="ImgUploader__header_or">o</span>

            {/*<ButtonFileInput className="btn btn-default" onChangeFile={this.uploadFilesManual}>
              Selecciona
            </ButtonFileInput>
          */}
            <Button component={ButtonFileInput} size="small" onChangeFile={this.uploadFilesManual}>Subir</Button>
            {/*&nbsp;&nbsp;
            <Button size="small">Importar desde Librería</Button>*/}

          </div>


          <Grid.Row gutter="16">
            {files}
          </Grid.Row>

        </UploaderBlock>

        <style>{require('./css.js').default}</style>

      </div>

		);
	}
});

var ImgUploaderMultiple = DragDropContext(HTML5Backend)(ImgUploaderMultiple);



module.exports = ImgUploaderMultiple;