import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor';
import moment from 'moment';


//import seasons_post from '../../actions/rates_put'

import {
  Button,
  //FormInput,
  Grid,
  Glyph,
  //Alert,
  //Center,
  //Spinner
} from '../../../../../../admin/client/App/elemental';

import DateInput from '../../../../../components/DateInput';

import Field from './Field';


var Season = React.createClass({
  
  change(data){

    this.props.onChange( Object.assign({_id: this.props.item._id}, data) )
  },

  render() {

    const props = this.props;
    const item = props.item;
    const index = props.index;
    const variations = props.variations.length > 0 ? props.variations : [''];
    const minDays = props.minDays;
    const maxDays = props.maxDays;

    var days = [];

    for(var i = minDays; i <= maxDays; i++){

      days.push(parseInt(i));
    }


    var css_base = css({

      'marginBottom': '30px;'

    })

    var css_dates = css({

        border: '2px solid #ddd',
        background: '#EDEDED',
        'border-bottom': 'none',
        padding: '0.66em',
    })

    var css_removeBtn = css({

        float: 'right',
        marginTop: '5px',
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


  //JSON.stringify()

    return (

      <div className={css_base}> 

        

        <div className={css_dates}>

          <Button color="default" variant="link" size="small" onClick={(e) => this.props.onRemove(item._id)} {...css_removeBtn}><Glyph name="trashcan" color="danger"/></Button>

          <Grid.Row gutter="16">
            <Grid.Col large="one-half">

              <DateInput placeholder="Desde" value={item.dateFrom} format="DD/MM/YYYY" onChange={(data) => this.change({dateFrom : data.value})}/>

            </Grid.Col>
            <Grid.Col large="one-half">

              <DateInput placeholder="Hasta" value={item.dateTo} format="DD/MM/YYYY" onChange={(data) => this.change({dateTo : data.value})}/>

            </Grid.Col>
          </Grid.Row>

        </div>
      	
        {/*{item.variation} {item.days}
        <FormInput value={item.dateFrom} onChange={ (e) => props.onChange({price:e.target.value})}/>
    */} 
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

              {days.map((d) => {

                return (

                  <tr>

                    <td className={ css(css_tableLabel,css_tableLabelRow) }>
                          {d}
                    </td>


                    {variations.map((v) => {

                      return (

                        <td  className={css_tableCell}>
                          
                            <Field path={props.path} days={d} variation={v} dateFrom={item.dateFrom} dateTo={item.dateTo} rates={item.rates}/>

                        </td>
                      )

                    })}
                  </tr>
                )

              })}

          </tbody>
        </table>
        
      </div>

    )
  }
});

module.exports = Season;