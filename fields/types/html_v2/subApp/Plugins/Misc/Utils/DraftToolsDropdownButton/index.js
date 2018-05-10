import React, { Component } from 'react';

import DropdownButton from 'react-bootstrap/lib/DropdownButton';

import './index.css'

export default class DraftToolsDropdownButton extends Component {

    render() {

      const props = this.props

      return (
        <div className="DraftToolsDropdownButton">
          <DropdownButton {...props} noCaret>
              
              {props.children}

          </DropdownButton>
        </div>
      );
    }
}