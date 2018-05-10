export default `

/*toolbar*/
.SideToolbar{
  position: absolute;
  /*margin-left: -50px;*/
}

/*popup*/

.SideToolbar .blockType {
  box-sizing: border-box;
  border: 1px solid #3FAFE1;
  background: #fff;
  padding: 5px;
  margin: 0;
  border-radius: 18px;
  cursor: pointer;
  height: 24px;
  width: 24px;
  /*line-height: 36px;*/
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #3FAFE1;
  margin-top: 5px;
  position: relative;
}

.SideToolbar .blockType svg {
  fill: #3FAFE1;
}

.SideToolbar .blockType:after{
  content: "";
  width: 18px;
  height: 1px;
  background: #3FAFE1;
  top: 50%;
  left: 2px;
  position: absolute;

}

.SideToolbar .blockType:before{
  content: "";
  height: 18px;
  width: 1px;
  background: #3FAFE1;
  top: 2px;
  left: 50%;
  position: absolute;
}
/*
.SideToolbar .spacer {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: 74px;
  width: 36px;
  height: 8px;
}
*/
.SideToolbar .popup {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  border-radius: 2px;
  z-index: 3;
  box-sizing: border-box;
  /*width: 74px;*/
  width: 28px;
  /*margin-top: 8px;*/
}



/*buttons*/


.SideToolbar .buttonWrapper {
  display: inline-block;
}

.SideToolbar .button {
  background: #7F8095;
  color: #fff;
  font-size: 14px;
  border: 0;
  padding-top: 5px;
  vertical-align: bottom;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  margin-top: 6px;
}

.SideToolbar .button svg {
  fill: #fff;
}

.SideToolbar .button:hover, .button:focus {
  background: #717286;
  outline: 0; /* reset for :focus */
}

.SideToolbar .active {
  background: #6C6E7D;
  color: #fff;
}

.SideToolbar .active svg {
  fill: #fff;
}

.SideToolbar .separator {
  display: inline-block;
  border-right: 1px solid #fff;
  height: 24px;
  margin: 0 0.5em;
}


`;