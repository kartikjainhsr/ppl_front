/* eslint-disabled */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import {withRouter} from 'react-router-dom';

var flag = {image : false, caption : false};

class Upload_Post extends Component {

    constructor(props){

        super(props);
        this.state = {selectedImage : '', category : this.props.cate[0].category, caption : '', fname : localStorage.fname, lname : localStorage.lname, username : localStorage.username, hasSubmit : false};
    }

    onDrop = (acceptedImage, rejectedImage) => {
        if(acceptedImage.length > 0)
        this.setState({selectedImage : acceptedImage[0]});
    }

    changeData = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    checkImage = () => {
        if(this.state.selectedImage == '' && this.state.hasSubmit)
        {
            flag.image = false;
            return('Please select an image');
        }
        else if(this.state.selectedImage !== '')
        {
            flag.image = true;
            return('');
        }
    }

    checkCaption = () => {
        if(this.state.caption == '' && this.state.hasSubmit)
        {
            flag.caption = false;
            return('Please add caption');
        }
        else if(this.state.caption !== '')
        {
            flag.caption = true;
            return('');
        }
    }


    submitHandler = (e) => {
        e.preventDefault();
        this.setState({hasSubmit : true});
        if(flag.image && flag.caption)
        {
            let data = new FormData()
            data.append("imageName" , this.state.selectedImage);
            data.append("caption" , this.state.caption);
            data.append("fname" , this.state.fname);
            data.append("lname" , this.state.lname);
            data.append("category" , this.state.category);
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
                            this.props.changeUpload();
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

    
    

    render(){
        return(
            <div className='login_sec'>
            <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
            <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
            <form encType = 'multipart/form-data'>
            <Dropzone onDrop={this.onDrop} name='imageFile'>
                <div>
                  <p>Click Here to Upload A Single Image</p>
                  <img src={this.state.selectedImage.preview} />
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
              <br />
              <br />
              <input type = 'submit' value='Upload' onClick = {this.submitHandler}/>
              </form>
            </div>
        )
    }

}

export default withRouter(Upload_Post);