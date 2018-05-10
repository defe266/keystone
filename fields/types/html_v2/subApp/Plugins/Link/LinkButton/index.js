import React, { Component } from 'react';
import unionClassNames from 'union-class-names';

import {
  EditorState,
  AtomicBlockUtils,
} from 'draft-js';

import add from '../add';
//import add from '../../Image/modifiers/addImage';




import Icon from 'app/components/Icon';
import LinkModal from './LinkModal';

import './index.css'

export default class HRButton extends Component {

    state = { showModal: false }
    

    closeModal() {


      this.setState({ showModal: false });
    }

    openModal() {

      
      this.setState({ showModal: true });
    }

	  insert (preview) {//event event.preventDefault();
      
      var editorState = this.props.getEditorState();

      var newEditorState = add(editorState, preview);
      //var newEditorState = add(editorState, "https://i.ytimg.com/vi/ReF6iQ7M5_A/maxresdefault.jpg");
      //var newEditorState = add(this.editorState, {"image":"https://ep01.epimg.net/iconos/v1.x/v1.0/promos/promo_og_elpais.png","favicon":"https://ep01.epimg.net/favicon.png","created":"2017-05-16T16:23:54Z","domain":"elpais.com","isvalid":true,"originalURL":"http://elpais.com/","title":"EL PAÍS","lang":"es","published_date":null,"url":"http://elpais.com/","content":"Noticias de última hora sobre la actualidad en España y el mundo: política, economía, deportes, cultura, sociedad, tecnología, gente, opinión, viajes, moda, televisión, los blogs y las firmas de EL PAÍS. Además especiales, vídeos, fotos, audios, gráficos, entrevistas, promociones y todos los servicios de EL PAÍS."})
      
      this.props.setEditorState(newEditorState);
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    render() {

      const { theme } = this.props;
      const className = theme.button;//this.isActive() ? unionClassNames(theme.button, theme.active) : theme.button;
      return (
        <div
          className={theme.buttonWrapper}
          onMouseDown={this.preventBubblingUp}
        >
          <button
            className={className}
            onClick={::this.openModal}
            type="button"
          >
        
		      	<Icon name='link'/>

          </button>


          <LinkModal show={this.state.showModal} onHide={::this.closeModal} onInsert={::this.insert}/>

        </div>
      );
    }
}