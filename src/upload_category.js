/* eslint-disabled */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
var flag = {category : false , image : false};
class Upload_Category extends Component {

    constructor(props){
        super(props);
        this.state = {selectedImage : '', category : '', load : false, cate : '', hasSubmit : false};
        this.category_handler();
    }

    onDrop = (acceptedImage, rejectedImage) => {
        if(acceptedImage.length > 0)
        {
            const data = {name : 'selectedImage', value : acceptedImage[0]};
            this.props.change(data);
        }
    }

    changeData = (e) => {
        const data = {name : e.target.name, value : e.target.value};
        this.props.change(data);
    }

    checkCategory = () => {
        var cate2 = [];
        if(this.state.load){
        this.state.cate.map((cat) =>
                {
                    cate2.push(cat.category);
                }
                )
        var index = cate2.indexOf(this.props.category);
        if(this.props.category.length <=0 && this.state.hasSubmit)
        {
            flag.category = false;
            return('Please enter Category');
        }
        else if(index !== -1 && this.state.hasSubmit)
        {
            flag.category = false;
            return('Category Should be Unique');
        }
        else if(index == -1 && this.props.category.length > 0)
        {
            flag.category = true;
            return('');
        }}
    }

    checkImage = () => {
        if(this.props.selectedImage == '' && this.state.hasSubmit)
        {
            flag.image = false;
            return('Please select an image');
        }
        else if(this.props.selectedImage !== '')
        {
            flag.image = true;
            return('');
        }
    }
    clearState = () => {
        let d = {name : 'category',value : ''};
        this.props.change(d);
        d = {name : 'selectedImage',value : ''};
        this.props.change(d);
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.setState({hasSubmit : true});
        if(flag.category && flag.image)
        {
            let data = new FormData()
        data.append("imageName" , this.props.selectedImage);
        data.append("category" , this.props.category);

        var opt = {
            mode: 'no-cors',
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body :  data
            }
        fetch("http://localhost:5000/upload_category", opt)
            .then((response) => {
                if (response.status == 200 || response.status == 0) {
                            this.props.changeCategory();
                            this.clearState();
                }
                else{
                    this.props.history.push('/error');
                }
            })


            .catch((err) => {
                this.props.history.push('/error');
            });
        }
    }

    category_handler = () => {
        var opt = {
            headers : {'Accept' : 'application/json','Content-Type':'application/json'},
            method: "POST",
            body :  JSON.stringify({})
            }
        fetch("http://localhost:5000/fetch_category", opt)
            .then((response) => {
                if (response.status == 200 || response.status == 0) {
                    response.text().then((action)=>
                    {
                        if(action == 'err')
                        {
                            this.props.history.push('/error');
                        }
                        else
                        {
                            const a = JSON.parse(action);
                        if(a.re == 'ok')
                        {
                             this.setState({cate : a.body});
                             this.setState({load : true});
                        }
                        }
                        
                        
                    })
                
            }
            })
    
    
            .catch((err) => {
                this.props.history.push('/error');
            });
    }
    

    render(){
        return(
            <div className='login_sec'>
            <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
            <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
            <form encType = 'multipart/form-data'>
            <Dropzone onDrop={this.onDrop} name='imageFile'>
                <div>
                  <p>Click Here to Upload A Single Image</p>
                  <img src={this.props.selectedImage.preview} />
                </div>
              </Dropzone>
              <div style={{color : 'red'}}>{this.checkImage()}</div>
              <br />
              <input type = 'text' placeholder='Caption' name='category' onChange={this.changeData}/>
              <div style={{color : 'red'}}>{this.checkCategory()}</div>
              <br />
              <input type = 'submit' value='Submit' onClick = {this.submitHandler}/>
              </form>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return{
      selectedImage : state.upload_category.selectedImage,
      category : state.upload_category.category
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return{
      change : (data) => dispatch({type : data.name, value : data.value})
    };
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Upload_Category));