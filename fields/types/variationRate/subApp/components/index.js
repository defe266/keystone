import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor';


import Field from './Field';


var App = React.createClass({
 
  componentDidMount () {
    
  },
  

  render() {

    const props = this.props;
    const variations = props.variations && props.variations.length > 0 ? props.variations : [];
    const rates = props.rates;


    if(variations.length == 0) return <span>Crea Algunas variaciones primero</span>

    var css_base = css({

      'marginBottom': '30px;'

    })


    var css_table = css({

      '& th, & td,': {

        border: '2px solid #ddd'
      }

    })

    var css_tableLabel = css({

      background: "#eee",
      fontWeight: "bold !important",
      color: '#333333 !important'

    })

    var css_tableLabelRow = css({

      //borderRight: "2px solid rgba(0,0,0,0.06)"
      'textAlign' : 'right',
      'padding': '.66em !important'

    })

    var css_tableCell = css({

      padding: '0 !important',
      

    })


    return (

      <div className={css_base}> 

        
        <table cellPadding="0" cellSpacing="0" className="Table" {...css_table}>{/* cellPadding="0" cellSpacing="0" className="Table ItemList"*/}



          <thead>
            <tr>

              <th className={css_tableLabel}></th>

              {variations.map((v, index) => {

                return <th className={css_tableLabel}>{v != '' || index != 0 ? v : 'Precio'}</th>
              })}
            </tr>
          </thead>

        
          <tbody>

       

                  <tr>

                    <td className={ css(css_tableLabel,css_tableLabelRow) }>
                          Valores
                    </td>


                    {variations.map((v) => {

                      return (

                        <td  className={css_tableCell}>
                          
                            <Field path={props.path} variation={v} rates={rates}/>

                        </td>
                      )

                    })}
                  </tr>
  

          </tbody>
        </table>
        
      </div>

    )
  }
});

export default connect((state) => {

  return {

    variations: state.parent.variations,
    rates: state.rates,
    path: state.path
  }

})(App)