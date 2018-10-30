/* eslint-disabled */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import {withRouter} from 'react-router-dom';
var flag = {category : false , image : false};
class Upload_Category extends Component {

    constructor(props){
        super(props);
        this.state = {selectedImage : '', category : '', load : false, cate : '', hasSubmit : false};
        this.category_handler();
    }

    onDrop = (acceptedImage, rejectedImage) => {
        if(acceptedImage.length > 0)
        this.setState({selectedImage : acceptedImage[0]});
    }

    changeData = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    checkCategory = () => {
        var cate2 = [];
        if(this.state.load){
        this.state.cate.map((cat) =>
                {
                    cate2.push(cat.category);
                }
                )
        var index = cate2.indexOf(this.state.category);
        if(this.state.category.length <=0 && this.state.hasSubmit)
        {
            flag.category = false;
            return('Please enter Category');
        }
        else if(index !== -1 && this.state.hasSubmit)
        {
            flag.category = false;
            return('Category Should be Unique');
        }
        else if(index == -1 && this.state.category.length > 0)
        {
            flag.category = true;
            return('');
        }}
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

    submitHandler = (e) => {
        e.preventDefault();
        this.setState({hasSubmit : true});
        if(flag.category && flag.image)
        {
            let data = new FormData()
        data.append("imageName" , this.state.selectedImage);
        data.append("category" , this.state.category);

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
                  <img src={this.state.selectedImage.preview} />
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

export default withRouter(Upload_Category);