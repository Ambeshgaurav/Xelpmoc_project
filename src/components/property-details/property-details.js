import React, { Component, Fragment ,useState} from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import Header from '../header';
import {USER_DATA,PROPERTY_OBJ , ACCESS_TOKEN} from '../../redux-container/constants/constantSessionKey';
import {getTermsAndCondition} from '../../redux-container';
import './property-details.css';
import {FacebookShareCount,
   FacebookShareButton,
   LinkedinShareButton,
   WhatsappShareButton,
   EmailShareButton,
   InstapaperShareButton,
   TwitterShareButton,
   FacebookIcon,
   LinkedinIcon,
   WhatsappIcon,
   EmailIcon,
   InstapaperIcon,
   TwitterIcon
   } from '../../share-property-link';
import {toggleModal , getScheduleVisit , getOTP , verifyOTP,getSharingType,
   getDurationList,getPrice,bookRoom} from '../../redux-container';
import { history } from '../../redux-container/store';
import {DateTimePicker } from '@progress/kendo-react-dateinputs';
import '@progress/kendo-react-intl';
import {toastr} from 'react-redux-toastr';
import {TERMS_CONDITIONS} from '../../redux-container/constants/constantSessionKey';

let propertyId , userId ;


class PropertyDetails extends Component {
   constructor(props){
      super(props);
      console.log(history);
      this.state= {
         'user_id':null,
         'property_id':null,
         'date_time':(new Date()).toISOString(),
         'first_name' : null,
         'last_name' : null,
         'mobile' : null,
         'errors':{
            first_name:false,
            last_name:false,
            mobile:false,
            date_time:false
           },
          
      }
   }


   componentDidMount(){
      sessionStorage.removeItem('OtpVerified'); 
      sessionStorage.removeItem('isOtpVerifiedForLinking'); 
   }

saveData = (e) =>{
   let val = e.target.value ,name = e.target.name  , user_data={} , data={};
   if(val){
      this.setState({[name] : val.toString()});
   }

   if(JSON.parse(sessionStorage.getItem(USER_DATA))){
      user_data= JSON.parse(sessionStorage.getItem(USER_DATA));
   }

   if(Object.keys(user_data).length > 0){
      this.setState({'user_id' : user_data['id']});
      userId = user_data['id']  
   }

   if(JSON.parse(sessionStorage.getItem(PROPERTY_OBJ))){
      console.log(JSON.parse(sessionStorage.getItem(PROPERTY_OBJ)));
      data = JSON.parse(sessionStorage.getItem(PROPERTY_OBJ));
   }
   if(data){
      this.setState({'property_id' : data['id']});
      propertyId = data['id'];
   }

   console.log(this.state); 
}

isValidate=(e)=>{
   let name = e.target.name;
   let value = e.target.value;
   let errors=this.state.errors

   let token=sessionStorage.getItem(ACCESS_TOKEN);
   if(!token){
      switch(name){
         case "first_name" :{
           errors['first_name']=value.length ? false : true;
           break;
         } 
         case "last_name" :{
             errors['last_name']=value.length ? false :true;
           break;
         } 
         case "mobile" :{
            errors['mobile']=value.length && value.length===10? false :true;
          break;
       }    
         default : return false
       }
   }
}
 numberOnly=(event)=>{
   const pattern =/^[0-9. ]+$/;
   let inputChar = String.fromCharCode(event.charCode);
   if (event.keyCode !==8 && !pattern.test(inputChar))
   {
       event.preventDefault();}
 }
checkMobileNoOnOtpBtn(){
   let errors = {} ,
   formIsValid = true;
  
     if(!this.state['mobile']){
       formIsValid = false;
       errors["mobile"] = "Please enter mobile no.";
     }
 
     this.setState({errors: errors}) 
 
     if(formIsValid){
       this.props.getOtp('MOBILE' , this.state['mobile'],'send');
     }
}

 
 
checkValidationOnSubmit(){

   let user_data={} , data={};
   if(JSON.parse(sessionStorage.getItem(USER_DATA))){
      user_data= JSON.parse(sessionStorage.getItem(USER_DATA));
      if(Object.keys(user_data).length > 0){
         this.setState({'user_id' : user_data['id']});
         userId = user_data['id']; 
      }
   }

   if(JSON.parse(sessionStorage.getItem(PROPERTY_OBJ))){
      console.log(JSON.parse(sessionStorage.getItem(PROPERTY_OBJ)));
      data = JSON.parse(sessionStorage.getItem(PROPERTY_OBJ));
      if(data){
         this.setState({'property_id' : data['id']});
         propertyId = data['id'];
      }
   }

   let fields = {} , errors = {},
   formIsValid = true;
   fields = this.state;
   let token=sessionStorage.getItem(ACCESS_TOKEN);
   console.log(fields["date_time"])
   if(!token){
       if(!fields["first_name"]){
           formIsValid = false;
           errors["first_name"] = true;        
       }
       if(!fields["last_name"]){
         formIsValid = false;
         errors["last_name"] = true;        
       }
       if(!fields["mobile"]){
         formIsValid = false;
         errors["mobile"] =true;
       }
       if(!fields["date_time"]){
         formIsValid = false;
         errors["date_time"] =true;
       }
   }else{
       if(!fields["date_time"]){
         formIsValid = false;
         errors["date_time"] = true;
       }
   }    

      this.setState({errors:errors}) 
      console.log(formIsValid);
      console.log(this.state);
      if(formIsValid){
           this.submitData();
      }
 }

handleChange = (event) => {
   console.log(event.target.value);
   let today = event.target.value;
   console.log(today.toISOString());
   today = today.toISOString();
   this.setState({'date_time':today}) 
}

booking=(event)=>{
   event.preventDefault()
   console.log("Booking")
}

submitData=(e)=>{
   console.log(propertyId);
   console.log(userId);
   let data = {};
   let token=sessionStorage.getItem(ACCESS_TOKEN);

   if(token){
      data ={
         user_id:userId,
         property_id:propertyId,
         visit_time:this.state.date_time.toString(),
      }
   }else{
      data={
         first_name:this.state.first_name,
         last_name:this.state.last_name,
         mobile:this.state.mobile,
         property_id:this.state.property_id,
         visit_time:this.state.date_time.toString(),
      }
   }

   console.log(data);
      this.props.getScheduleVisit(data , 'PD');
      this.resetModal();
      sessionStorage.removeItem('isOtpVerifiedForLinking'); 
}


resetModal=()=>{
   this.setState({'first_name' : '' , 'last_name' : '', 'mobile' : '','date_time' : ''});
 }

 openBookRoomModal=()=>{
   let token=sessionStorage.getItem(ACCESS_TOKEN);
   if(token){
      this.props.getSharingType();
      this.props.getDurationList();
      this.props.toggleModal('bookingroom');
      this.props.getTermsAndCondition('popup');

   }else{
      toastr.info("Please login to continue");  
   }
 }

render() {
   let data = {} , roomCount = 0;
   if(JSON.parse(sessionStorage.getItem(PROPERTY_OBJ))){
     // console.log(JSON.parse(sessionStorage.getItem(PROPERTY_OBJ)));
      data = JSON.parse(sessionStorage.getItem(PROPERTY_OBJ));
   }
   let token=sessionStorage.getItem(ACCESS_TOKEN);
   let isOtpVerified= JSON.parse(sessionStorage.getItem('OtpVerified'));

   if(data){ 
      if(data['rooms'] > 0){  
            data['rooms'].forEach((val , key)=>{
               //console.log(val);
               if(val['is_available']){
                     roomCount++;
               }
            })
      }
   }

   const shareUrl = 'https://demo01.gethomey.io/listing/modern-apartment-with-pool/';
   const title = 'Property Details';

  
return(
   <Fragment>
      <Header/>
      <div id="section-body" style={{transform: 'none', paddingTop: '83px',}}>
     {/* ------------- carousel starts ----------- */}
      <section className="detail-property-page-header-area detail-property-page-header-area-v4">
            <div className="top-gallery-section top-gallery-variable-width-section">
               <div className="listing-slider-variable-width slick-initialized slick-slider">
                  <div className="slick-list draggable" style={{ height: '500px',}}>
                     <div className="slick-track">
                        <div className="slick-slide slick-cloned">
                                 <Carousel showArrows={true}>
                                       { data && data['gallery'] && data['gallery'].map((gallery , index)=>{
                                             return <div key={index}>
                                                <img src={gallery['image_url']} alt="" width="200"/>
                                       <p className="legend">{gallery['section']}</p>
                                             </div>
                                       })}
                                 </Carousel>
                        </div>
                     </div>
                  </div>               
               </div>
            </div> 
      </section>
      {/* ------------- carousel ends ----------- */}

      <section className="main-content-area detail-property-page detail-property-page-v1" style={{transform: 'none'}}>
      <div className="container" style={{transform: 'none'}}>
         <div className="row" style={{transform: 'none'}}>
            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
               <div className="content-area">
                  <div className="title-section">
                     <div className="block block-top-title">
                        <div className="block-body">
                           <h1 className="listing-title"> 
                            

                              {data && data['property_name']}  
                                       
                              {/* <i class="fa fa-share-alt" aria-hidden="true"></i> */}
                              {/* <span className="label label-success label-featured">Featured</span>     */}
                           </h1>
                           <address><i className="fa fa-map-marker" aria-hidden="true"></i>  {data && data['location'] && data['location']['address']}, {data && data['location'] &&  data['location']['landmark']}, {data && data['location'] &&  data['location']['city']}, {data && data['location'] &&  data['location']['state']},  {data && data['location'] &&  data['location']['pin_code']}  
                           </address>
                           <div className="host-avatar-wrap avatar">
                              <img width="70" height="70" src="https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost12-150x150.jpg" className="img-circle media-object" alt="" 
                              srcSet="https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost12-150x150.jpg 150w,
                               https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost12-300x300.jpg 300w, https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost12-250x250.jpg 250w, https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost12-360x360.jpg 360w, https://demo01.gethomey.io/wp-content/uploads/2018/10/HomeyHost12.jpg 400w" sizes="(max-width: 70px) 100vw, 70px"/>            
                           </div>
                           {/* <div className="list-inline rating hidden-xs">
                              <span className="fa fa-star"></span> 
                              <span className="fa fa-star"></span> 
                              <span className="fa fa-star"></span> 
                              <span className="fa fa-star"></span> 
                              <span className="fa fa-star"></span><span className="star-text-right">Excellent</span>            
                           </div> */}
                        </div> 
                     </div> 
                  </div> 
                  <div id="about-section" className="about-section">
                     <div className="block-bordered">
                        <div className="block-col block-col-25">
                           <div className="block-icon">   
                              <i className="fa fa-user"></i>             
                           </div>
                           <div>Occupancy type</div>
                           <div>
                              <strong>
                              {data && (data['occupancy_type'] === 'BOTH' ? 'Boys & Girls' : data['occupancy_type'] === 'GIRLS' ? 'Girls only' : 'Boys only')}   
                              </strong>
                           </div>
                        </div>
                        <div className="block-col block-col-25">
                           <div className="block-icon">
                             <i className="fa fa-home"></i>           
                           </div>
                           <div>Rooms</div>
                           {roomCount > 0 ? <div><strong>Available</strong></div> : <div><strong>Not available</strong></div>}
                            {roomCount > 0 && <div><strong>{roomCount}/{data && data['no_of_room']}</strong></div>}
                        </div>
                        <div className="block-col block-col-25">
                           <div className="block-icon">
                              <i className="fa fa-bed"></i>            
                           </div>
                           <div>Amenities</div>
                           {data && data['amenities'] && data['amenities'].map((amenity, index)=>{
                              return (index < 2 ? <div key={index}><strong>{amenity['name']},</strong></div> : (index < 3 && index === 2 && <div key={index}><strong>{amenity['name']}</strong></div>))
                           })}
                           {/* <div><strong>1 Bedrooms / 1 Beds</strong></div> */}
                        </div>
                     </div> 
                     <div className="block">
                        <div className="block-body">
                           <h2>Description</h2>
                           <p>{data && data['description']}</p>
                        </div>
                     </div>  
                  </div>
                  {/* <div id="details-section" className="details-section">
                     <div className="block">
                        <div className="block-section">
                           <div className="block-body">
                              <div className="block-left">
                                 <h3 className="title">Details</h3>
                              </div>
                              <div className="block-right">
                                 <ul className="detail-list detail-list-2-cols">
                                    <li>
                                       <i className="fa fa-angle-right" aria-hidden="true"></i> 
                                       ID: <strong>283</strong>
                                    </li>
                                    <li>
                                       <i className="fa fa-angle-right" aria-hidden="true"></i> 
                                       Guests: <strong>2</strong>
                                    </li>
                                    <li>
                                       <i className="fa fa-angle-right" aria-hidden="true"></i> 
                                       Bedrooms: <strong>1</strong>
                                    </li>
                                    <li><i className="fa fa-angle-right" aria-hidden="true"></i> 
                                       Beds: <strong>1</strong>
                                    </li>
                                    <li><i className="fa fa-angle-right" aria-hidden="true"></i> 
                                       Bathrooms: <strong>2</strong>
                                    </li>
                                    <li><i className="fa fa-angle-right" aria-hidden="true"></i> 
                                       Check-in After: <strong>10:00 AM</strong>
                                    </li>
                                    <li><i className="fa fa-angle-right" aria-hidden="true"></i> 
                                       Type: <strong>Shared Room / Bed &amp; Breakfast  </strong>
                                    </li>
                                    <li><i className="fa fa-angle-right" aria-hidden="true"></i> 
                                       Size: <strong>1125 SqFt</strong>
                                    </li>
                                 </ul>
                              </div> 
                           </div> 
                        </div> 
                     </div> 
                  </div>  	 */}
               </div>
            </div>
        
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 homey_sticky" style={{position: 'relative', overflow: 'visible', boxSizing: 'border-box', minHeight: '1px',}}>
                
                <div className="theiaStickySidebar"><div className="sidebar right-sidebar">
                    <div id="homey_remove_on_mobile" className="sidebar-booking-module hidden-sm hidden-xs">
       <div className="block">
          <div className="sidebar-booking-module-header">
             <div className="block-body-sidebar">
              
                   <span className="item-price">
                   <sup></sup>Schedule Visit<sub></sub>
                   </span>
            
             </div>
          </div>
            <div className="sidebar-booking-module-body">
               {data['is_site_visit_scheduled_status'] != undefined && !data['is_site_visit_scheduled_status'] && 
               <div className="homey_notification block-body-sidebar">
                  <div id="single-listing-date-range" className="search-date-range">
                     {!token && <div className="form-group">
                        <input type="text" name="first_name" value={this.state['first_name']} className={this.state.errors.first_name  ? "req-error" : "form-control email-input-1" } placeholder="First Name"
                        onInput={(e)=>{this.saveData(e);this.isValidate(e)}}/>
                     </div>} 
                     {!token && <div className="form-group">
                         <input type="text" name="last_name" value={this.state['last_name']} className={this.state.errors.last_name  ? "req-error" : "form-control email-input-3" } placeholder="Last Name"
                        onInput={(e)=>{this.saveData(e);this.isValidate(e)}}/>
                     </div> } 
                     {!token && <div className="form-group">
                        <input  name="mobile" placeholder="Mobile" value={this.state['mobile']} type="text" className={this.state.errors.mobile  ? "req-error" : "form-control email-input-3" }  
                        onInput={(e)=>{this.saveData(e);this.isValidate(e)}} onKeyPress={(event=>this.numberOnly(event))} />
                     </div>}
                     <div className={this.state.errors.date_time  ? "form-group req-error" : "form-group" } >
                        <DateTimePicker
                           format="dd/MM/yyyy hh:mm:ss"
                           formatPlaceholder="formatPattern"
                           min={new Date()}
                           onChange={this.handleChange}
                           defaultValue={new Date()}
                        />
                     </div> 
                     {!token && <div className="form-group">
                                    {!isOtpVerified && <button data-test="button" type="button"  onClick={()=>this.checkMobileNoOnOtpBtn()}
                                     className="btn btn-primary btn-full-width Ripple-parent mt-5">Get OTP</button> }
                                     {isOtpVerified && <button data-test="button" type="button"  
                                     className="btn btn-success btn-full-width mt-5 Ripple-parent "> <i className="fa fa-check"></i> Verified</button>   }
                     </div>}       
                  </div>
                  <button id="request_for_reservation" className="btn btn-full-width btn-primary" onClick={(e)=>this.checkValidationOnSubmit(e)} disabled={!isOtpVerified && !token}>Submit</button>
                  {/* <button id="request_for_reservation" className="btn btn-full-width btn-primary" onClick={(e)=>this.checkValidationOnSubmit(e)}>Submit</button> */}
                  <div className="text-center text-small"><i className="fa fa-info-circle"></i> You won’t be charged yet</div>            
               </div>}
               {data['is_site_visit_scheduled_status'] &&   <div className="homey_notification block-body-sidebar">
                  Your site visit request is in progress. Please visit account detail section for more details.
               </div>}
            </div> 
       </div>
    </div></div>
    <div className="sidebar-booking-module-footer">
       <div className="block-body-sidebar">       
                    <div className="btn-group dropup">

                    <button type="button"   className="add_fav btn btn-full-width btn-grey-outlined btn-item-tools dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-share-alt" aria-hidden="true"></i> Share</button>
                    <ul className="dropdown-menu">
    <li>  
                           <FacebookShareButton
                              url={shareUrl}
                              quote={title}
                              className="Demo__some-network__share-button">
                              <FacebookIcon size={30} round />
                           </FacebookShareButton>
                           <EmailShareButton
                                 url={shareUrl}
                                 quote={title}
                                 className="Demo__some-network__share-button">
                              <EmailIcon size={30} round />
                           </EmailShareButton>
                           <WhatsappShareButton
                                 url={shareUrl}
                                 quote={title}
                                 className="Demo__some-network__share-button">
                              <WhatsappIcon size={30} round />
                           </WhatsappShareButton>
                           <TwitterShareButton
                                 url={shareUrl}
                                 quote={title}
                                 className="Demo__some-network__share-button">
                              <TwitterIcon size={30} round />
                           </TwitterShareButton>
               </li></ul> 
             </div>  
                {data['is_booked_status'] != undefined && !data['is_booked_status'] && <button type="button" data-listid="315" className="add_fav btn btn-full-width btn-grey-outlined" onClick={this.openBookRoomModal}><i className="fa fa-heart-o" aria-hidden="true"></i> Booking</button>}
                
                {/* <button type="button" data-toggle="modal" data-target="#modal-contact-host" className="btn btn-full-width btn-grey-outlined">Contact the host</button>
                
                <button type="button" id="homey-print" className="btn btn-full-width btn-blank" data-listing-id="315">
             <i className="fa fa-print" aria-hidden="true"></i> Print this page		</button> */}
             </div>

         </div>
         </div></div></div>
      </div>
   </section>
   </div>
   <OTPModal data={this.props} mobile={this.state.mobile}></OTPModal> 
   <BookingModal data={this.props} propertyId={this.state['property_id']} userId={this.state['user_id']}></BookingModal> 
   <TermsConditionModal data={this.props} ></TermsConditionModal> 
</Fragment>
    ) ;
  }
}


function OTPModal(props){
   // ote : NDeclare a new state variable, which we'll call "otpNo"  by using useState Hook
   // arg inside useState(null) i.e null is the default value of "otpNo"
   // useState is only work inside functional Component not in class component
   // similar to "this.state = {otpNo : null};"
   const [otpNo, setOtpNo] = useState('');
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

   const resetModal=()=>{
      setOtpNo(otpNo => '');
      props.data.toggleModal('otp')
   }

   return(       
         <div className={`modal fade custom-modal-login in ${props.data.openOtpModal && !props.data.openSignUpModal ? "showModal" : "hideModal"}`} id="modal-login" tabIndex="-1" role="dialog">
         <div className="modal-dialog clearfix" role="document">
             
               <div className="modal-body-left pull-left" style={{'backgroundImage': 'url(https://demo01.gethomey.io/wp-content/uploads/2018/10/01-3.jpg)' ,  'backgroundSize': 'cover', 'backgroundRepeat' : 'no-repeat' , 'backgroundPosition' : '50% 50%'}}>
                 <div className="login-register-title">
                     OTP Verification           
                 </div>
               </div>
             
             <div className="modal-body-right pull-right">
                 <div className="modal-content">
                     <div className="modal-header">
                         <button type="button" className="close" aria-label="Close" onClick={()=>resetModal()}><span aria-hidden="true">×</span></button>
                         <h4 className="modal-title">Verify OTP</h4>
                     </div>
                     <div className="modal-body">
                        <div className="homey_login_messages message"></div>
     
                             <div className="modal-login-form">
                                <p className="text-center"><strong></strong></p>
                                     {attemptleft}
                                     <div className="form-group">
                                         <input type="text" name="otp" value={otpNo} className="form-control email-input-2" placeholder="OTP"
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


 function BookingModal(props){
 
   const [sharingType , setSharingType] = useState('');
   const [duration , setDuration] = useState('');
   const [price , setPrice] = useState('');
   const [isAcceptTerms , setTermsCondition] = useState('');
   const [userId , setUserId] = useState("");
   const [propertyId , setPropertyId] = useState("");
   const sharingList = props.data['sharingList'] , durationList = props.data['durationList'];
   const [error_sharing_type ,setErrorSharingType] = useState(null);
   const [error_duration,setErrorduration] = useState(null);


   let user_data={},data={};
   if(JSON.parse(sessionStorage.getItem(USER_DATA))){
      user_data= JSON.parse(sessionStorage.getItem(USER_DATA));     
   }

   if(JSON.parse(sessionStorage.getItem(PROPERTY_OBJ))){
      console.log(JSON.parse(sessionStorage.getItem(PROPERTY_OBJ)));
      data = JSON.parse(sessionStorage.getItem(PROPERTY_OBJ));   
   }
   let sharingId = sharingType, durId = duration , bookPrice = price; 

   const saveData = (e) =>{
      if(data){
         setPropertyId(propertyId => data['id']);
      }
      if(Object.keys(user_data).length > 0){
         setUserId(userId => user_data['id']);
       }
     let name = e.target.name
     let val = e.target.value;
     let checked=e.target.checked
     if(val && name==='sharing'){
        sharingId = val;
        setSharingType(sharingType => val);
     }
     if(val && name==='duration'){
        durId = val;
        setDuration(duration => val);
     }
     if(checked){
      setTermsCondition(isAcceptTerms => true);
      }
      else{
      setTermsCondition(isAcceptTerms => false);
      }
      if(sharingId && durId){           
         props.data.getPrice(sharingId,durId,propertyId);
         //setPrice(price => props.data['bookingPrice']);
      }        
   }

   const isValidate=(e)=>{
      let name = e.target.name;
      let value = e.target.value;
         switch(name){
            case "sharing" :{
               if(value){
                  setErrorSharingType(error_sharing_type => false);
               }
               else{
                  setErrorSharingType(error_sharing_type => true);
               }
              break;
            } 
            case "duration" :{
                 if(value){
                    setErrorduration(error_duration => false);
                  }
                  else{
                    setErrorduration(error_duration => true);
                  }
              break;
            } 
            default : return false
          }
      }
      const checkValidationOnSubmit= ()=>{
         let formIsValid = true;
              if(!sharingType){
                formIsValid = false;
                setErrorSharingType(error_first_name => true);
              }
              if(!duration){
                formIsValid = false;
                setErrorduration(error_duration => true);
              }
          console.log(formIsValid);
              if(formIsValid){
               bookRoom();
              }
        }

const bookRoom=()=>{
   let dataObj={
         "property_id":propertyId,
         "user_id":userId,
         "room_type_id":sharingType,
         "duration_id":duration
      }
   props.data.bookRoom(dataObj);
   resetModal(null,'BOOKING');

}


const resetModal=(e,type)=>{
   setSharingType(sharingType => '');
   setDuration(duration => '');
   setErrorSharingType(error_first_name => '');
   setErrorduration(error_duration => '');

   if(type === 'CLOSE'){
     props.data.toggleModal('bookingroom');
   }
}
const openTermsConditionModel=(e)=>{
   props.data.toggleModal('termscondition');

}


   return(     
         <div className={`modal fade custom-modal-login in ${props.data.openBookingModal ? "showModal" : "hideModal"}`} id="modal-login" tabIndex="-1" role="dialog">
         <div className="modal-dialog clearfix" role="document">
             
               <div className="modal-body-left pull-left" style={{'backgroundImage': 'url(https://demo01.gethomey.io/wp-content/uploads/2018/10/01-3.jpg)' ,  'backgroundSize': 'cover', 'backgroundRepeat' : 'no-repeat' , 'backgroundPosition' : '50% 50%'}}>
                 <div className="login-register-title">
                 Booking Request For Room          
                 </div>
               </div>
             
             <div className="modal-body-right pull-right">
                 <div className="modal-content">
                     <div className="modal-header">
                         <button type="button" className="close" aria-label="Close" onClick={(e)=>resetModal(e,'CLOSE')}><span aria-hidden="true">×</span></button>
                         <h4 className="modal-title">Booking Request</h4>
                     </div>
                     <div className="modal-body">
                        <div className="homey_login_messages message"></div>
     
                             <div className="modal-login-form">
                                <p className="text-center"><strong></strong></p>
                                    <div className="form-group">
                                       <select id="sharing_type"
                                          onChange={(e)=>{saveData(e);isValidate(e)}}
                                          // value={sharingType || ''}
                                          name="sharing"
                                          className={error_sharing_type ? "req-error" :"form-control"}>
                                             <option value="">Select sharing type</option>
                                            { sharingList && sharingList.map((share , index)=>{
                                                 return <option key={index} value={share['id']}>{share['type']}</option>
                                             })}
                                       </select>
                                    </div>
                                    <div className="form-group">
                                             <select id="duration"
                                                onChange={(e)=>{saveData(e);isValidate(e)}}
                                                // value={duration || ''}
                                                name="duration"
                                                className={error_duration ? "req-error" : "form-control"}>
                                                   <option value="">Select duration</option>
                                                { durationList && durationList.map((dur , index)=>{
                                                      return <option key={index} value={dur['id']}>{dur['time_slot']}</option>
                                                })}
                                                </select>
                                    </div>
                                    <div className="form-group">
                                         <input type="text" value={props.data['bookingPrice'] || ''} readOnly name="price" className="form-control" placeholder="Price"/>  
                                     </div>
                                     <div className="form-group">
                                       <div className="checkbox">
                                       <label style={{minHeight: '17px'}}><input type="checkbox" name="isAcceptTerms" onChange={(e=>saveData(e))}></input></label><a href onClick={(e)=>openTermsConditionModel(e)}><span className="text-info .text-underline .cursor">Accept Terms & Conditions</span></a>
                                       </div>
                                     </div>                                                                      
                                     <button type="button" className="homey_login_button btn btn-primary btn-full-width" 
                                     onClick={(e)=> checkValidationOnSubmit(e)} disabled={!isAcceptTerms}>Booking Request</button>
                           
                             </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>     
     
     )
 }

 function  TermsConditionModal(props){
   let termsData = [];
   if(sessionStorage.getItem(TERMS_CONDITIONS)){
       termsData =  JSON.parse(sessionStorage.getItem(TERMS_CONDITIONS)); 
       console.log(termsData);
       
   }
   const resetModal=(e,type)=>{
      if(type === 'CLOSE'){
      props.data.toggleModal('termscondition');
      }
   }
   
   return(     
      // <div className={`modal fade custom-modal-login in ${props.data.openTermsConditionModal ? "showModal" : "hideModal"}`} id="modal-login" tabIndex="-1" role="dialog">
      //          <div class="modal-dialog modal-lg">
      //             <div class="modal-content">
      //             <div class="modal-header">
      //                <button type="button" class="close" data-dismiss="modal" onClick={(e)=>resetModal(e,'CLOSE')}>&times;</button>
      //                <h4 class="modal-title">Terms & Conditions</h4>
      //             </div>
      //             <div class="modal-body">
      //             <ul>
      //             {termsData && termsData.map((tval , index)=>{
      //                   return <li key={index}>
      //                      {tval['term_description']}
      //                   </li> 
      //             })}
      //             </ul>
      //             </div>
                  
      //             </div>
      //          </div>
      // </div>
      <div className={`modal fade ${props.data.openTermsConditionModal ? "showTermModal" : "hideModal"}`} tabIndex="-1"  role="dialog" style={{marginTop:'75px'}}>
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" onClick={(e)=>resetModal(e,'CLOSE')}>&times;</button>
            <h4 class="modal-title">Terms & Condition</h4>
          </div>
          <div class="modal-body">
            <div className="term-detail ">
          <ul>
              {termsData && termsData.map((tval , index)=>{
                        return <li key={index}>
                           {tval['term_description']}
                        </li> 
                  })}
                  </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  
  )
 }

const mapStateToProps = state => {
   console.log(state.property)
   return {
     loading : state.signup['loading'], 
     propertyObj : state.property['propertyObj'],
     sharingList : state.property['sharingList'],
     durationList : state.property['durationList'],
     bookingPrice : state.property['bookingPrice'],
     openOtpModal : state.header['otp-modal'],
     openSignUpModal : state.header['signup-modal'],
     openBookingModal : state.header['booking-room'],
     openTermsConditionModal : state.header['terms-condition'],
     isOtpVerified:state.signup['isOtpVerified'],
     otpDetail: state.signup['otpDetail'],
     resendOTP:state.signup['reSend'], 

   }
}

const mapDispatchToProps = (dispatch) =>{
   return {
      getDurationList:()=>dispatch(getDurationList()),
      getSharingType:()=>dispatch(getSharingType()),
      getPrice:(occId,durId,propId)=> dispatch(getPrice(occId,durId,propId)),
      bookRoom:(data)=>dispatch(bookRoom(data)),
      toggleModal:(type)=> dispatch(toggleModal(type)),
      getScheduleVisit:(data , type)=>dispatch(getScheduleVisit(data , type)),
      getOtp : (modeType , sendTo,type) => dispatch(getOTP(modeType , sendTo,type)),
      verifyOtp : (modeType , userId , otpNo , verify) => dispatch(verifyOTP(modeType , userId , otpNo , verify)),
      getTermsAndCondition :(type)=>dispatch(getTermsAndCondition(type)),

   }
}
 
 
export default connect(mapStateToProps,mapDispatchToProps)(PropertyDetails);

