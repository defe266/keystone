import React, { Component } from 'react';
import unionClassNames from 'union-class-names';

import {
  EditorState,
  //Entity,
  //AtomicBlockUtils,
} from 'draft-js';

//import change_imgBlock from 'app/actions/reports/change_imgBlock';

import addImage from './modifiers/addImage';

//import Icon from 'app/components/Icon';
//import ButtonFileInput from 'app/components/ButtonFileInput';



var ImageButton = React.createClass({


    componentDidMount(){

      if(window.FormData !== undefined){


        this.reader = new FileReader();
        
        this.reader.onload = (e) => {

          //# trigger change with stored file object && base64 file preview
          this.upload(this.file, e.target.result)

          //# reset file input -> ensure next onChange will be fired. Let reseting and reselecting same image from outside
          this.refs.fileButton.refs.fileInput.value = '' //reset();
        }
        
        
      }
    },

    changeFile(e, files){

      var self = this;

      if(window.FormData !== undefined){

        //# save file for later (reader.onload event)
        this.file = files[0];
        
        //# read preview -> listening result in reader.onload
        this.reader.readAsDataURL(files[0]);
      }
    },

    upload (file, preview) {//event
      /*
      this.context.executeAction(change_imgBlock, {
        file,
        preview,
        addImage: addImage,
        getEditorState: this.props.getEditorState,
        setEditorState: this.props.setEditorState
      })*/

      debugger;

      //event.preventDefault();

      /*
      //!!! Usar file para hacer una upload por ajax!!!

      
      
      var editorState = this.props.getEditorState();

      var newEditorState = addImage(editorState, preview)//"https://i.ytimg.com/vi/ReF6iQ7M5_A/maxresdefault.jpg"


      var contentState = newEditorState.getCurrentContent();
      var entityKey = contentState.getLastCreatedEntityKey();
      //var data = contentState.getEntity(entityKey).getData()

      

      this.props.setEditorState(newEditorState);
      
      var arr = [1,2,3,4,5,6,7,8,9,10]

      arr.map((i) => {

        setTimeout(() => {

          //#get
          var editorState = this.props.getEditorState();
          
          //#Update
          //Entity.mergeData(entityKey, {loading : 10*i});
          
          var contentState = editorState.getCurrentContent();
          var newContent = contentState.mergeEntityData(entityKey, {loading : 10*i})
          var newEditorState = EditorState.push(editorState, newContent, "activate-entity-data");//change-block-data
          
          //#Refresh
          var newEditorState = EditorState.forceSelection(editorState, editorState.getSelection());
          
          //#set
          this.props.setEditorState(newEditorState);

        },300*i)

      })
      
      
      */
      

  
      
    },


    preventBubblingUp: (event) => { event.preventDefault(); },

    render() {
      const { theme } = this.props;
      const className = theme.button;//this.isActive() ? unionClassNames(theme.button, theme.active) : theme.button;
      return (
        <div
          className={theme.buttonWrapper}
          onMouseDown={this.preventBubblingUp}
        >
          <button
            className={className}
            //onClick={::this.activate}
            //onClick={(e) => e.preventDefault()}
            type="button"
          >

            {/*<ButtonFileInput ref="fileButton" onChangeFile={::this.changeFile}>*/}
              IM
            {/*</ButtonFileInput>*/}
            
          </button>
        </div>
      );
    }
})


export default ImageButton