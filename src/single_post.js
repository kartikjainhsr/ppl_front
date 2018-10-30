/*eslint-disable*/
import React, {Component} from 'react';
import Header from './header';
import Footer from './footer';

var flag = {comment : false};

class Single_Post extends Component {


    constructor(props){
        super(props);
        this.state = {pos : '',load : true, load2 : true, hasSubmit : false, comment : '' , comments : ''};
        this.post_handler();
        this.fetch_comment();
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

      changeData = (e) => {
          this.setState({[e.target.name] : e.target.value})
      }

      checkComment = () => {
          if(this.state.comment.length <= 0 && this.state.hasSubmit)
          {
              flag.comment = false;
              return('');
          }
          else if(/\S/.test(this.state.comment) == false && this.state.hasSubmit)
          {
              flag.comment = false;
              return('');
          }
          else if(this.state.comment.length > 0 && /\S/.test(this.state.comment))
          {
              flag.comment = true;
              return('');
          }
      }

      comment_handler = (e) => {
          this.setState({hasSubmit : true});
        if(flag.comment)
        {
            document.getElementById('comment').value = '';
            var opt = {
            headers : {'Accept' : 'application/json','Content-Type':'application/json'},
            method: "POST",
            body :  JSON.stringify({id : this.props.match.params.id, comment : this.state.comment , username : localStorage.username})
            }
        fetch("http://localhost:5000/comment_handler", opt)
            .then((response) => {
                if (response.status == 200) {
                    response.text().then((action)=>
                    {
                      
                        if(action == 'ok')
                        {
                             this.fetch_comment();
                             this.post_handler();
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
      }

      fetch_comment = () => {
        var opt = {
            headers : {'Accept' : 'application/json','Content-Type':'application/json'},
            method: "POST",
            body :  JSON.stringify({id : this.props.match.params.id})
            }
        fetch("http://localhost:5000/fetch_comment", opt)
            .then((response) => {
                if (response.status == 200) {
                    response.text().then((action)=>
                    {
                      const b = JSON.parse(action);
                      
                        if(b.re == 'ok')
                        {
                             this.setState({comments : b.body});
                             this.setState({load : false});
                        }
                        
                    })
                
            }
            })
      
      
            .catch((err) => {
                this.props.history.push('/error');
            });
      }



    render(){
        if(this.state.load2 || this.state.load)
        return(<div></div>)
        else
        return(<div>
            <div>
  <meta charSet="utf-8" />
  <title>Singal Post</title>
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
        <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#">Upload Post</a> </div>
        <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#">Invite Friends</a> </div>
        <div className="rght_cate">
          <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
          <div className="rght_list">
            <ul>
              <li><a href="#"><span className="list_icon"><img src="images/icon_01.png" alt="up" /></span> CATS</a></li>
              <li><a href="#"><span className="list_icon"><img src="images/icon_02.png" alt="up" /></span> Dogs</a></li>
              <li><a href="#"><span className="list_icon"><img src="images/icon_03.png" alt="up" /></span> Birds</a></li>
              <li><a href="#"><span className="list_icon"><img src="images/icon_04.png" alt="up" /></span> Rabbit</a></li>
              <li><a href="#"><span className="list_icon"><img src="images/icon_05.png" alt="up" /></span> Others</a></li>
            </ul>
          </div>
        </div>
        <div className="rght_cate">
          <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
          <div className="sub_dwn">
            <div className="feat_sec">
              <div className="feat_sec_img"><img src="images/feat_img1.png" alt="image" /></div>
              <div className="feat_txt">Lorem Ipusum Text</div>
            </div>
            <div className="feat_sec">
              <div className="feat_sec_img"><img src="images/feat_img2.png" alt="image" /></div>
              <div className="feat_txt">Lorem Ipusum Text</div>
              <div className="btm_rgt">
                <div className="btm_arc">Dogs</div>
              </div>
            </div>
            <div className="feat_sec">
              <div className="feat_sec_img"><img src="images/feat_img3.png" alt="image" /></div>
              <div className="feat_txt">Lorem Ipusum Text</div>
              <div className="btm_rgt">
                <div className="btm_arc">Rabbits</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content_lft">
      {
        this.state.pos.map((pos) =>
        { 
          if(pos._id == this.props.match.params.id)
          
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
          <div className="div_image"><img src={pos.imageName} alt="pet" /></div>
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

        {
            this.state.comments.map((com)=>{
                return(<div className="contnt_3">
                <ul>
                  <li>
                    <div className="list_image">
                      <div className="image_sec"><img src="images/post_img.png" /></div>
                      <div className="image_name">{com.username}</div>
                    </div>
                    <div className="list_info" style = {{ 'word-wrap' : 'break-word'}}>
                      {com.comment}
                    </div>
                    </li>
          </ul>
        </div>
                    )
            })
        }
        
              <div className="cmnt_div">
                <input type="text" placeholder="Add a Comment" name='comment' id='comment' className="cmnt_bx" onChange={this.changeData} />
                <div style={{color : 'red'}}>{this.checkComment()}</div>
                <input type="submit" className="sub_bttn" defaultValue="Submit Comment" onClick={this.comment_handler}/>
                </div>
            




      </div>
    </div>
    <div className="clear" />
  </div>
  <Footer />
</div>
            </div>)
    }
}

export default Single_Post;