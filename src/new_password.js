/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

var flag = {password:false};

class New_Password extends Component{
    constructor(props){
        super(props);
        this.state = {pop : false, password : '', id : this.props.match.params.id, hasSubmit : false};
    }
    
    changeData=(e)=>{
        this.setState({[ e.target.name ] : e.target.value});
    }

    checkPassword = () => {
    if(this.state.password.length <= 0 && this.state.hasSubmit)
    {
      flag.password = false;
      return ('Please enter password');
    }
    else if(this.state.password.length <= 7 && this.state.hasSubmit)
    {
      flag.password = false;
      return ('Please Enter password of atleast 8 digits');
    }
    else if(this.state.password.length >=8)
      flag.password = true;
  }

  pop2 = () => {
    this.setState({pop : false});
    this.props.history.push('/login');
  }

  popup = () => {
    if(this.state.pop)
    {
      return(<div className="popup_sec" id="pop_forgt">
      <div className="clos_btn">
      <img src="images/clos.png" alt id="clos_pop" />
      </div>
      <div className="pop_hdr">
      Your Password has been reset!
      </div>
      <div className="man_contnt">
      <span>Please Login!</span>
      <input type="submit" Value="OK"  onClick = {this.pop2}/>
      </div>
      </div>);
    }
  }

    submitHandler = (e) => {
        e.preventDefault();
        this.setState({hasSubmit : true});
        if(flag.password){
            e.preventDefault();
            let option = {
              headers : {'Accept' : 'application/json','Content-Type':'application/json'},
              method : 'Post',
              body : JSON.stringify(this.state)
            }
            fetch("http://localhost:5000/new_password",option)
            .then((response)=>{
             if(response.status==200)
             {
               response.text().then((action)=>
               {
                  if(action == 'ok')
                  {
                    this.setState({pop : true});
                  } 
                  else
                  {
                    this.props.history.push('/error');
                  }
               })
             }
             })
             .catch((err)=>{  
               console.log('Fetch Error :-S', err);  
               if(err)
                 this.props.history.push('/error');
             });
        }
    }
    
    render(){
        return(
            <div>
            <meta charSet="utf-8" />
  <title>New Password</title>
  <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
  <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
  <div className="container">
    <div className="content">
      <div className="content_rgt">
        <div className="login_sec">
          <h1>Forgot Password</h1>
          <ul>
          <form onSubmit={this.submitHandler}>
            <li><span>Password</span><input type="password" placeholder="Enter your New Passowrd" name='password' onChange={this.changeData} /></li>
            <li style = {{color : 'red'}}>{this.checkPassword()}</li>
            <li><input type="checkbox" />Remember Me</li>
            <li><input type="submit" defaultValue="Log In" /><a href>Forgot Password</a></li>
          </form>
          </ul>
          <div className="addtnal_acnt">I do not have any account yet.<a href><Link to = '/'>Create My Account Now !</Link></a></div>
          <div className="addtnal_acnt">I already have an account.<a href><Link to = '/login'>Login My Account !</Link></a></div>
        </div>
      </div>
      {this.popup()}
      <div className="content_lft">
        <h1>Welcome from PPL!</h1>
        <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
        <img src="../images/img_9.png" alt /> </div>
    </div>
  </div>
  <div className="clear" />



            </div>
        );
    }
}

export default New_Password;