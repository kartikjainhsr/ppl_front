/* eslint-disabled */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

var flag = {image : false, caption : false, category : false};

class Upload_Post extends Component {

    constructor(props){

        super(props);
        this.state = {fname : localStorage.fname, lname : localStorage.lname, username : localStorage.username, hasSubmit : false};
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
        let d = {name : 'caption',value : ''};
        this.props.change(d);
        d = {name : 'category',value : ''};
        this.props.change(d);
        d = {name : 'selectedImage',value : ''};
        this.props.change(d);
    }

    checkCaption = () => {
        if(this.props.caption.length <= 0 && this.state.hasSubmit)
        {
            flag.caption = false;
            return('Please add caption');
        }
        else if(this.props.caption !== '')
        {
            flag.caption = true;
            return('');
        }
    }

    checkCategory = () => {
        if(this.props.category.length <= 0 && this.state.hasSubmit)
        {
            flag.category = false;
            return('Please add category');
        }
        else if(this.props.category !== '')
        {
            flag.category = true;
            return('');
        }
    }


    submitHandler = (e) => {
        e.preventDefault();
        this.setState({hasSubmit : true});
        if(flag.image && flag.caption && flag.category)
        {
            let data = new FormData()
            data.append("imageName" , this.props.selectedImage);
            data.append("caption" , this.props.caption);
            data.append("fname" , this.state.fname);
            data.append("lname" , this.state.lname);
            data.append("category" , this.props.category);
            data.append("username" , this.state.username);

            var opt = {
                mode: 'no-cors',
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body :  data
            }
            fetch("http://localhost:5000/upload_post", opt)
                .then((response) => {
                    if (response.status == 200 || response.status == 0) {
                            flag.image = false;
                            flag.caption = false;
                            this.clearState();
                            this.props.changeUpload();
                            
                    }
                    else{
                        console.log('sdfsdfs');
                        this.props.history.push('/error');
                    }
                })


            .catch((err) => {
                this.props.history.push('/error');
            });
        }
        
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
              <input type = 'text' placeholder='Caption' name='caption' onChange={this.changeData}/>
              <div style={{color : 'red'}}>{this.checkCaption()}</div>
              <br />
              <select name='category' placeholder = 'Category' onChange = {this.changeData}>
              {this.props.cate.map((cat) =>
                {
                    return(<option value={cat.category}>{cat.category}</option>)
                }
                )}
            
              </select>
              <div style={{color : 'red'}}>{this.checkCategory()}</div>
              <br />
              <br />
              <input type = 'submit' value='Upload' onClick = {this.submitHandler}/>
              </form>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return{
      selectedImage : state.upload_post.selectedImage,
      caption : state.upload_post.caption,
      category : state.upload_post.category
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return{
      change : (data) => dispatch({type : data.name, value : data.value})
    };
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Upload_Post));