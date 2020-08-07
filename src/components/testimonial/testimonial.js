import React, { Component, Fragment } from 'react';
import Header from '../header';
import {TESTIMONIAL_INFO} from '../../redux-container/constants/constantSessionKey';
import './testimonial.css';

class Testimonial extends Component {
    constructor(props){
        super(props);
    }

render() {
    let data = [];
    if(JSON.parse(sessionStorage.getItem(TESTIMONIAL_INFO))){
        data = JSON.parse(sessionStorage.getItem(TESTIMONIAL_INFO));
    }

    console.log(data);

    return (
      <Fragment>
        <Header/>
        <div id="section-body" style={{paddingTop: '83px',}}>
        <section className="main-content-area listing-page listing-page-full-width">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="vc_row wpb_row vc_row-fluid">
                        <div className="wpb_column vc_column_container vc_col-sm-12">
                            <div className="vc_column-inner">
                                <div className="wpb_wrapper">
                                    <div style={{clear:'both', width:'100%', height:'20px',}}></div>
                                    <div className="homey-module module-title section-title-module text-left ">
                                        <h2 style={{fontSize: '30px', lineHeight: '40px',}}>The Testimonials</h2>
                                        <p className="sub-heading"></p>
                                    </div>
                                    {/* <div className="wpb_text_column wpb_content_element ">
                                        <div className="wpb_wrapper">
                                            <p>This page displays the Partners module. This custom WP Bakery Page Builder (Visual Composer) module helps you to display your&nbsp,partner logos&nbsp,on a nice carousel style.&nbsp,The module provides options to manage the page content.</p>
                                        </div>
                                    </div>
                                    <div className="vc_separator wpb_content_element vc_separator_align_center vc_sep_width_100 vc_sep_dotted vc_sep_pos_align_center vc_separator_no_text"><span className="vc_sep_holder vc_sep_holder_l"><span style={{borderColor:'#d8dce1',}} className="vc_sep_line"></span></span><span className="vc_sep_holder vc_sep_holder_r"><span style={{borderColor:'#d8dce1',}} className="vc_sep_line"></span></span>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="vc_row wpb_row vc_row-fluid">
                        <div className="wpb_column vc_column_container vc_col-sm-12">
                            <div className="vc_column-inner">
                                <div className="wpb_wrapper">
                                    {/* <div className="homey-module module-title section-title-module text-center ">
                                        <h2>Grid View 3 Columns</h2>

                                        <p className="sub-heading">Testimonials Module</p>
                                    </div> */}
                                    <div style={{clear:'both', width:'100%', height:'20px',}}></div>

                                    <div className="module-wrap testimonials-module">
                                        <div className="row">

                                           {data && data.map((val , index)=>{ 
                                               return <div key={index} className="col-xs-12 col-sm-6 col-md-3">
                                                            <div className="testimonial-item text-center">
                                                            <p className="description">{val['feedback']}</p>
                                                            <div className="testimonial-thumb">
                                                            {val['profile_url'] ? <img width="120" height="120" src="https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost21-150x150.jpg" className="img-circle img-responsive" alt="{`Profile image of`+val['first_name']}" 
                                                            sizes="(max-width: 120px) 100vw, 120px"/> :
                                                             <div className="user-img test-image"><span className="bold-word-400">
                                                            {val['first_name'] && val['first_name'].substring(0,1)}</span></div>}
                                                            </div>
                                                            <p className="auther-info"><strong>{val['first_name']} {val['last_name']}</strong>
                                                            <br/><em>{val['desgination']}</em></p>
                                                      </div>
                                            </div>})}
                                            {/* <div className="col-xs-12 col-sm-6 col-md-3">
                                                <div className="testimonial-item text-center">
                                                    <p className="description">Lorem ipsum dolor sit amet, adipiscing elit. Proin facilisis neque. Integer eu mollis. </p>
                                                    <div className="testimonial-thumb"><img width="120" height="120" src="https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost23-1-150x150.jpg" className="img-circle img-responsive" alt="" srcSet="https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost23-1-150x150.jpg 150w, https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost23-1-300x300.jpg 300w, https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost23-1-250x250.jpg 250w, https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost23-1-360x360.jpg 360w, https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost23-1.jpg 400w" sizes="(max-width: 120px) 100vw, 120px"/></div>
                                                    <p className="auther-info"><strong>Harold Warren</strong>
                                                        <br/><em>Homey Host</em></p>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-3">
                                                <div className="testimonial-item text-center">
                                                    <p className="description">Proin facilisis neque. Integer eu mollis montem. Lorem ipsum dolor sit amet, adipiscing elit. </p>
                                                    <div className="testimonial-thumb"><img width="120" height="120" src="https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost07-150x150.jpg" className="img-circle img-responsive" alt="" srcset="https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost07-150x150.jpg 150w, https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost07-300x300.jpg 300w, https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost07-250x250.jpg 250w, https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost07-360x360.jpg 360w, https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost07.jpg 400w" sizes="(max-width: 120px) 100vw, 120px"/></div>
                                                    <p className="auther-info"><strong>Michelle Wright</strong>
                                                        <br/><em>Homey Host</em></p>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>


                                    <div style={{clear:'both', width:'100%', height:'50px'}}></div>
                                    {/* <div className="vc_separator wpb_content_element vc_separator_align_center vc_sep_width_100 vc_sep_dotted vc_sep_pos_align_center vc_separator_no_text"><span className="vc_sep_holder vc_sep_holder_l"><span style={{borderColor:'#d8dce1',}} className="vc_sep_line"></span></span><span className="vc_sep_holder vc_sep_holder_r"><span style={{borderColor:'#d8dce1',}} className="vc_sep_line"></span></span>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    </section>

</div>
      </Fragment>
    );
  }
}

export default Testimonial;
