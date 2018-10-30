/* eslint-disable */
import React, { Component } from 'react';
import Upload_Category from './upload_category';

class Timeline_Right extends Component {
  constructor(props){
    super(props);
    this.state = {isCategory : false};

  }

  changeCategory = () => {
    this.setState({isCategory : this.state.isCategory ? false : true});
    this.props.category_handler();
  }

  showCategory = () => {
    if(this.state.isCategory)
    return (<Upload_Category changeCategory = {this.changeCategory}/>)
  }


    render(){
      
        return(
            <div>
            <div className="content_rgt">
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep"/></span> <a href="#" onClick = {this.props.changeUpload}>Upload Post</a> </div>
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#" onClick = {this.changeCategory}>Add Categories</a> </div>
              {this.showCategory()}
              
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                <div className="rght_list">
                  <ul>
                  {
                    this.props.cate.map((cat) =>
                    {
                      
                        return(<li value={cat.category}><span className="list_icon"><img src={cat.imageName} alt="up" style = {{width : '40px' , height : '40px'}}/></span> {cat.category}</li>)
                    })
                  }
                   </ul>
                </div>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img1.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Cats</div>
                    </div>
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
            {this.state.isCategory}
        </div>
        );
    }
}
export default Timeline_Right;