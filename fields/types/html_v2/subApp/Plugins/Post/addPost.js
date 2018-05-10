import addBlock from '../Misc/modifiers/addBlock';

import {
  EditorState,
  //AtomicBlockUtils,
} from 'draft-js';

export default (editorState, data, selection) => {

  /*
  const type = 'post';
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', {data : data});
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' '
  );

  return newEditorState;
  */



  const newEditorState = addBlock(
    editorState,
    selection ? selection : editorState.getSelection(),
    'atomic',
    {data : data},
    'post'
  );

  const newState = EditorState.push(editorState, newEditorState, 'insert-block');
  

  return newState
  

  /*
  return EditorState.forceSelection(
    newEditorState,
    editorState.getCurrentContent().getSelectionAfter()
  );*/
};