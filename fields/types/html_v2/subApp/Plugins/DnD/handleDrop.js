import { EditorState, SelectionState } from 'draft-js';
import addBlock from './modifiers/addBlock';
import removeBlock from './modifiers/removeBlock';
import { DRAFTJS_BLOCK_KEY } from './constants';
import $ from 'jquery';

export default (config) => {

  // Get upload function from config or editor props
  const {
    handleExternalDrop,
  } = config;

  return (
    selection,
    dataTransfer,
    isInternal,
    { getEditorState, setEditorState }
  ) => {
    const editorState = getEditorState();

    
    // Get data 'text' (anything else won't move the cursor) and expecting kind of data (text/key)
    const raw = dataTransfer.data.getData('text');
    const data = raw ? raw.split(':') : [];

    
    //#! Fix para quitar highlight de DnD
    $('.public-DraftStyleDefault-block--dragOver').removeClass('public-DraftStyleDefault-block--dragOver')



    if (data.length !== 2) {

      return handleExternalDrop(dataTransfer, editorState, selection, setEditorState);

      //return undefined;
    }

    // Existing block dropped
    if (data[0] === DRAFTJS_BLOCK_KEY) {
      const blockKey = data[1];

      // Get content, selection, block
      const contentState = editorState.getCurrentContent();
      const block = contentState.getBlockForKey(blockKey);
      const entity = contentState.getEntity(block.getEntityAt(0));
      const contentStateAfterInsert = addBlock(
        editorState,
        selection,
        block.getType(),
        entity.data,
        entity.type
      );


      const contentStateAfterRemove = removeBlock(contentStateAfterInsert, blockKey);

      // force to new selection
      const newSelection = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: 0,
      });
      const newState = EditorState.push(editorState, contentStateAfterRemove, 'move-block');
      setEditorState(EditorState.forceSelection(newState, newSelection));

    }else{

      return handleExternalDrop(dataTransfer, editorState, selection, setEditorState);
    }

    return 'handled';
  };

}