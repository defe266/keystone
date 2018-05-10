import React, { Component } from 'react';
import unionClassNames from 'union-class-names';


//import DraftToolsDropdownButton from '../../Utils/DraftToolsDropdownButton';

//import Icon from 'app/components/Icon';


export default React.createClass({

    getInitialState: function  () {
      
      return  {

        open : false
      }
    },

    onToggle (newState){
      
      this.setState({open : newState})
    },

    insertUrl(color){

    },

    preventBubblingUp: (event) => { event.preventDefault(); },

    render() {
      const theme = this.props.theme;
      const className = theme.button;//this.isActive() ? unionClassNames(theme.button, theme.active) : theme.button;

      /*
      var icon = (
        <svg width='24' height='24' viewBox='0 0 24 24'>
              <path d='M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.71-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z' fill='currentColor' fillRule='evenodd' />
        </svg>
      )*/

      return (
        <div
          className={theme.buttonWrapper}
          onMouseDown={this.preventBubblingUp}
        >
            <div className="Draft-AnchorButton">
              L
              {/*<DraftToolsDropdownButton className={className} title={"link"} id="Anchor insert" open={this.state.open} onToggle={this.onToggle}>

                    <input type="text" className="form-control"/>

              </DraftToolsDropdownButton>*/}
            
		  	    </div>


        </div>
      );
    }
})