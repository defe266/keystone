import decorateComponentWithProps from 'decorate-component-with-props';
import createStore from './utils/createStore';
import Toolbar from './components/Toolbar';
import DefaultBlockTypeSelect from './components/DefaultBlockTypeSelect';

//import './index.css';

export default (config = {}) => {

  var buttons = config.buttons || [];

  

  //const defaultTheme = { buttonStyles, blockTypeSelectStyles, toolbarStyles };

  //# al no usar postCss como el plugin original, ajustamos así para que funcione
  const defaultTheme = { 
    /*
    buttonStyles: {
      buttonWrapper: 'buttonWrapper',
      button: 'button',
      active: 'active',
      separator: 'separator',
    },
    blockTypeSelectStyles: {
      blockType: 'blockType',
      spacer:'spacer',
      spacer:'popup'
    },
    toolbarStyles :{
      wrapper: 'wrapper'
    }*/
  };

  const store = createStore({
    isVisible: false,
  });

  const {
    theme = defaultTheme,
    structure = [
      DefaultBlockTypeSelect(buttons)
    ]
  } = config;

  const toolbarProps = {
    store,
    structure,
    theme,
  };

  return {
    initialize: ({ setEditorState, getEditorState, getEditorRef }) => {
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
      store.updateItem('getEditorRef', getEditorRef);
    },
    // Re-Render the toolbar on every change
    onChange: (editorState) => {
      store.updateItem('editorState', editorState);
      return editorState;
    },
    SideToolbar: decorateComponentWithProps(Toolbar, toolbarProps),
  };
};
