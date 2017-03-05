var React = require('react');

var ImgUploader = require('./ImgUploader.js');
var ImgUploaderMultiple = require('./ImgUploaderMultiple.js');


//require('./index.css');



module.exports = function(props){

  if(props.many) return <ImgUploaderMultiple {...props}/>

  return <ImgUploader {...props}/>

}