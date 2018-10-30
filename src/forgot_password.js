/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

var flag = {email:false};

class Forgot_Password extends Component{
    constructor(props){
        super(props);
        this.state = {pop : false, email : '', hasSubmit : false, message : ''};
    }
    
    changeData=(e)=>{
        this.setState({[ e.target.name ] : e.target.value});
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

    pop2 = () => {
        this.setState({pop : false});
    }
    
    popup = () => {
      if(this.state.pop)
      {
       return(<div className="popup_sec" id="pop_forgt">
       <div className="clos_btn">
       <img src="images/clos.png" alt id="clos_pop" />
       </div>
       <div className="pop_hdr">
       A mail has been send to your e-mail Id for reset your Password
       </div>
       <div className="man_contnt">
       <span>Please Check Your Mail Box!</span>
       <input type="submit" Value="OK"  onClick = {this.pop2}/>
       </div>
       </div>);
      }
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.setState({hasSubmit : true});
        if(flag.email){
            e.preventDefault();
            let option = {
              headers : {'Accept' : 'application/json','Content-Type':'application/json'},
              method : 'Post',
              body : JSON.stringify(this.state)
            }
            fetch("http://localhost:5000/forgot_password",option)
            .then((response)=>{
             if(response.status==200)
             {
               response.text().then((action)=>
               {
                   if(action == 'not_exists')
                   {
                        this.setState({message : 'Email Id not exists. Please Register'});
                   }
                   else if(action == 'ok')
                   {
                       this.setState({message:''});
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
  <title>Forgot Password</title>
  <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
  <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
  <div className="container">
    <div className="content">
      <div className="content_rgt">
        <div className="login_sec">
          <h1>Forgot Password</h1>
          <ul>
          <form onSubmit={this.submitHandler}>
            <li><span>Email-ID</span><input type="text" placeholder="Enter your email" name='email' onChange={this.changeData} /></li>
            <li style = {{color : 'red'}}>{this.checkEmail()}</li>
            <li style = {{color : 'red'}}>{this.state.message}</li>
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
        <img src="images/img_9.png" alt /> </div>
    </div>
  </div>
  <div className="clear" />



            </div>
        );
    }
}

export default Forgot_Password;