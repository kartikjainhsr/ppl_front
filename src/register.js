/* eslint-disable */
import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './header';
import Footer from './footer';

const flag = {username : false , password : false , fname : false , lname : false , email : false};

class Register extends Component{
  constructor(props)
  {
    super(props);
    this.state = {pop : false, email_exist : '', hasSubmit : false , flag : false};
  }

	changeData=(e)=>{
    
    const data = {name : e.target.name, value : e.target.value};
     this.props.change(data);
  }
 
  checkData=(val)=>{
   if(this.props[val].length <= 0 && this.state.hasSubmit)
    {
      flag[val] = false;
      return ('Please enter '+val);
    }
    else if(this.props[val].length > 0)
      flag[val] = true;
  }
  
  checkEmail = () => {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(this.props.email);
    if(this.props.email.length <=0 && this.state.hasSubmit)
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
    if(this.props.password.length <= 0 && this.state.hasSubmit)
    {
      flag.password = false;
      return ('Please enter password');
    }
    else if(this.props.password.length <= 7 && this.state.hasSubmit)
    {
      flag.password = false;
      return ('Please Enter password of atleast 8 digits');
    }
    else if(this.props.password.length >=8)
      flag.password = true;
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
      A mail has been send to your e-mail Id for verify your password
      </div>
      <div className="man_contnt">
      <span>Please Check Your Mail Box!</span>
      <input type="submit" Value="OK"  onClick = {this.pop2}/>
      </div>
      </div>);
    }
  }
  
  

  submitHandler=(e)=>{
    this.setState({hasSubmit : true});    
    if(flag.username == true && flag.password == true && flag.fname && flag.lname && flag.email)
    {
      e.preventDefault();
      let option = {
        headers : {'Accept' : 'application/json','Content-Type':'application/json'},
        method : 'Post',
        body : JSON.stringify({username : this.props.username,password : this.props.password, email : this.props.email , fname : this.props.fname, lname : this.props.lname})
      }
      fetch("http://localhost:5000/register",option)
      .then((response)=>{
        if(response.status==200)
        {
          response.text().then((action)=>
          {
            if(action == 'ok')
            {
              console.log('registered');
              this.setState({email_exist : ''});
              // alert('Please verify your mail id');
              // this.props.history.push('/login');
              this.setState({pop : true});
            }
            else if(action == 'exists')
            {
              console.log('exists');
              this.setState({email_exist : 'Email already exists'});
            }
            else
            {
              console.log('err');
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
        <title>Create An Account</title>
  <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
  <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
  <div className="navbar navbar-inverse navbar-fixed-top">
    <div className="navbar-inner">
      <div className="container">
        <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
        <a className="brand" href>PPL</a>
        <div className="pro_info pull-right">
          <div className="pro_icn"><img src="images/pic_small.png" /></div>
          <div className="pro_txt">Me<b className="caret" /></div>
          <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
            <li><a tabIndex={-1} href="#">My Profile</a></li>
            <li><a tabIndex={-1} href="#">Message Box</a></li>
            <li><a tabIndex={-1} href="#">Change Language</a></li>
            <li className="divider" />
            <li><a tabIndex={-1} href="#">
                <input type="text" placeholder="search" />
              </a></li>
          </ul>
        </div>
        <div className="nav-collapse collapse">
          <ul className="nav">
            <li className="active"> <a href>Home</a> </li>
            <li className> <a href>E-Coupons</a> </li>
            <li className> <a href>E-Brands</a> </li>
            <li className> <a href>Resuse Market</a> </li>
            <li className> <a href>Lost and Found</a> </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <Header />
  <div className="container">
    <div className="content">
      <div className="content_rgt">
        <div className="register_sec">
          <h1>Create An Account</h1>
          <ul>
          <form>
            <li><span>Username</span><input type="text"  placeholder="Enter your username" name='username' onChange={this.changeData} /></li>
            <li style={{color:'red'}} name='username'>{this.checkData('username')}</li>
            <li><span>Password</span><input type="password"  placeholder="Enter your password" name='password' onChange={this.changeData} /></li>
            <li style={{color:'red'}}>{this.checkPassword()}</li>
            <li><span>Email</span><input type="text"  placeholder="Enter your email" name='email' onChange={this.changeData} /></li>
            <li style={{color:'red'}}>{this.checkEmail()}{this.state.email_exist}</li>
            <li><span>First Name</span><input type="text"  placeholder="Enter your first name" name = 'fname' onChange={this.changeData} /></li>
            <li style={{color:'red'}} name='fname'>{this.checkData('fname')}</li>
            <li><span>Last Name</span><input type="text"  placeholder="Enter your last name" name='lname' onChange={this.changeData} /></li>
            <li style={{color:'red'}} name='lname'>{this.checkData('lname')}</li>
            <li><input type="checkbox" />I agree to Term &amp; Conditions</li>
            <li><input type="button" onClick = {this.submitHandler} defaultValue="Register" /></li>
            </form>
          </ul>
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
  <Footer />
</div>
			)
	}
}

const mapStateToProps = (state) => {
  return{
    username : state.register.username,
    password : state.register.password,
    email : state.register.email,
    fname : state.register.fname,
    lname : state.register.lname
  };
}

const mapDispatchToProps = (dispatch) => {
  return{
    change : (data) => dispatch({type : data.name, value : data.value})
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);