import React, { Component, Fragment } from 'react';
import Header from '../header';
import { connect } from 'react-redux';
import {TERMS_CONDITIONS} from '../../redux-container/constants/constantSessionKey';

class TermsCondition extends Component {
constructor(props){
    super(props);
}

  render() {
    let termsData = [];
    if(sessionStorage.getItem(TERMS_CONDITIONS)){
        termsData =  JSON.parse(sessionStorage.getItem(TERMS_CONDITIONS)); 
    }

    console.log(termsData);

    return <Fragment>
       <Header/>
    <div id="section-body" style={{paddingTop: '0px',}}>
      <section className="main-content-area">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9">
                    <div className="page-title">
                        <div className="block-top-title">
                            <ol className="breadcrumb">
                                <li itemScope="" itemType="http://data-vocabulary.org/Breadcrumb"><a itemProp="url" href="https://demo01.gethomey.io/"><span itemProp="title">Home</span></a></li>
                                <li className="active">Terms & Conditions</li>
                            </ol>
                            <h1 className="listing-title">Terms & Conditions</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                    <div className="page-wrap">
                        <div className="article-main">
                            <article id="post-1328" className="single-page-article block post-1328 page type-page status-publish hentry">
                                <div className="term-detail block-body">
                                    {/* <div className="row wpb_row vc_row-fluid">
                                        <div className="wpb_column vc_column_container col-sm-12">
                                            <div className="vc_column-inner">
                                                <div className="wpb_wrapper">
                                                    <div className="wpb_text_column wpb_content_element ">
                                                        <div className="wpb_wrapper">
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi est quam, volutpat et arcu eu, pharetra congue augue. Integer vel nibh eu eros interdum commodo. Vivamus finibus fringilla libero, id consectetur purus sollicitudin vel. Proin dapibus ante et pharetra luctus. Ut lacinia ante ut nunc pellentesque auctor. Proin laoreet erat sed ornare molestie.</p>

                                                        </div>
                                                    </div>
                                                    <div className="vc_separator wpb_content_element vc_separator_align_center vc_sep_width_100 vc_sep_pos_align_center vc_separator_no_text"><span className="vc_sep_holder vc_sep_holder_l"><span style={{borderColor:'#d8dce1',}} className="vc_sep_line"></span></span><span className="vc_sep_holder vc_sep_holder_r"><span style={{borderColor:'#d8dce1',}} className="vc_sep_line"></span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="row wpb_row vc_row-fluid">
                                        <div className="wpb_column vc_column_container col-sm-12">
                                            <div className="vc_column-inner">
                                                <div className="wpb_wrapper">
                                                    {/* <div className="wpb_text_column wpb_content_element ">
                                                        <div className="wpb_wrapper">
                                                            <div>
                                                                <div className="_1rlifxji">
                                                                    <div className="_12ei9u44">
                                                                        <h2 className="_tpbrp" tabIndex="-1">Recommended for you</h2>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div> */}
                                                    <div id="1457564614680-0f2cb9e8-eaaf" className="vc_toggle vc_toggle_default vc_toggle_color_default  vc_toggle_size_md vc_toggle_active">
                                                        {/* <div className="vc_toggle_title">
                                                            <h4>How long does the booking process take?</h4> <i className="vc_toggle_icon"></i></div> */}
                                                        {/* {termsData} className="vc_toggle_content"*/}
                                                          <ul>
                                                            {termsData && termsData.map((tval , index)=>{
                                                                return <li key={index}>
                                                                    {tval['term_description']}
                                                                </li> 
                                                            })}
                                                         </ul>
                                                        
                                                       
                                                    </div> 
                                                    {/* <div className="vc_separator wpb_content_element vc_separator_align_center vc_sep_width_100 vc_sep_dotted vc_sep_pos_align_center vc_separator_no_text vc_custom_1540486621384  vc_custom_1540486621384"><span className="vc_sep_holder vc_sep_holder_l"><span style={{borderColor:'#d8dce1',}} className="vc_sep_line"></span></span><span className="vc_sep_holder vc_sep_holder_r"><span style={{borderColor:'#d8dce1',}} className="vc_sep_line"></span></span>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                </div>
                            </article>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </section>
</div>
	
    </Fragment>;
  }
}


const mapStateToProps = state => {
  return {
    loggedIn : state.signin['loggedIn'],
    loggedInUsername : state.signin['userData']['name'],
    authenticated : state.signup['authenticated'],
    loading : state.signup['loading'], 
  }
}

// const mapDispatchToProps = (dispatch) =>{
//    return {
//       toggle: type => dispatch(toggleModal(type)),
//       logout:() => dispatch(logoutApp()),
//       getTopTrendingProperty : () => dispatch(getTopTrendingProperty()),
//       getTermsAndCondition:()=>dispatch(getTermsAndCondition()),
//       getUserDetails : () => dispatch(getUserDetails())
//    }
// }

export default connect(mapStateToProps,null)(TermsCondition);
