import _ from 'lodash'

module.exports = function extractErrors(err,resp,data){

	var errors = false;

	if (err || resp.statusCode != 200) {

		errors = [];

		if(err){

			errors.push('Se ha producido un error');

		}else{


			//return alert('Error!');
		  	if(resp.statusCode == 400){

		  		_.each(data.detail, (item) => {
		  			
		  			errors.push(item.error);
		  		})

		  	}else{
		  		
		  		if(data.error && data.error.search('ValidationError') != -1){

		  			errors.push('Configuración imposible');

		  		}else{

		  			errors.push('Se ha producido un error');
		  		}
		  	}
		}

	}

	return errors;
}