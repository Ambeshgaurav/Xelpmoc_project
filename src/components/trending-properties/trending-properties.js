import React, { Component,useState, Fragment } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {getTopTrendingProperty , getPropertyById,getScheduleVisit , getOTP , verifyOTP , toggleModal} from '../../redux-container';
import './trending-properties.css';
import {ACCESS_TOKEN,USER_DATA,PROPERTY_ARRAY,TRENDING_PROPERTY,USER_ID} from '../../redux-container/constants/constantSessionKey';
import {DateTimePicker } from '@progress/kendo-react-dateinputs'
import '@progress/kendo-react-intl'


class TrendingProperties extends Component {
   constructor(props){
      super(props);
      this.state={
         property_id:'',
      }
      this.secheduleVisit=this.secheduleVisit.bind(this);
   }

   secheduleVisit(prptyId){
      this.setState({property_id:prptyId})
       this.props.toggleModal('schedulevisit');
   }
  

  render() {
     let data = [];
     if(JSON.parse(sessionStorage.getItem(TRENDING_PROPERTY))){
         data =  JSON.parse(sessionStorage.getItem(TRENDING_PROPERTY));
     }else{
         data = this.props.propertyData;
      }

      let userId = sessionStorage.getItem(USER_ID);

     console.log(data);

   return (
   <section className="main-content-area listing-page listing-page-full-width">
   <div className="container">
      <div className="row">
         <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="vc_row wpb_row vc_row-fluid">
               <div className="wpb_column vc_column_container vc_col-sm-12">
                  <div className="vc_column-inner">
                     <div className="wpb_wrapper">
                        <div style={{clear:'both', width:'100%', height:'50px'}}></div>
                        <div className="homey-module module-title section-title-module text-left ">
                           {data['result'] && data['result'].length>0 ?<h2>Trending Properties</h2>:<h2>No Trending Properties</h2>}
                           {/* <p className="sub-heading">Hand-picked selection of quality places</p> */}
                        </div>
                        <div style={{clear:'both', width:'100%', height:'30px'}}></div>
                        <div className="module-wrap property-module-grid listing-carousel-next-prev-P2bDw property-module-grid-slider property-module-grid-slider-3cols">
                           {/* <button type="button" className="slick-prev slick-arrow" style={{display: 'block',}}>Prev</button> */}
                           <div className="listing-wrap item-grid-view">
                              <div className="row">
                                 <div id="homey-listing-carousel-P2bDw" data-token="P2bDw" className="homey-carousel homey-carouse-elementor item-grid-slider-view item-grid-slider-view-3cols slick-initialized slick-slider slick-dotted">
                                    <div className="slick-list draggable">
                                      <div className="slick-track" style={{opacity: '1', width: '1500px'}}>
                                    {data['result'] && data['result'].map((property, index)=>{
                                        return <div key={ index } className="item-wrap infobox_trigger homey-matchHeight slick-slide slick-cloned"  aria-hidden="true" style={index>2 ? {marginTop: '12px' , width: '383px'} : {width: '383px'}} tabIndex="-1">
                                             <div className="media property-item">
                                                <div className="media-left">
                                                   <div className="item-media item-media-thumb" style={{height: '280px'}}>
                                                      <span className="label-wrap top-left">
                                                      <span className="label label-success label-featured">Featured</span>
                                                      </span>
                                                      <Link className="hover-effect" to="#" tabIndex="-1">
                                                        <img width="450" height="300" alt="" src= {property['image_url']} className="img-responsive wp-post-image" />          
                                                      </Link>
                                                      <div className="item-media-price">
                                                         <span className="item-price">
                                                         <sup>Rs</sup>{property['startingPrice']}<sub>/month</sub>
                                                         </span>
                                                         <span className="item-user-image item-price" style={property['occupancy_type'] === 'BOTH' ? {'fontSize': '18px' } : {'fontSize': '18px'}}>                      
                                                         {property && property['occupancy_type'] === 'BOTH' ? 'Boys & Girls' : property['occupancy_type'] === 'GIRLS' ? 'Girls only' : 'Boys only'}
                                                         </span>
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="media-body item-body clearfix">
                                                   <div className="item-title-head table-block">
                                                      <div className="title-head-left">
                                                         <h2 className="title"><a href="https://demo01.gethomey.io/listing/designer-loft-with-pool/" tabIndex="-1">
                                           {property && property['property_name']}</a>
                                                         </h2>
                            <address className="item-address">{property['address']}, {property['landmark']}, {property['city']}, {property['state']}, {property['pin_code']} </address>
                                                      </div>
                                                   </div>
                                                   <ul className="item-amenities-button">
                                                      <li>
                                                         <button className=" btn  btn-grey-outlined" tabIndex="-1" onClick={()=>this.props.getPropertyById(property['id'],userId)}>Explore</button>
                                                      </li>
                                                      <li>
                                                         <button className=" btn btn-primary"  onClick={()=>this.secheduleVisit(property['id'])}>Schedule Visit</button>
                                                      </li>
                                                      
                                                   </ul>
                                                   <div className="item-user-image list-item-hidden">
                                                      <img width="36" height="36" src="https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost16-150x150.jpg" className="img-responsive img-circle" alt="" srcSet="https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost16-150x150.jpg 150w, https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost16-300x300.jpg 300w, https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost16-250x250.jpg 250w, https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost16-360x360.jpg 360w, https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost16.jpg 400w" sizes="(max-width: 36px) 100vw, 36px"/>                    <span className="item-user-info">Hosted by<br/>
                                                      Julia Morris</span>
                                                   </div>
                                                   <div className="item-footer">
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                    })}      
                                      </div>
                                    </div>  
                                 </div>
                              </div>
                           </div>
                           
                           {/* <button type="button" className="slick-next slick-arrow" style={{display: 'block'}}>Next</button> */}
                        </div>
                        <div style={{clear:'both', width:'100%', height:'30px'}}></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         
      </div>
      
   </div>
     
       <ScheduleVisit data={this.props} propertyId={this.state['property_id']}></ScheduleVisit>
   </section>
  );
  }
}


//Schedule Visit
 function ScheduleVisit(props){
   const [date_time ,setDateTime] = useState((new Date()).toISOString());
   const [first_name, setFirstName] = useState('');
   const [last_name, setLastName] = useState('');
   const [mobile, setMobile] = useState('');

   const [error_mobile ,setErrorMobile] = useState(null);
   const [error_first_name, setErrorFirstName] = useState(null);
   const [error_last_name, setErrorLastName] = useState(null);
   const [error_date_time, setErrorDateTime] = useState("");

  
  
   let token;
   token=sessionStorage.getItem(ACCESS_TOKEN);
   console.log(token);    

    let property_id ,user_data=[],user_id;
    if(JSON.parse(sessionStorage.getItem(USER_DATA))){
     user_data= JSON.parse(sessionStorage.getItem(USER_DATA));
    }
    let isOtpVerified= JSON.parse(sessionStorage.getItem('OtpVerified'));
     console.log(user_data);
     if(Object.keys(user_data).length > 0){
         user_id=user_data['id'];
     }
      if(props.propertyId){
         console.log(props.propertyId);
         property_id=props.propertyId;
      }
    
   const saveData = (e) =>{
      console.log(e.target.value);
      let val = e.target.value;
      let name = e.target.name;
      if(val && name === 'first_name'){
         setFirstName(first_name => val)
      }else if(val && name === 'last_name'){
         setLastName(last_name => val)
      }else if(val && name === 'mobile'){
         setMobile(mobile => val)
      }else if(val){
         val= val.toISOString();
         setDateTime(date_time => val);;
      }
   }
   const isValidate=(e)=>{
      let name = e.target.name;
      let value = e.target.value;
      if(!token){
         switch(name){
            case "first_name" :{
               if(value.length){
               setErrorFirstName(error_first_name => false);
               }
               else{
               setErrorFirstName(error_first_name => true);
               }
              break;
            } 
            case "last_name" :{
                 if(value){
                  setErrorLastName(error_last_name => true);
                  }
                  else{
                  setErrorLastName(error_last_name => true);
                  }
              break;
            } 
            case "mobile" :{
               if(value.length){
                  if(value.length === 10 ){
                     setErrorMobile(error_mobile => false);
                  }
                  else{
                     setErrorMobile(error_mobile => true);
                  }
                }
                else{
                  setErrorMobile(error_mobile => true);
                }
             break;
          } 
            default : return false
          }
      }
   }
  const numberOnly=(event)=>{
      const pattern =/^[0-9. ]+$/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !==8 && !pattern.test(inputChar))
      {
          event.preventDefault();}
    }
   const checkMobileNoOnOtpBtn = ()=>{
      let formIsValid = true;
     
        if(!mobile){
          formIsValid = false;
          setErrorMobile(error_mobile => true);
        }else{
         setErrorMobile(error_mobile => false);
        }
   
        console.log(mobile);
        console.log(error_mobile);
        if(formIsValid){
          props.data.getOtp('MOBILE' , mobile,'send');
        }
    }
    
   const checkValidationOnSubmit= ()=>{
     let formIsValid = true;
     console.log('check val..');
      let token=sessionStorage.getItem(ACCESS_TOKEN);
      if(!token){
          if(!first_name){
            formIsValid = false;
            setErrorFirstName(error_first_name => true);
          }
          if(!last_name){
            formIsValid = false;
            setErrorLastName(error_last_name => true);
          }
          if(!mobile){
            formIsValid = false;
            setErrorMobile(error_mobile => true);
          }
         //  if(!date_time){
         //    formIsValid = false;
         //    setErrorDateTime(error_date_time => true);
         //  }
      }else{
         // if(!date_time){
         //    formIsValid = false;
         //    setErrorMobile(error_date_time => true);
         //  }
      }    

      console.log(formIsValid);
          if(formIsValid){
            submitData();
          }
    }
    
    const submitData=(e)=>{
       console.log('submit');
       let data = {};
         if(token){
            data ={
               user_id:user_id,
               property_id:property_id,
               visit_time:date_time.toString(),
            }
         }else{
            data={
               first_name : first_name,
               last_name : last_name,
               mobile : mobile,
               property_id:property_id,
               visit_time:date_time.toString(),
            }
         }
     
     props.data.getScheduleVisit(data);
     //resetModal();
   }

   const resetModal=()=>{
      setFirstName(first_name => '');
      setLastName(last_name => '');
      setMobile(mobile => '');
      setDateTime(date_time => '');
      setErrorFirstName(error_first_name => '');
      setErrorLastName(error_last_name => '');
      setErrorDateTime(error_date_time => '');
      setErrorMobile(error_mobile => '');
      
      props.data.toggleModal('schedulevisit');
   }

  
   return (
      <Fragment>
      <div className={`modal fade custom-modal-login in ${props.data.openScheduleModal ? "showModal" : "hideModal"}`} id="modal-login" tabIndex="-1" role="dialog">
      <div className="modal-dialog clearfix" role="document">
          
            <div className="modal-body-left pull-left" style={{'backgroundImage': 'url(https://demo01.gethomey.io/wp-content/uploads/2018/10/01-3.jpg)' ,  'backgroundSize': 'cover', 'backgroundRepeat' : 'no-repeat' , 'backgroundPosition' : '50% 50%'}}>
              <div className="login-register-title">
                Schedule Visit          
              </div>
            </div>
          
          <div className="modal-body-right pull-right">
              <div className="modal-content">
                  <div className="modal-header">
                      <button type="button" className="close" aria-label="Close" onClick={()=>resetModal()}><span aria-hidden="true">×</span></button>
                      <h4 className="modal-title">Schedule Visit</h4>
                  </div>
                  <div className="modal-body">
                     <div className="homey_login_messages message"></div>
  
                          <div className="modal-login-form">
                             <p className="text-center"><strong></strong></p>
                                 {!token && <div className="form-group">
                                    <input type="text" name="first_name" value={first_name} className={error_first_name  ? "req-error" : "form-control email-input-1" } placeholder="First Name"
                                    onInput={(event)=>{saveData(event);isValidate(event)}}/>
                                 </div>} 
                                 {!token && <div className="form-group">
                                    <input type="text" name="last_name" value={last_name} className={error_last_name  ? "req-error" : "form-control email-input-3" } placeholder="Last Name"
                                    onInput={(event)=>{saveData(event);isValidate(event)}}/>
                                 </div> } 
                                 {!token && <div className="form-group">
                                    <input text="input" name="mobile" value={mobile} placeholder="Mobile" type="text" className={error_mobile  ? "req-error" : "form-control email-input-3" }  
                                    onInput={(event)=>{saveData(event);isValidate(event)}} onKeyPress={(e)=>numberOnly(e)} />
                   
                                 </div>}
                                 <div className={error_date_time  ? "form-group req-error" : "form-group" } >
                                       {/* <input type="datetime-local" name="date_time" className="form-control email-input-2" placeholder="Date/Time" onInput={(e)=>saveData(e)}/> */}
                                       <DateTimePicker
                                          format="dd/MM/yyyy hh:mm:ss"
                                          formatPlaceholder="formatPattern"
                                          min={new Date()}
                                          onChange={(e)=>saveData(e)}
                                          defaultValue={new Date()}
                                       />
                                 </div>  
                                 {!token && <div className="form-group">
                                    {!isOtpVerified && <button data-test="button" type="button"  onClick={()=>checkMobileNoOnOtpBtn()}
                                     className="btn btn-primary btn-full-width Ripple-parent mt-5">Get OTP</button> }
                                     {isOtpVerified && <button data-test="button" type="button"  
                                     className="btn btn-success btn-full-width mt-5 Ripple-parent "> <i className="fa fa-check"></i> Verified</button>   }
                                 </div>}                                
                                
                                 <div className="form-group">    
                                    <button type="button" className="homey_login_button btn btn-primary btn-full-width" onClick={(e)=>checkValidationOnSubmit(e)} disabled={!isOtpVerified && !token}>Submit</button>
                                 </div>   
                                
                        
                          </div>
                  </div>
              </div>
          </div>
      </div>
  </div> 
     <OTPModal data={props.data} mobile={mobile}></OTPModal> 
  </Fragment>       
              
   );
 }


 function OTPModal(props){
   // ote : NDeclare a new state variable, which we'll call "otpNo"  by using useState Hook
   // arg inside useState(null) i.e null is the default value of "otpNo"
   // useState is only work inside functional Component not in class component
   // similar to "this.state = {otpNo : null};"
   const [otpNo, setOtpNo] = useState(null);
   let otpMode  , otpSendTo, verificationType;
     otpMode = 'MOBILE';
     otpSendTo = props['mobile'];
    if(props['mobile']){
     verificationType='mobile';
   }

   const saveData = (e) =>{
     let val = e.target.value;
     if(val){
       setOtpNo(otpNo => val);
     }
   }
   var attemptleft;
    if(props.data.otpDetail!== undefined && props.data.otpDetail!== null && props.data.otpDetail!== '' && props.data.otpDetail!== {} )
    {
     attemptleft= <p className="pull-right margin-0 text-primary">Remaining attempt:{props.data.otpDetail.noOfAttempt}</p>
    }
   return(       
         <div className={`modal fade custom-modal-login in ${props.data.openOtpModal && props.data.openScheduleModal ? "showModal" : "hideModal"}`} id="modal-login" tabIndex="-1" role="dialog">
         <div className="modal-dialog clearfix" role="document">
             
               <div className="modal-body-left pull-left" style={{'backgroundImage': 'url(https://demo01.gethomey.io/wp-content/uploads/2018/10/01-3.jpg)' ,  'backgroundSize': 'cover', 'backgroundRepeat' : 'no-repeat' , 'backgroundPosition' : '50% 50%'}}>
                 <div className="login-register-title">
                     OTP Verification           
                 </div>
               </div>
             
             <div className="modal-body-right pull-right">
                 <div className="modal-content">
                     <div className="modal-header">
                         <button type="button" className="close" aria-label="Close" onClick={()=>props.data.toggleModal('otp')}><span aria-hidden="true">×</span></button>
                         <h4 className="modal-title">Verify OTP</h4>
                     </div>
                     <div className="modal-body">
                        <div className="homey_login_messages message"></div>
     
                             <div className="modal-login-form">
                                <p className="text-center"><strong></strong></p>
                                     {attemptleft}
                                     <div className="form-group">
                                         <input type="text" name="otp" className="form-control email-input-2" placeholder="OTP"
                                         onInput={(e)=>saveData(e)}/>
 
                                     </div>                                   
                                     <p className="margin10" onClick={()=>props.data.getOtp(otpMode , otpSendTo,'resend')}>OTP not received ? <span className="text-info .text-underline .cursor">Resend OTP </span> </p>
                                     <button type="button" className="homey_login_button btn btn-primary btn-full-width" 
                                     onClick={()=>props.data.verifyOtp(otpMode , otpSendTo , otpNo ,verificationType)}>Verify</button>
                           
                             </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>     
     
     )
 }


const mapStateToProps = state => {
   return {
     loading : state.signup['loading'], 
     propertyData : state.property['propertyData'],
     openScheduleModal : state.header['schedule-visit-modal'],
     openOtpModal : state.header['otp-modal'],
     isOtpVerified:state.signup['isOtpVerified'],
     otpDetail: state.signup['otpDetail'],
     resendOTP:state.signup['reSend'],
   }
 }
 
 const mapDispatchToProps = (dispatch) =>{
    return {
       getTopTrendingProperty:()=>dispatch(getTopTrendingProperty()),
       getPropertyById:(id,userId) => dispatch(getPropertyById(id,userId)),
       toggleModal:(type)=> dispatch(toggleModal(type)),
       getScheduleVisit:(data)=>dispatch(getScheduleVisit(data)),
       getOtp : (modeType , sendTo,type) => dispatch(getOTP(modeType , sendTo,type)),
       verifyOtp : (modeType , userId , otpNo , verify) => dispatch(verifyOTP(modeType , userId , otpNo , verify)),
    }
 }
 
export default connect(mapStateToProps,mapDispatchToProps)(TrendingProperties);

