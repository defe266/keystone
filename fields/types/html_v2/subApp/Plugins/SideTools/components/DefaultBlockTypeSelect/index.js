import React from 'react';
/*
import {
  HeadlineOneButton,
  HeadlineTwoButton,
  BlockquoteButton,
  CodeBlockButton,
  UnorderedListButton,
  OrderedListButton,
} from 'draft-js-buttons'; // eslint-disable-line import/no-unresolved
*/

//import ImageButton from '../Buttons/Image.js';
//import HRButton from '../../../Misc/HRButton';

import BlockTypeSelect from '../BlockTypeSelect';

const DefaultBlockTypeSelect = (structure) => {

  return ({ getEditorState, setEditorState, theme }) => (
    <BlockTypeSelect
      getEditorState={getEditorState}
      setEditorState={setEditorState}
      //theme={theme}
      structure={structure}/>
  );
}

export default DefaultBlockTypeSelect;




