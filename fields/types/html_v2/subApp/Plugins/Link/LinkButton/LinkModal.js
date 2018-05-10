import React, { Component } from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';

import preview_get from 'app/actions/reports/preview_get'
import preview_reset from 'app/actions/reports/preview_reset'

import ReportsEditorStore from 'app/stores/ReportsEditorStore'

import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import LinkPreview from 'app/views/Parts/LinkPreview';
var LoaderStandar = require('app/views/Parts/LoaderStandar');
var Result = require('app/views/Parts/Result');



class LinkModal extends Component {
  /*
    contextTypes = {

      executeAction: React.PropTypes.func.isRequired
    }*/

    state = { 

      text: '',

    }

    changeText(e){      

      this.setState({text : e.target.value})
    }

    search(){

      this.context.executeAction(preview_get, this.state.text)
    }

    insert(){

      this.props.onInsert(this.props.urlPreview);
      this.hide()
      
    }

    hide(){

      this.context.executeAction(preview_reset);
      this.setState({text : ''})
      this.props.onHide()
    }
    /*
    isValidURL(str) {
      var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
        '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
        '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
        '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
        '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
        '(\#[-a-z\d_]*)?$','i'); // fragment locater
      if(!pattern.test(str)) {
        
        return false;
      } else {
        return true;
      }
    }*/

    isValidURL(str) {
       var a  = document.createElement('a');
       a.href = str;
       return (a.host && a.host != window.location.host);
    }

    render() {

      //<input type="text" className="form-control"/>
      var text = this.state.text;
      var urlPreview = this.props.urlPreview;

      if(urlPreview === null) var notReady = <LoaderStandar/>
      if(urlPreview === false) var notReady = <Result.Error/>
      if(urlPreview === undefined) var notReady = <span/>

      return (
        
          <Modal className="LinkButton__LinkModal" show={this.props.show} onHide={::this.hide}>
            <Modal.Body>

              <div className="LinkButton__LinkModal__label">Insertar URL</div>

              <FormGroup>
                <InputGroup>
                  <FormControl type="text" value={text} onChange={::this.changeText}/>
                  <InputGroup.Button>
                    <Button bsStyle="primary" onClick={::this.search} disabled={!this.isValidURL(text)}>Buscar</Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>


              {notReady ? notReady :

                <LinkPreview item={urlPreview}/>

              }
              
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-warning" onClick={::this.insert} disabled={!urlPreview}>Insertar</button>
              <button className="btn btn-default" onClick={::this.hide}>Cerrar</button>
            </Modal.Footer>
          </Modal>
        
      );
    }
}

LinkModal.contextTypes = {

  executeAction: React.PropTypes.func.isRequired
}


LinkModal = connectToStores( LinkModal, [ReportsEditorStore], (context, props) => {

    return {
      urlPreview: context.getStore(ReportsEditorStore).data.get('urlPreview')
    }

});

export default LinkModal;