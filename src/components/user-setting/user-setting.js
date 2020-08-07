import React, { Component, Fragment, useState } from 'react';
import {connect} from 'react-redux';
import Header from '../header';
import {toggleModal , sendReferralCode, getPropertyById} from '../../redux-container';
import {USER_ACCOUNT_DETAILS} from '../../redux-container/constants/constantSessionKey';


class UserSetting extends Component {
   constructor(props){
      super(props);
   }
  
render() {
      let user =[] , siteVisit = [];
   
      if(JSON.parse(sessionStorage.getItem(USER_ACCOUNT_DETAILS))){
         user = JSON.parse(sessionStorage.getItem(USER_ACCOUNT_DETAILS))['user_details'];
         siteVisit = JSON.parse(sessionStorage.getItem(USER_ACCOUNT_DETAILS))['site_visit_request']
      }
 
let siteDiv = "";
if(siteVisit){
      siteDiv = siteVisit.map((site,index)=>{
         console.log(site);
         console.log(site['property_detail']['property_name']);
            return (<div key={index} className="item-wrap infobox_trigger homey-matchHeight slick-slide slick-cloned" data-slick-index="-3" aria-hidden="true" tabIndex="-1" style={{width: '383px',}}>
            <div className="media property-item">
               <div className="media-left">
                  <div className="item-media item-media-thumb" style={{height: '280px',}}>
                     <span className="label-wrap top-left">
                        <span className="label label-success label-featured">Featured</span>
                     </span>
                     <a className="hover-effect" tabIndex="-1" href="/">
                        <img width="450" height="300" className="img-responsive wp-post-image" src={site['property_detail']['image_url']}/>
                     </a>
                     <div className="item-media-price">
                           <span className="item-price">
                                        <sup>Rs</sup>{site['property_detail'] && site['property_detail']['startingPrice']}<sub>/month</sub>
                           </span>
                        <span className="item-user-image item-price" style={{fontSize: '18px'}}>
                        {site['property_detail'] && site['property_detail']['occupancy_type'] === 'BOTH' ? 'Boys & Girls' : site['property_detail']['occupancy_type'] === 'GIRLS' ? 'Girls only' : 'Boys only'}
                        </span>
                     </div>
                  </div>
               </div>
               <div className="media-body item-body clearfix">
                  <div className="item-title-head table-block">
                     <div className="title-head-left">
                        <h2 className="title"><a href="https://demo01.gethomey.io/listing/designer-loft-with-pool/" tabIndex="-1">
                           {site['property_detail']['property_name']}
                        </a>
                        </h2>
                        <address className="item-address"> 
                        {site['property_detail'] && site['property_detail']['address']} , {site['property_detail'] && site['property_detail']['landmark']} , {site['property_detail'] && site['property_detail']['city']} , {site['property_detail'] && site['property_detail']['state']} ,  {site['property_detail'] && site['property_detail']['pin_code']}
                        </address>
                        <address className="item-address">
                           <b> Visit Requested On :</b> {site && site['visit_time']}
                        </address>
                     </div>
                  </div>
                   <ul className="item-amenities-button">
                     <li>
                        <button className=" btn  btn-grey-outlined" tabIndex="-1" onClick={()=>this.props.getPropertyById(site['property_detail']['id'])}>Explore</button>
                     </li>
                  </ul>  
                  <div className="item-user-image list-item-hidden"><img width="36" height="36" src="https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost16-150x150.jpg"
                   className="img-responsive img-circle" alt="" sizes="(max-width: 36px) 100vw, 36px"/>                 
                     <span className="item-user-info">Hosted by<br/>Julia Morris</span></div>
                  <div className="item-footer"></div>
               </div>
            </div>
         </div>) 
})}








    return (
      <Fragment>
        <Header/>
        <div id="section-body" style={{paddingTop: '0px',}}>

    <section className="main-content-area">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9">
                    <div className="page-title">
                        <div className="block-top-title"> 
                            <h1 className="listing-title">User Profile</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<div className="bg-white">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                    <div className="page-wrap">
                        <div className="article-main">
                            <article id="post-1328" className="single-page-article block post-1328 page type-page status-publish hentry">
                                <div className="article-detail block-body"> 
                                    <div className="row wpb_row vc_row-fluid">
                                        <div className="wpb_column vc_column_container col-sm-12">
                                        <div className="media">
  <div className="media-left">
    <div className="user-avatar user-avatar-xl fileinput-button">
               <div className="fileinput-button-label"> Change photo </div>
                 
                 {user['profile_url'] ? <img width="42" height="42" style={{'borderRadius': '24px'}} src={user['profile_url']}></img> :
                  <div className="user-img" style={{width:'50px',height:'50px', lineHeight: '45px'}}><span className="bold-word-400">
                  {user && user['first_name'] && user['first_name'].substring(0,1)}</span></div> }
    </div>
  </div>
         <div className="media-body">
               <h3 className="card-title" style={{margin: '0 0 2px'}}> {user['first_name']} {user['last_name']}</h3>
                            <h6 className="card-subtitle text-muted" style={{fontWeight: '600'}}> 
                                <a onClick={()=>this.props.toggleModal('referral')}>Refer a friend</a>
                           </h6>
                            {/* <p className="card-text">
                              <small>JPG, GIF or PNG 400x400, &lt; 2 MB.</small>
                            </p>  */}
                            <div id="progress-avatar" className="progress progress-xs fade">
                              <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                            </div> 
                        </div>
                     </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-sm-12">
                                      <form method="post"> 
                          <div className="form-row"> 
                            <div className="col-md-4 mb-3">
                              <label htmlFor="input01">First Name</label>
                              <input type="text" className="form-control" id="input01" defaultValue={user['first_name']}/> </div> 
                            <div className="col-md-4 mb-3">
                              <label htmlFor="input02">Last Name</label>
                              <input type="text" className="form-control" id="input02" defaultValue={user['last_name']}/> </div> 
                              <div className="col-md-4 mb-3">
                              <label htmlFor="input03">Email</label>
                            <input type="email" className="form-control" id="input03" defaultValue={user['email']}/> </div>
                          </div>  

                          <div className="form-row"> 
                           <div className="col-md-4 mb-3">
                              <label htmlFor="input04">Mobile</label>
                              <input type="text" className="form-control" id="input04" defaultValue={user['mobile']}/> 
                           </div> 
                           <div className="col-md-4 mb-3">
                              <label htmlFor="input05">User Type</label>
                              <input type="text" className="form-control" id="input05" defaultValue={user['user_type']}/>
                           </div> 
                           <div className="col-md-4 mb-3">
                              <label htmlFor="input03">Gender</label>
                              <input type="text" className="form-control ml-auto mr-3" id="input06" placeholder="Gender"/>
                          </div> 
                          <hr/>  
                           <div className="form-row"> 
                              {/* <div className="col-md-4 mb-3">
                              <button type="submit" className="btn btn-primary" disabled="">Update Account</button>
                              </div> */}
                           </div>  
                          </div> 
                        </form>
                     </div>
                     </div>
                  </div>
                  </article>
                  </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </section>
   <section className="main-content-area listing-page listing-page-full-width">
   <div className="container">
      <div className="row">
         <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="vc_row wpb_row vc_row-fluid">
               <div className="wpb_column vc_column_container vc_col-sm-12">
                  <div className="vc_column-inner">
                     <div className="wpb_wrapper">
                        <div className="homey-module module-title section-title-module text-left ">
                        {siteVisit ? <h2>Site Visit Requested</h2> : <h2>No Site Visit Requested Yet</h2> }
                        </div> 
                        <div style={{clear: 'both', width: '100%', height: '30px',}}></div>
                        <div className="module-wrap property-module-grid listing-carousel-next-prev-P2bDw property-module-grid-slider property-module-grid-slider-3cols">
                           <div className="listing-wrap item-grid-view">
                              <div className="row">
                                 <div id="homey-listing-carousel-P2bDw" data-token="P2bDw" className="homey-carousel homey-carouse-elementor item-grid-slider-view item-grid-slider-view-3cols slick-initialized slick-slider slick-dotted">
                                    <div className="slick-list draggable">
                                       <div className="slick-track" style={{opacity: '1', width: '1500px',}}>
                                          {siteDiv}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div style={{clear: 'both', width: '100%', height: '30px',}}></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div className="modal fade custom-modal-login in hideModal" id="modal-login" tabIndex="-1" role="dialog">
      <div className="modal-dialog clearfix" role="document">
         <div className="modal-body-left pull-left" style={{backgroundImage: 'url(&quot;https://demo01.gethomey.io/wp-content/uploads/2018/10/01-3.jpg&quot;)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: '50% 50%',}}>
            <div className="login-register-title">Schedule Visit</div>
         </div>
         <div className="modal-body-right pull-right">
            <div className="modal-content">
               <div className="modal-header">
                  <button type="button" className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                  <h4 className="modal-title">  Schedule Visit</h4>
               </div>
               <div className="modal-body">
                  <div className="homey_login_messages message"></div>
                  <div className="modal-login-form">
                     <p className="text-center"><strong></strong></p>
                     <div className="form-group"><input type="datetime-local" name="date-time" className="form-control email-input-2" placeholder="Date/Time"/></div>
                     <br/><button type="button" className="homey_login_button btn btn-primary btn-full-width">Submit</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
</div>
 <ReferralModal data={this.props}></ReferralModal> 
</Fragment>
      
    );
  }
}


function ReferralModal(props){

   const [mobile, setMobile] = useState(null);
   const [modeType , setModeType] = useState(null);
   const [error , setError] = useState("");
   const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
   const validMobile=RegExp(/^[0-9]+$/);
 
   const saveData = (e) =>{
     let val = e.target.value;
     if(val){
      setMobile(mobile => val);
     } 
   }
 
   const validate = ()=>{   
       let isFormValid = true;
       if(!mobile){
         setError(error => "Please select mobile");
         isFormValid = false;
       }  
 
       if(isFormValid){
          props.data.sendReferralCode(modeType , mobile);
       }
   }

   const validMobileEmailForLinking=(event)=>{
      const {value}= event.target;
       var type;
       if(value){
        if(validEmailRegex.test(value)){
          type='EMAIL';
          setModeType(modeType => "EMAIL");
          setMobile(mobile => value);
          setError(error => "Please select mobile");
         //  this.setState({modeType:'EMAIL'});
         //  this.setState({sendTo:value})
         //  errors['isvalidEmailMobile']=false;
         //  this.setState({sendReq:true});
        }
        else if(validMobile.test(value) && value.length === 10 ){
          type='Mobile';
          setModeType(modeType => "MOBILE");
          setMobile(mobile => value);
          setError(error => "Please select mobile");
         //  this.setState({modeType:'MOBILE'})
         //  this.setState({sendTo:value})
         //  errors['isvalidEmailMobile']=false;
         //  this.setState({sendReq:true});
        }
        else{
         // errors['isvalidEmailMobile']=true;
          setError(error => "Please select mobile");
          type='Invalid';
         //  this.setState({sendReq:false});
        }
      }
    }
 
   return (
   <div className={`modal fade custom-modal-login in ${props.data.openReferralModal ? "showModal" : "hideModal"}`} id="modal-login" tabIndex="-1" role="dialog">
         <div className="modal-dialog clearfix" role="document">
             
               <div className="modal-body-left pull-left" style={{'backgroundImage': 'url(https://demo01.gethomey.io/wp-content/uploads/2018/10/01-3.jpg)' ,  'backgroundSize': 'cover', 'backgroundRepeat' : 'no-repeat' , 'backgroundPosition' : '50% 50%'}}>
                 <div className="login-register-title">
                    Refer             
                 </div>
               </div>
             
             <div className="modal-body-right pull-right">
                 <div className="modal-content">
                     <div className="modal-header">
                         <button type="button" className="close" aria-label="Close" onClick={()=>props.data.toggleModal('referral')}><span aria-hidden="true">×</span></button>
                         <h4 className="modal-title">Refer Friend</h4>
                     </div>
                     <div className="modal-body">
                        <div className="homey_login_messages message"></div>
                             <div className="modal-login-form">
                                <p className="text-center"><strong></strong></p>
                               
                                <div className="form-group">
                                    <input text="input" name="mobile" placeholder="Mobile/Email" type="text" className={error  ? "req-error" : "form-control refer-input" }  
                                    onInput={(e)=>{saveData(e)}} onChange={validMobileEmailForLinking}/>
                                 </div>

                                 <div className="form-group">    
                                    <button type="button" className="homey_login_button btn btn-primary btn-full-width mt-5"  onClick={(e)=>validate(e)}>Submit</button>
                                 </div>   
                             </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>     
   );
 }
 

 //export default UserSetting;
const mapStateToProps = state => {
   console.log("*******************");
   console.log(state);
   return {
      openReferralModal : state.header['referral-modal'],
   }
}
 
const mapDispatchToProps = dispatch =>{
   return{
     toggleModal: type => dispatch(toggleModal(type)),
     sendReferralCode:(modeType , userId)=> dispatch(sendReferralCode(modeType , userId)),
     getPropertyById:(id) => dispatch(getPropertyById(id)),
   }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(UserSetting);
