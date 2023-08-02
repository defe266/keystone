export default `

.ImgUploader .uploaderBlock{

  border: 4px dashed #cccccc;
    border-radius: 2px;
    min-height: 80px;
    padding: 20px 20px 0;
    position: relative;
}


.ImgUploader .uploaderBlock.highlighted{
  border-color: #00BAF5;
}


.ImgUploader .uploaderBlock.hovered{
  border-color: #61C564;
}


.ImgUploader__header {
    color: #bbbbbb;
    line-height: 40px;
    margin-bottom: 20px;
    text-align: center;
}

.ImgUploader__header_text {
    font-size: 20px;
    letter-spacing: 2px;
}


.ImgUploader__header_or {
    padding-left: 15px;
    padding-right: 20px;
}


.ImgUploader__item{
  margin-bottom: 20px;
}


.ImgUploader__item_img{
  border: 4px solid #ffffff;
    border-radius: 1px;
    box-shadow: 0 0 2px #666666;
    height: 120px;
    width: 100%;
    background-size: cover;
    background-position: center;
}


.ImgUploader__item_tools{
  text-align: center;
  padding-top: 5px 0;
}


.ImgUploader__fileHolder_content{
  transition: all 0.1s ease 0s;
}

.ImgUploader__fileHolder_content.hovered{
  transform: translate(60%,0);
  position: relative;
  z-index: 18;
}



/*individual mode*/
.ImgUploader__individual .uploaderBlock{
    padding-bottom: 20px;
}

.ImgUploader__individual .ImgUploader__item{

    max-width: 200px;
    margin: auto;
}

.ImgUploader__individual .ImgUploader__item_img{
    
    height: 200px;
}



.ProgressBar{
    height: 3px;
    background: #eee;
    position: relative;
}

.ProgressBar__bar{
    background: #59D84A;
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
}



.ModalLibraryBtn__item{
  cursor: pointer;
}

.ModalLibraryBtn__item—selected .ImgUploader__item_img{
  border: 3px solid #0082E8;
}

.ModalLibraryBtn__item__title{
  overflow: hidden;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 4px 0;
}
.ImgUploader__item_name{
  color: #7F7F7F;
  font-size:12px;
}
`;