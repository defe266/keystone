export default `
.DraftCanvas{
  /*max-width: 650px;*/
  /*max-width: 900px;*/
  /*background: #fff;*/
  margin: auto;
  /*border-radius: 2px;
  border: 1px solid #DCDFE4;
  background: #fff;
  padding: 15px;*/

  -webkit-font-smoothing: antialiased;

  cursor: text;
  font-size: 16px;
  line-height: 25px;
  min-height: 40px;
}

.public-DraftStyleDefault-block--dragOver{
  background: #AFE4FE;
  caret-color: red;
}


/*.public-DraftEditor-content figure > div*/
.public-DraftStyleDefault-block,
.DraftEditor-editorContainer figure{
  /*margin-top: 20px;*/
  margin:0 auto 0;
  padding: 0 0 10px;
  /*width: 650px;*/
  /*width: 900px;*/
}

/*
.DraftCanvas__AlignmentTool__container > div{
  position: fixed;
}

.DraftCanvas__InlineToolbar__container > div{
  position: fixed;
  margin-left: 538px;
  margin-top: 102px;
}

.DraftCanvas__SideToolbar__container > div{
  position: fixed;
  margin-left: 30px;
}*/

.DraftCanvas__AlignmentTool__container,
.DraftCanvas__InlineToolbar__container,
.DraftCanvas__SideToolbar__container{
  line-height: 1;
}

.DraftCanvas__tab{
  display: inline-block;
  cursor: pointer;
  margin-right: 10px;
}

.DraftCanvas__tab--selected{
  color: #148EE8;
}

.DraftCanvas__panel{
  display: none;
}

.DraftCanvas__panel--selected{
  display: block;
}

.DraftCanvas__code{
  -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-color: #ccc;
    border-radius: 0.3rem;
    border-style: solid;
    border-width: 1px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    color: inherit;
    background-color: white;
    height: 2.4em;
    line-height: 2.3em;
    padding: 0 .75em;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    width: 100%;
    appearance: none;
    background-image: none;
    display: block;
    height:300px;
}

/*

.DraftEditor-editorContainer figure div[class^=draftJsEmojiPlugin__focused__],
.DraftEditor-editorContainer figure > div:hover{
  box-shadow: 0 0 0 3px #29A5DE !important;
}


.DraftCanvas__readOnly .DraftEditor-editorContainer figure div[class^=draftJsEmojiPlugin__focused__],
.DraftCanvas__readOnly  .DraftEditor-editorContainer figure > div:hover{
  box-shadow: none !important;
}


.DraftCanvas__readOnly .PostItem__body a,
.DraftCanvas__readOnly .PostItem__footer a{
  pointer-events: inherit;
}



@media (max-width: 1300px){ 
  .DraftCanvas__SideToolbar__container > div{
    margin-left: 50px;
  }
}



@media print {

  .DraftCanvas a[href]:after {
    content: none !important;
  }
  *,
  *:before,
  *:after {
    /*color: red !important;*/
    -webkit-print-color-adjust: exact;
  }

}

*/
`;