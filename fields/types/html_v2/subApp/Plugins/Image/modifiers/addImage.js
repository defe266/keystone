import {
  EditorState,
  AtomicBlockUtils,
} from 'draft-js';

export default (editorState, url) => {
  const urlType = 'image';
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', { 
    preview: url,
    imageId: null,
    loading: 0
  });
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
