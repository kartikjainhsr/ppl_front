/* eslint-disable */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from './header';

var flag = {email : false, password : false};

class Login extends Component{
  componentDidMount(){
    if(localStorage.email !== undefined && localStorage.password !== undefined){
      this.props.history.push('/timeline');
    }
  }
  constructor(props){
		super(props);
		this.state = {email : '', password : '', hasSubmit : false, incorrect_password : '' , incorrect_email : ''};
  }
  
  changeData=(e)=>{
		this.setState({[e.target.name] : e.target.value});
  }
  
  checkEmail = () => {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(this.state.email);
    if(this.state.email.length <=0 && this.state.hasSubmit)
    {
      flag.email = false;
      return ('Please Enter Email');
    }
    else if(result == false && this.state.hasSubmit == true)
    {
      flag.email = false;
      return ('please enter valid email');
    }
    else if(result)
    {
      flag.email = true;
    }
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

  submitHandler=(e)=>{
    e.preventDefault();
    this.setState({hasSubmit : true});
    if(flag.email && flag.password){
      e.preventDefault();
      let option = {
        headers : {'Accept' : 'application/json','Content-Type':'application/json'},
        method : 'Post',
        body : JSON.stringify(this.state)
      }
      fetch("http://localhost:5000/login",option)
      .then((response)=>{
       if(response.status==200)
       {
         response.text().then((action)=>
         {
           if(action=='not_verified')
           {
             this.setState({incorrect_email : 'Please Verify Your Email Id'});
             this.setState({incorrect_password : ''});
           }
           else if(action=='incorrect_password')
           {
             this.setState({incorrect_email : ''});
             this.setState({incorrect_password : 'Password is incorrect'});
           }
           else if(action=='no')
           {
            this.setState({incorrect_email : 'Email is incorrect'});
            this.setState({incorrect_password : ''});
           }
           else if(action=='err')
           {
             this.props.history.push('/error');
           }
           else
           {
            let a = JSON.parse(action);
            if(a.res == 'ok')
            {
              
              localStorage.email = a.data[0].email;
              localStorage.password = a.data[0].password;
              localStorage.username = a.data[0].username;
              localStorage.fname = a.data[0].fname;
              localStorage.lname = a.data[0].lname;
              localStorage.id = a.data[0]._id;
              this.props.history.push('/timeline');
            }
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
  <title>Login Account</title>
  <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
  <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
  <Header />
  <div className="container">
    <div className="content">
      <div className="content_rgt">
        <div className="login_sec">
          <h1>Log In</h1>
          <ul>
          <form onSubmit = {this.submitHandler}>
            <li><span>Email-ID</span><input type="text" placeholder="Enter your email" name = 'email' onChange={this.changeData} /></li>
            <li style={{color : 'red'}}>{this.checkEmail()}</li>
            <li style={{color:'red'}} >{this.state.incorrect_email}</li> 
            <li><span>Password</span><input type="password" placeholder="Enter your password" name='password' onChange={this.changeData}/></li>
            <li style={{color : 'red'}} > {this.checkPassword()}</li>
            <li style={{color:'red'}} >{this.state.incorrect_password}</li> 
            <li><input type="checkbox" />Remember Me</li>
            <li><input type="submit" defaultValue="Log In" /><Link to ='/forgot_password'><a href>Forgot Password</a></Link></li>
          </form>
          </ul>
          <div className="addtnal_acnt">I do not have any account yet.<a href><Link to = '/'>Create My Account Now !</Link></a></div>
        </div>
      </div>
      <div className="content_lft">
        <h1>Welcome from PPL!</h1>
        <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
        <img src="images/img_9.png" alt /> </div>
    </div>
  </div>
  <div className="clear" /></div>
    );
	}
}

export default Login;