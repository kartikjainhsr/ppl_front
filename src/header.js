/* eslint-disable */
import React, { Component } from 'react';
import {withRouter,Link} from 'react-router-dom';

class Header extends Component {
  logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    this.props.history.push('/login');
}
button_logout = () => {
  if(this.props.history.location.pathname == '/timeline' || this.props.match.path == '/single_post:id')
  return(
    <div className="image_div"><a href='#'> <img src="images/logout.png" onClick={this.logout}/></a> </div>
  )
}
    render(){
        return(
            <div>
            <div className="header">
          <div className="header_lft">
            <div className="logo"><Link to = '/timeline'><a href="#"><img src="images/logo.png" /></a></Link></div>
            <div className="navigatn">
              <ul>
                <li><a href="#" className="active">Home</a></li>
                <li><a href="#"> E-Coupons </a></li>
                <li><a href="#">E-Brands </a></li>
                <li><a href="#"> Resuse Market </a></li>
                <li><a href="#"> Lost and Found</a></li>
              </ul>
            </div>
          </div>
          <div className="header_rgt">
            <div className="flag_div"><img src="images/flag.png" /></div>
            <input type="text" placeholder="Search" className="txt_box" />
            <div className="msg_box"><a href="#"><span className="msg_count">100</span></a></div>
            
              {this.button_logout()}
              
            
          </div>
        </div>
        </div>
        );
    }
}
export default withRouter(Header);