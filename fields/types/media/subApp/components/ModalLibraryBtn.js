var React = require('react');
var request = require('superagent');
var _ = require('lodash');


import {
  Alert,
  Modal,
  Button,
  Grid,
  Center,
  Spinner,
  Pagination
} from '../../../../../admin/client/App/elemental';


const limit = 100;

var ModalLibrary = React.createClass({  //monitor.getDropResult()

  displayName: "Upload",
  
  getInitialState: function(){

    return {

      collection: [],
      selection: [],
      loading: false,
      isOpen: false,
      page: 1,
      count: 0,

    }
  },

  componentDidUpdate: function(prevProps, prevState){


    if(!prevState.isOpen && this.state.isOpen){

      this.refresh()

    }
  },

  refresh: function(){

    var page = this.state.page

    this.setState({loading : true})

    request
    .get(Keystone.adminPath + '/api/uploads')
    .query({ 
      skip: limit*(page-1), 
      limit: limit, 
      sort:"-createdAt"
    })
    .end((err, res) => {

      //if(err) return done(err);

      this.setState({
        collection: res.body.results,
        count:res.body.count,
        selection: [],
        loading : false,
      })
    });
  },

  changePage: function(page){

    this.setState({page:page}, () => {

      this.refresh()
    })
  },

  select: function(id){

    if(this.props.single){

      this.setState({selection : [id]});  

    }else{

      this.setState({selection : [...this.state.selection, id]});  
    }
    
  },

  unSelect: function(id){

    //this.state.selection.push(id)
    this.setState({selection : _.filter(this.state.selection, (i) => i != id)});
  },

  close: function(){

    this.setState({isOpen : false})
  },

  open: function(){

    this.setState({isOpen : true})
  },

  add: function(){

    this.setState({isOpen : false});

    if(this.props.single){

      if(this.props.onAdd) this.props.onAdd(this.state.selection[0]); 

    }else{

      if(this.props.onAdd) this.props.onAdd(this.state.selection);
    }

  },

  render: function(){

    var state = this.state;
    var props = this.props;

    var isOpen = state.isOpen;
    var loading = state.loading;
    var collection = state.collection;

    //console.log("props.hiddenFiles",props.hiddenFiles)
    collection = _.filter(collection, (i) => props.hiddenFiles.indexOf(i.id) == -1);
    var selection = state.selection;

    


    return (

      
        <span className={'ModalLibrary'}>

          <Button size="small" onClick={this.open}>Librería</Button>

          <Modal.Dialog  isOpen={isOpen} width='800' onClose={this.close} backdropClosesModal >{/*enableKeyboardInput*/}
              <Modal.Header text="Librería" showCloseButton/>
              <Modal.Body>

                {loading ? <Center height={60}><Spinner size="sm"/></Center> :

                  <div style={{height:'400px', overflowY:'auto', padding:'10px'}}>

                    <Grid.Row gutter="16">
                      
                      {collection.map((props) => {

                        var url = "/uploads/"+props.id//+'/:/rs=w:200,h:200,m/cr=w:200,h:200'

                        var selected = selection.indexOf(props.id) != -1;

                        return (

                          <Grid.Col key={props.id} small="one-half" medium="one-third" large="one-quarter">

                            <div title={props.id} className={'ImgUploader__item ModalLibraryBtn__item ' + (selected ? 'ModalLibraryBtn__item—selected' : '')} onClick={selected ? (e) => this.unSelect(props.id) : (e) => this.select(props.id)}>

                              <div className="ImgUploader__item_img" style={{"backgroundImage" : "url("+url+")"}}></div>

                              
                              <div className="ModalLibraryBtn__item__title">
                                {props.id}
                              </div>

                            </div>

                          </Grid.Col>
                        )

                      })}

                    </Grid.Row>

                  </div>
                }

              </Modal.Body>
              <Modal.Footer>
                

                {selection.length > 0 ? <Button color="primary" onClick={this.add}>Añadir</Button> : null}

                <Button color="default" variant="link" onClick={this.close}>Cerrar</Button>

                <Pagination 

                  currentPage={this.state.page}
                  onPageSelect={this.changePage}
                  pageSize={limit}
                  plural="Uploads"
                  singular="Upload"
                  total={this.state.count}
                  limit={8}
                  style={{"marginLeft": "auto","marginBottom": "0"}}
                />

              </Modal.Footer>
            </Modal.Dialog>

        </span>

    )
  }
});

module.exports = ModalLibrary;