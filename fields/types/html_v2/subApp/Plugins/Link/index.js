//import decorateComponentWithProps from 'decorate-component-with-props';
//import addImage from './modifiers/addImage';
import add from './add';
import BlockComponent from './BlockComponent';
//import imageStyles from './imageStyles.css';



import './index.css';

export default (config = {}) => {
  /*
  const theme = config.theme ? config.theme : defaultTheme;
  let Image = config.PostComponent || ImageComponent;
  */

  let Comp = BlockComponent;

  if (config.decorator) {
    Comp = config.decorator(Comp);
  }

  //const ThemedPost = decorateComponentWithProps(Post, { theme });

  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();
        if (type === 'link_preview') {
          return {
            component: Comp,//ThemedImage,
            editable: false,
          };
        }
      }

      return null;
    },
    

    addGraphic: add,
  };
};

export const Link = BlockComponent;

export LinkButton from './LinkButton';