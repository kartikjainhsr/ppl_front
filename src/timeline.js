/* eslint-disable */
import React , {Component} from 'react';
import Header from './header';
import Footer from './footer';
import Timeline_Right from './timeline_right';
import Upload_Post from './upload_post';

var x = [];

class Timeline extends Component {
  
  constructor(props){
    super(props);
    this.state = {isUpload : false, cate : '' , load : true , pos : '', load2 : true, my : false};
    this.category_handler();
    this.post_handler();
  }

  changeUpload = () => {
    this.setState({isUpload : this.state.isUpload ? false : true});
    this.category_handler();
    this.post_handler();
    
  }

  showUpload = () => {
    if(this.state.isUpload)
    return(<Upload_Post changeUpload = {this.changeUpload} cate = {this.state.cate}/>)
  }

  componentDidMount(){
    if(localStorage.email == undefined && localStorage.password == undefined)
    this.props.history.push('/login');
    this.category_handler();
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
                    const a = JSON.parse(action);
                    if(a.re == 'ok')
                    {
                         this.setState({cate : a.body});
                         this.setState({load : false});
                    }
                    else
                    {
                        this.props.history.push('/error');
                    }
                })
            
        }
        })


        .catch((err) => {
            this.props.history.push('/error');
        });
}

post_handler = () => {
  var opt = {
      headers : {'Accept' : 'application/json','Content-Type':'application/json'},
      method: "POST",
      body :  JSON.stringify({})
      }
  fetch("http://localhost:5000/fetch_post", opt)
      .then((response) => {
          if (response.status == 200) {
              response.text().then((action)=>
              {
                const b = JSON.parse(action);
                
                  if(b.re == 'ok')
                  {
                       this.setState({pos : b.body});
                       this.setState({load2 : false});
                       x = this.state.pos;
                  }
                  
              })
          
      }
      })


      .catch((err) => {
          this.props.history.push('/error');
      });
}

likes_handler = (id) => {
  var opt = {
      headers : {'Accept' : 'application/json','Content-Type':'application/json'},
      method: "POST",
      body :  JSON.stringify({id : id , id2 : localStorage.id})
      }
  fetch("http://localhost:5000/likes_handler", opt)
      .then((response) => {
          if (response.status == 200) {
              response.text().then((action)=>
              {
                
                
                  if(action == 'ok')
                  {
                       this.post_handler();
                  }
                  
              })
          
      }
      })


      .catch((err) => {
          this.props.history.push('/error');
      });
}

clickPost = (data) => {
  this.props.history.push('/single_post'+data);
}

likeorunlike = (data) => {
  
  var index = data.likes.indexOf(localStorage.id);
  if(index == -1)
  return(
    <div><li><a onClick={() => this.likes_handler(data._id)}><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>Likes</a></li>
                        <div className="like_count" style={{marginRight: 10}} ><span className="lft_cnt" /><span className="mid_cnt" >{data.likes.length}</span><span className="rit_cnt" /></div></div>
  )
  else
  return(
    <div><li><a onClick={() => this.likes_handler(data._id)}><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>Unlike</a></li>
                        <div className="like_count" style={{marginRight: 10}} ><span className="lft_cnt" /><span className="mid_cnt" >{data.likes.length}</span><span className="rit_cnt" /></div></div>
  )
}

myupload = () => {
  this.setState({my : this.state.my ? false : true});
}

newfirst = () => {
  x.sort(function(a, b){return b.date.localeCompare(a.date)});
  this.setState({pos : x});
}

mostcommented = () => {
  x.sort(function(a, b){return b.comment.length - a.comment.length});
  this.setState({pos : x});
}

oldfirst = () => {
  this.post_handler();
}
  


	render(){
    if(this.state.load || this.state.load2)
    return <div></div>
    else
		return(



			<div>
        <meta charSet="utf-8" />
        <title>Home</title>
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
          
            <Timeline_Right cate = {this.state.cate} changeUpload = {this.changeUpload}  category_handler = {this.category_handler}/>
            <div className="content_lft">
            <div className="contnt_1">
            <div className="list_1">
              <ul>
                <li>
                  <input type="checkbox" className="chk_bx" />
                  Friends</li>
                <li>
                  <input type="checkbox" className="chk_bx" />
                  Flaged</li>
              </ul>
            </div>
            <div className="timeline_div">
              <div className="timeline_div1">
                <div className="profile_pic">
                  <img src="images/timeline_img1.png" />
                  <div className="profile_text"><a href="#">Change Profile Pic</a></div>
                </div>
                <div className="profile_info">
                  <div className="edit_div"><a href="#">Edit <img src="images/timeline_img.png" /></a></div>
                  <div className="profile_form">
                    <ul>
                      <li>
                        <div className="div_name1">Name :</div>
                        <div className="div_name2">Stefiney Gibbs</div>
                      </li>
                      <li>
                        <div className="div_name1">Sex :</div>
                        <div className="div_name2">Female</div>
                      </li>
                      <li>
                        <div className="div_name1">Description :</div>
                        <div className="div_name3">This is an example of a comment. You can create as many comments like this one
                          or sub comments as you like and manage all of your content inside Account.</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="timeline_div2">
                <ul>
                  <li><a href="#" className="active">Timeline    </a></li>
                  <li><a href="#">About  </a></li>
                  <li><a href="#">Album</a></li>
                  <li><a href="#"> Pets</a></li>
                  <li><a onClick = {this.myupload}>My Uploads </a></li>
                </ul>
              </div>
            </div>
            <div className="post_div">
<div className="post_list">
<ul className="post_list_ul">
<li><a onClick={this.newfirst}><span className="list_img"><img src="images/img_1.png" /></span>Latest First</a></li>
<li><a onClick={this.oldfirst}><span className="list_img"><img src="images/img_2.png" /></span>Oldest First</a></li>
<li><a href="#"><span className="list_img"><img src="images/img_3.png" /></span>Most Pet</a></li>
<li><a href="#"><span className="list_img"><img src="images/img_4.png" /></span>Most Clicks</a></li>
<li><a onClick={this.mostcommented}><span className="list_img"><img src="images/img_5.png" /></span>Most Commented</a></li>
</ul>
</div>
</div>
          </div>
          
              {this.showUpload()}
              
              {
                this.state.pos.map((pos) =>
                { 
                  if(this.state.my == true && pos.username == localStorage.username)
                  
                    return(
                      <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">{pos.caption}</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">{pos.category}</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft"><img src="images/img_6.png" />{pos.fname} {pos.lname}</div>
                    <div className="div_top_rgt"><span className="span_date">{pos.date}</span></div>
                  </div>
                  <div className="div_image"><img src={pos.imageName} alt="pet" onClick = {() => this.clickPost(pos._id)} /></div>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>{pos.comment.length} Comments</a></li>
                        {this.likeorunlike(pos)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

                    )
                    else if(this.state.my == false)
                    return(
                      <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">{pos.caption}</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">{pos.category}</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft"><img src="images/img_6.png" />{pos.fname} {pos.lname}</div>
                    <div className="div_top_rgt"><span className="span_date">{pos.date}</span></div>
                  </div>
                  <div className="div_image"><img src={pos.imageName} alt="pet" onClick = {() => this.clickPost(pos._id)} /></div>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>{pos.comment.length} Comments</a></li>
                        {this.likeorunlike(pos)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

                    )
                })
              }
            </div>
          </div>
          <div className="clear" />
        </div>
        <Footer />
      </div>

			
			
			)
	}
}

export default Timeline;