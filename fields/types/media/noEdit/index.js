var React = require('react');
var _ = require('lodash');

import {
  
  Grid

} from '../../../../admin/client/App/elemental';


module.exports = function(props){


  var many = props.many;

  var files = !many ? [props.value] : props.value;


  var FILES_ELM = [];


    //# uploaded
    _.each(files, function(id, index){


    	var url = "/uploads/"+id//+'/:/rs=w:200,h:200,m/cr=w:200,h:200'

      FILES_ELM.push(

        <Grid.Col key={id} small="one-half" medium="one-third" large="one-quarter">


          <div className={'ImgUploader__item'}>

	        <div className="ImgUploader__item_img" style={{"backgroundImage" : "url("+url+")"}}></div>

	      </div>

        </Grid.Col>

      );

    });

  return (

  	<div>


  		<div className={"ImgUploader ImgUploader--noedit " + (!many ? "ImgUploader__individual" : '')}>

          <Grid.Row gutter="16">
            {FILES_ELM}
          </Grid.Row>

	    </div>
  		

  		<style>{require('./css.js').default}</style>

  	</div>
  )

}