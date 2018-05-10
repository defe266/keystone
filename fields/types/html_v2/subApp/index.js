import React from 'react';
import classnames from 'classnames';
import _ from 'lodash'
import {stateToHTML} from 'draft-js-export-html';
//import $ from 'jquery';


//import createFocusPlugin from 'draft-js-focus-plugin';

//import createResizeablePlugin from './Plugins/Resizeable';
//import createBlockDndPlugin from './Plugins/DnD';


//import createAlignmentPlugin from './Plugins/Alignment';

import createImagePlugin, {ImageButton} from './Plugins/Image';

import createInlineToolbarPlugin, { Separator } from './Plugins/InlineTools';
import createSideToolbarPlugin from './Plugins/SideTools';
//import createPostPlugin from './Plugins/Post';
//import createProfilePlugin from './Plugins/Profile';
//import createGraphicPlugin from './Plugins/Graphic';
//import createLinkPlugin, { LinkButton } from './Plugins/Link';
import createMiscPlugin, { SizeUpButton, SizeDownButton, AnchorButton } from './Plugins/Misc';// HRButton,  ColorButton,



import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  //CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  //UnorderedListButton,
  //OrderedListButton,
  BlockquoteButton,
  //CodeBlockButton,
} from 'draft-js-buttons';

/* estaba ya quitado??
import {
  AddLinkButton,
  AddColorButton
} from 'draft-js-buttons-plugin'
*/

import {EditorState, ContentState, convertFromHTML} from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
//import Editor from 'draft-js-plugins-editor';


//import 'draft-js-focus-plugin/lib/plugin.css' 


//import 'draft-js/dist/Draft.css' -> cargamos copiado al js x ahora
//import './index.css' -> cargamos copiado al js x ahora (main.js)

/*




//# inicializo los plugins
const focusPlugin = createFocusPlugin({});
const resizeablePlugin = createResizeablePlugin({});
*/
/*
const blockDndPlugin = createBlockDndPlugin({

  handleExternalDrop: (dataTransfer, editorState, selection, setEditorState) => {
   
   const type = dataTransfer.data.getData('type')

   switch(type){

    case 'post': 
                  var data = JSON.parse(dataTransfer.data.getData('data'))

                  var newState = postPlugin.addPost(editorState, data, selection);

                  setEditorState(newState)

                  return 'handled';

                  break;

    case 'profile': 
                  var data = JSON.parse(dataTransfer.data.getData('data'))

                  var newState = profilePlugin.addProfile(editorState, data, selection);

                  setEditorState(newState)

                  return 'handled';

                  break;

    case 'graphic': 
                  var data = JSON.parse(dataTransfer.data.getData('data'))

                  var newState = graphicPlugin.addGraphic(editorState, data, selection);

                  setEditorState(newState)

                  return 'handled';

                  break;
   }

   return 'not-handled';

  }
});*/

const inlineToolbarPlugin = createInlineToolbarPlugin({
  /*
  theme: { 

    buttonStyles: {
      "buttonWrapper" : "buttonWrapper",
      "button": "button",
      "active": "active",
    },
    toolbarStyles :{
      "toolbar" : "toolbar"
    }
  },*/

  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    //SizeDownButton,
    //SizeUpButton,
    //ColorButton,
    AnchorButton,
    Separator,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    //BlockquoteButton,
  ]
});

const sideToolbarPlugin = createSideToolbarPlugin({
  buttons: [
   
    ImageButton,
    //LinkButton,
   // HRButton,
  ]
});
/*
const alignmentPlugin = createAlignmentPlugin({
  defaultAlignment: 'center'
});


*/

const decorator = composeDecorators(
  //focusPlugin.decorator,
  //resizeablePlugin.decorator,
  //alignmentPlugin.decorator,
  //blockDndPlugin.decorator
);

/*
const decoratorFocusAndDnD = composeDecorators(
  focusPlugin.decorator,
  //blockDndPlugin.decorator
);



const miscPlugin = createMiscPlugin({

  decorator : decoratorFocusAndDnD //# decorator para HR (basic blocks)

});*/

//const linkPlugin = createLinkPlugin({decorator});
const imagePlugin = createImagePlugin({decorator});
//const postPlugin = createPostPlugin({decorator});
//const profilePlugin = createProfilePlugin({decorator});
//const graphicPlugin = createGraphicPlugin({decorator});





const plugins = [
  //focusPlugin,
  //blockDndPlugin,
  //alignmentPlugin,
  //resizeablePlugin,
  inlineToolbarPlugin,
  imagePlugin,
  //postPlugin,
  //profilePlugin,
  //graphicPlugin,
  sideToolbarPlugin,
  //miscPlugin,
  //linkPlugin
];


//const { AlignmentTool } = alignmentPlugin;
const { InlineToolbar } = inlineToolbarPlugin;
const { SideToolbar } = sideToolbarPlugin;


export default React.createClass({
  /*
  dragOver(e) {

    var $target = $(e.target);

    //console.log($(e.target).hasClass('public-DraftStyleDefault-block'))

    var canDrop = $target.hasClass('public-DraftStyleDefault-block')

    //# si no es un padre válido comprobamos si es un hijo con padre válido
    if(!canDrop){

      var closestParent = $target.closest('.public-DraftStyleDefault-block')

      if(closestParent){

        canDrop = true;
        $target = closestParent;
      }

    }

    //# Borramos áreas anteriores y destacamos la actual
    if(canDrop){

      $('.public-DraftStyleDefault-block--dragOver').removeClass('public-DraftStyleDefault-block--dragOver')

      $target.addClass('public-DraftStyleDefault-block--dragOver')
    }

  },*/

  getInitialState: function () {



    if(this.props.defaultValue){

      const blocksFromHTML = convertFromHTML(this.props.defaultValue);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );

      var value = EditorState.createWithContent(state);
      var valueHTML = this.props.defaultValue;

    }else{

      var value = EditorState.createEmpty();
      var valueHTML = '';
    }

    return {

      value: value,
      valueHTML: valueHTML,
      view: 'render'
    }

  },

  componentWillMount: function(){

      this.changeHTML_debounced = _.debounce(this.changeHTML, 200);
      this.changeViewFromCode_debounced = _.debounce(this.changeViewFromCode, 200);
      
  },

  change: function (editorState) {

    this.setState({value : editorState});

    this.changeHTML_debounced(editorState);
  },

  changeHTML: function(editorState){

    var string = stateToHTML(editorState.getCurrentContent())

    this.setState({valueHTML : string});

    this.props.onChange(string);
  },

  changeFromCode: function(e){

    var string = e.target.value;

    this.setState({valueHTML : string});

    this.changeViewFromCode_debounced(string);
  },

  changeViewFromCode: function(htmlValue){

    const blocksFromHTML = convertFromHTML(htmlValue);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    var value = EditorState.createWithContent(state);

    this.change(value);
  },

  changeTab: function(view){

    this.setState({view});
  },

  render: function() {


    const props = this.props
    const view = this.state.view
    //console.log("2",props.data)

    const classes = classnames({

      "DraftCanvas": true,
      "DraftCanvas__readOnly": props.readOnly,

    });


    return (

      <div className={classes} onDragOver={this.dragOver}>
        {/*}
        <button onClick={::this.addImage}>Add image</button>
        <button onClick={::this.addPost}>Add post</button>
        <button onClick={::this.addGraphic}>Add graphic</button>
        <button onClick={::this.addHR}>Add HR</button>
        */}

        <div className={'DraftCanvas__tab '+(view == 'render' ? 'DraftCanvas__tab--selected' : '')} onClick={(e) => this.changeTab('render')}>render</div>
        <div className={'DraftCanvas__tab '+(view == 'code' ? 'DraftCanvas__tab--selected' : '')} onClick={(e) => this.changeTab('code')}>code</div>

        <div className={'DraftCanvas__panel '+(view == 'render' ? 'DraftCanvas__panel--selected' : '')}>
          <Editor
            ref={(element) => { this.editor = element; }}
            editorState={this.state.value}
            onChange={this.change}
            placeholder="Write here..."
            plugins={plugins} 
            readOnly={props.readOnly}/>


            {!props.readOnly ? 


              <div>
                <div className="clearfix"/>

                {/*<div className="DraftCanvas__AlignmentTool__container">
                  <AlignmentTool/>
                </div>*/}

                <div className="DraftCanvas__InlineToolbar__container">
                  <InlineToolbar />
                </div>

                
                <div className="DraftCanvas__SideToolbar__container">
                  <SideToolbar />
                </div>

              </div>

            :null}
        </div>

        <div className={'DraftCanvas__panel '+(view == 'code' ? 'DraftCanvas__panel--selected' : '')}>
          <textarea className="DraftCanvas__code" type="text" value={this.state.valueHTML} name={props.name} onChange={this.changeFromCode}/>
        </div>

        

        


          <style>{require('./styles/Draft.js').default}</style>
          <style>{require('./styles/main.js').default}</style>
          <style>{require('./Plugins/InlineTools/css.js').default}</style>
          <style>{require('./Plugins/SideTools/css.js').default}</style>
          
          
        

      </div>

    );
  }
})