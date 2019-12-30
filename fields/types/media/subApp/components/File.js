var React = require('react');
var request = require('superagent');
var DragSource = require('react-dnd').DragSource;
//var ButtonLoader = require('./buttonLoader.js');


import {
  Button,
  Glyph,
  LoadingButton
} from '../../../../../admin/client/App/elemental';



var File = React.createClass({  //monitor.getDropResult()

  displayName: "File",

  getInitialState: function(){

    return {

      deleteLoading : false
    }
  },

  deleteFile: function(){

    var self = this;

    if(window.confirm("¿Seguro que quieres quitar el archivo de la galería?")){

      /*
      this.setState({deleteLoading : true});

      //# Request
      request
      .post(Keystone.adminPath + '/api/'+props.model.toLowerCase()+'s/'+this.props.id+'/delete')
      //.set('auth', this.props.token)
      .end(function(err, res){

          self.setState({deleteLoading : false});

          if(err) return alert('No se ha podido eliminar')

          if(self.props.onDelete) self.props.onDelete(self.props.id);
      });*/

      if(self.props.onDelete) self.props.onDelete(self.props.id);
      
    }    

    
  },

  viewFileMeta: function(){

  },

  render: function(){

    var state = this.state;
    var props = this.props;

    var url = "/uploads/"+props.id//+'/:/rs=w:200,h:200,m/cr=w:200,h:200'

    //console.log('this',this)

    var connectDragSource = this.props.connectDragSource;


    var output = (

      <div className={'ImgUploader__item'}>

        <div className="ImgUploader__item_img" style={{"backgroundImage" : "url("+url+")"}}></div>

        <div className="ImgUploader__item_tools">

          {/*<ButtonLoader loading={state.deleteLoading} className="btn btn-link" onClick={this.deleteFile} hideOnLoading><i className="fa fa-trash-o"/></ButtonLoader>*/}

          <Button color="primary" variant="link" href={"/keystone/"+props.model.toLowerCase()+"s/"+props.id} target="_blank">{/*onClick={this.viewFileMeta}*/}
            <Glyph name="pencil"/>
          </Button>

          <LoadingButton color="danger" variant="link" loading={props.loading} disabled={props.loading} onClick={this.deleteFile}>
            <Glyph name="x"/>
          </LoadingButton>


          


        </div>


        <input type="hidden" name={props.path + (props.many ? '[]' : '')} value={props.id}/>

      </div>
    )

    if(props.dragable) return connectDragSource(output);


    return output;
  }

});



//# hago File dragable, para el D&D de orden
File = module.exports = DragSource('FILE', {
  
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
    
})(File);


module.exports = File;