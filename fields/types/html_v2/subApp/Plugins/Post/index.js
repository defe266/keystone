//import decorateComponentWithProps from 'decorate-component-with-props';
//import addImage from './modifiers/addImage';
import addPost from './addPost';
import PostComponent from './Post';
//import imageStyles from './imageStyles.css';

/*
const defaultTheme = {
  image: imageStyles.image,
};*/

import './index.css';

export default (config = {}) => {
  /*
  const theme = config.theme ? config.theme : defaultTheme;
  let Image = config.PostComponent || ImageComponent;
  */

  let Post = PostComponent;

  if (config.decorator) {
    Post = config.decorator(Post);
  }

  //const ThemedPost = decorateComponentWithProps(Post, { theme });

  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();
        if (type === 'post') {
          return {
            component: Post,//ThemedImage,
            editable: false,
          };
        }
      }

      return null;
    },

    addPost: addPost,
  };
};

export const Post = PostComponent;