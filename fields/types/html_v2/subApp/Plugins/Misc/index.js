//import decorateComponentWithProps from 'decorate-component-with-props';
//import addImage from './modifiers/addImage';
import { EditorState, SelectionState } from 'draft-js';
//import addHR from './addHR';
//import HRComponent from './HRComponent';
//import imageStyles from './imageStyles.css';

import colorStyleMap from './Buttons/ColorButton/colorStyleMap'
import fontStyleMap from './fontStyleMap'


//import './index.css';

export default (config = {}) => {
  /*

  let HR = HRComponent;

  if (config.decorator) {
    HR = config.decorator(HR);
  }*/


  return {

    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();
        /*
        if (type === 'hr') {
          return {
            component: HR,//ThemedImage,
            editable: false,
          };
        }*/
      }

      return null;
    },

    customStyleMap: Object.assign({},fontStyleMap, colorStyleMap),

 

    //# handle custom remove for atomic elements
    handleKeyCommand: (command, editorState, options) => {


      //# control para enter contando con elementos atómicos (excluir operación)
      if(command == 'split-block'){

        const selection = editorState.getSelection();
        const content = editorState.getCurrentContent();
        const selectionKey = selection.getFocusKey();
        const currentBlock = content.getBlockForKey(selectionKey);

        if(currentBlock.getType() == 'atomic'){

          return 'handled';
        }
      }

      //# control para eliminar contando con elementos atómicos
      if(command == 'backspace'){

        const selection = editorState.getSelection();
        const content = editorState.getCurrentContent();
        const selectionKey = selection.getFocusKey();
        const currentBlock = content.getBlockForKey(selectionKey);
//debugger;
        if(currentBlock.getType() == 'atomic'){

          const blockBefore = content.getBlockBefore(selectionKey);
          const blockAfter = content.getBlockAfter(selectionKey);

          //# not before and not after -> reset all
          if(!blockBefore && !blockAfter){

            var newEditorState = EditorState.createEmpty()

          }else{//# have before or after -> remove current and select before in last position or after in fist

            const blockMap = content.getBlockMap().delete(currentBlock.getKey());

            var withoutAtomicBlock = content.merge(
                  {blockMap},//, selectionAfter: selection
            );

            var newEditorState = EditorState.push(editorState, withoutAtomicBlock,'remove-range');

            
            if(blockBefore){

              var newSelection = new SelectionState({
                    anchorKey: blockBefore.key,
                    anchorOffset: blockBefore.getLength(),
                    focusKey: blockBefore.key,
                    focusOffset: blockBefore.getLength(),
              });

            }else{ //not before -> select after

               var newSelection = new SelectionState({
                    anchorKey: blockAfter.key,
                    anchorOffset: 0,
                    focusKey: blockAfter.key,
                    focusOffset: 0,
              });
            }
            

            newEditorState = EditorState.forceSelection(newEditorState, newSelection);

          }

          options.setEditorState(newEditorState);




          return 'handled';
        }
      

        
      }

      

      
      return 'not-handled';
    },

    //#!!! debería haber un decorator que metiera readOnly (ahroa se está haciendo en DnD pero tendría más sentido aquí xk es un plugin general)

    //addHR: addHR,

  };
};

//export const HR = HRComponent;

//export {default as HRButton} from './Buttons/HRButton';
//export {default as ColorButton} from './Buttons/ColorButton';
export {default as SizeUpButton} from './Buttons/SizeUpButton';
export {default as SizeDownButton} from './Buttons/SizeDownButton';
export {default as AnchorButton} from './Buttons/AnchorButton';