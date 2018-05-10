export default `

.InlineToolbar {
  left: 50%;
  transform: translate(-50%) scale(0);
  position: absolute;
  /*border: 1px solid #ddd;*/
  background: #7F8095;
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(220,220,220,1);
  z-index: 2;
  box-sizing: border-box;
}

.InlineToolbar:after, .InlineToolbar:before {
  top: 100%;
  left: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.InlineToolbar:after {
  border-color: rgba(255, 255, 255, 0);
  border-top-color: #7F8095;
  border-width: 4px;
  margin-left: -4px;
}
.InlineToolbar:before {
  border-color: rgba(221, 221, 221, 0);
  border-top-color: #7F8095;
  border-width: 6px;
  margin-left: -6px;
}



.InlineToolbar .separator {
  display: inline-block;
  border-right: 1px solid #fff;
  height: 22px;
  margin: 0 0.3em 5px;
}



.InlineToolbar .buttonWrapper {
  display: inline-block;
}

.InlineToolbar .button {
  background: #7F8095;
  color: #fff;
  font-size: 18px;
  border: 0;
  padding-top: 5px;
  vertical-align: bottom;
  height: 34px;
  width: 36px;
}

.InlineToolbar .button svg {
  fill: #fff;
}

.InlineToolbar .button:hover, .InlineToolbar .button:focus {
  background: #717286;
  outline: 0; /* reset for :focus */
}

.InlineToolbar .active {
  background: #6C6E7D;
  color: #fff;
}

.InlineToolbar .active svg {
  fill: #fff;
}


.InlineToolbar .btn{
  border-radius: 0;
  
}


.InlineToolbar .dropdown.open .btn{
  background: #6C6E7D;
  color: #fff;
}

`;