import {
  EditorState,
  AtomicBlockUtils,
} from 'draft-js';

export default (editorState) => {//, data
  const type = 'hr';
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE');//, {data : data}
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' '
  );

  return newEditorState;
  
  /*
  return EditorState.forceSelection(
    newEditorState,
    editorState.getCurrentContent().getSelectionAfter()
  );*/
};