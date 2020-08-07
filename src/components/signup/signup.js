import React, { Component , useState } from 'react';
import {connect} from 'react-redux';
import './signup.css'
import {submitData , toggleModal , getOTP , getOTPForLinking , verifyOTP , updateUserType} from '../../redux-container';
import {GOOGLE_AUTH_URL , FACEBOOK_AUTH_URL} from '../../redux-container/constants/constantUrl';
import { timingSafeEqual } from 'crypto';
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validMobile=RegExp(/^[0-9]+$/);


class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      'first_name': '',
       'last_name': '',
       'email' : '',
       'mobile' : '',
       'password' : '',
       'gender' : '',
       'age' : '',
       'user_type': 'STUDENT' ,
       'account_type': 'local',
       'interest':null,
       'longitude':null,
       'latitude' :null,
       'referral_code':null,
       'social_id':null,
       'profile_url':null,
       
       'is_linked': false,
       'link_user_id': null ,
       'link_user_type': null,
       
       'is_mobile_verified': true,
       'is_email_verified': false,
        'sendReq':false,

       'modeType' : null,
       'sendTo' : null,
       'errors':{
        first_name:false,
        last_name:false,
        email:false,
        password:false,
        mobile:false,
        user_type:'',
        emailformat:false,
        mobileFormat:false,
        isvalidEmailMobile:false,

       }
       
    }
    this.saveData = this.saveData.bind(this);
    this.selectLinkingChecbox = this.selectLinkingChecbox.bind(this);
    this.validMobileEmailForLinking=this.validMobileEmailForLinking.bind(this); 
     

    
  }

saveData = (e) =>{  
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name] : value});
    if(name === 'sendTo'){
      this.setState({'link_user_id' : value});
    } 
}

isValidate = (e , type)=>{
    let fields = {} ,
    formIsValid = true;
    
      const name = e.target.name;
      const value = e.target.value;
      fields[name] = value; 
      let errors=this.state.errors;
  
      if(type==="input"){
          switch(name){
            case "first_name" :{
              errors["first_name"] = value.length ? false: true;
              break;
            } 
            case "last_name" :{
              errors["last_name"] = value.length ? false : true;
              break;
            }
            case "email" :{
              errors["email"] = validEmailRegex.test(value) ? false : true;
              break;
            } 
            case "password" :{
              errors["password"] = value.length ? false : true;
              break;
            } 
            case "mobile" :{
              errors["mobile"] = value.length===10 ? false: true;
              break;
            } 
            case "user_type" :{
              errors["user_type"] = value.length ? false: true;
              break;
            } 
            default : return false
          }
      }  
       this.setState({errors : errors}) 
       return true;
}


checkValidationOnSubmit(){
  let fields = {} , errors = {},
  formIsValid = true;
  fields = this.state;

      if(!fields["first_name"]){
          formIsValid = false;
          errors["first_name"] = true;        
      }

      if(!fields["last_name"]){
        formIsValid = false;
        errors["last_name"] = true;        
      }
      // else if(typeof(fields["name"]) !== "undefined"){
      //     if(!fields["name"].match(/^[a-zA-Z]+$/)){
      //         formIsValid = false;
      //         errors["name"] = "Please enter only alphabet";
      //     }        
      // }

      if(!fields["email"]){
        formIsValid = false;
        errors["email"] = true;
      }
      else{
        if(!validEmailRegex.test(fields["email"])){
          formIsValid = false;
          errors["email"] = true;
        }

      }

      if(!fields["password"]){
        formIsValid = false;
        errors["password"] = true; 
      }

      if(!fields["mobile"]){
        formIsValid = false;
        errors["mobile"] =true;
      }

      if(!fields["user_type"]){
        formIsValid = false;
        errors["user_type"] = "Please select user type";
      }
      if(this.state['is_linked'])
      {
        if(!fields["sendTo"]){
          errors["isvalidEmailMobile"]=true;
          formIsValid = false;
        }
      }

      this.setState({errors:errors}) 
     
      if(formIsValid){
          this.props.onSubmit(this.state);
          //this.resetModal();
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
  let errors = this.state.errors,
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

  selectLinkingChecbox = (e) => {
     if(e.target.checked){
      this.setState({'is_linked': true});
     }else{
      this.setState({'is_linked' : false});
     }
  }
  validMobileEmailForLinking(event){
    const {value}= event.target;
     var type;
     let errors=this.state.errors
     if(value){
      if(validEmailRegex.test(value)){
        type='EMAIL';
        this.setState({modeType:'EMAIL'});
        this.setState({sendTo:value})
        errors['isvalidEmailMobile']=false;
        this.setState({sendReq:true});
      }
      else if(validMobile.test(value) && value.length === 10 ){
        type='Mobile';
        this.setState({modeType:'MOBILE'})
        this.setState({sendTo:value})
        errors['isvalidEmailMobile']=false;
        this.setState({sendReq:true});
      }
      else{
        errors['isvalidEmailMobile']=true;
        type='Invalid';
        this.setState({sendReq:false});
      }
    }
  }
  // checkMobileNoOnOtpBtn(){
  //   let errors = {} ,
  //   formIsValid = true;
   
  //     if(!this.state['mobile']){
  //       formIsValid = false;
  //       errors["mobile"] = "Please enter mobile no.";
  //     }
  //     this.setState({errors: errors}) 
  //     if(formIsValid){
  //       this.props.getOtp('MOBILE' , this.state['mobile']);
  //     }
  // }

  resetModal=()=>{
    this.setState({'first_name' : '' , 'last_name' : '', 'mobile' : '','email' : '',
    'password' : '','referral_code':'', 'sendTo':''});
    this.props.toggleModal('signup');
  }


  render() {
    let otpMode = this.state['modeType'], otpSendTo = this.state['sendTo'] , otpUserType = this.state['user_type'] ;
    let isOtpVerifiedForLinking = JSON.parse(sessionStorage.getItem('isOtpVerifiedForLinking'));
    let isOtpVerified= JSON.parse(sessionStorage.getItem('OtpVerified'));
    return (<div>
     

<div className={`modal fade custom-modal-login in ${this.props.openSignUpModal ? "showModal" : "hideModal"}`} id="modal-login" tabIndex="-1" role="dialog" data-backdrop="static">
    <div className="modal-dialog clearfix" role="document">
        
          <div className="modal-body-left pull-left" style={{'backgroundImage': 'url(https://demo01.gethomey.io/wp-content/uploads/2018/10/01-3.jpg)' ,  'backgroundSize': 'cover', 'backgroundRepeat' : 'no-repeat' , 'backgroundPosition' : '50% 50%'}}>
            <div className="login-register-title">
                Welcome back Please Register            
            </div>
          </div>
        
        <div className="modal-body-right pull-right">
            <div className="modal-content sign-up">
                <div className="modal-header">
                    <button type="button" className="close" aria-label="Close" onClick={this.resetModal}><span aria-hidden="true">×</span></button>
                    <h4 className="modal-title">Register</h4>
                </div>
                <div className="modal-body">
                   <div className="homey_login_messages message"></div>
                   <a href={FACEBOOK_AUTH_URL}><button type="button" className="homey-facebook-login btn btn-facebook-lined btn-full-width"><i className="fa fa-facebook" aria-hidden="true"></i> Signup with Facebook</button></a>
                   <a href={GOOGLE_AUTH_URL}><button type="button" className="homey-google-login btn btn-google-plus-lined btn-full-width"><i className="fa fa-google-plus" aria-hidden="true"></i> Signup with Google</button></a>
                        <div className="modal-login-form">
                           <p className="text-center"><strong>OR</strong></p>
                         
                                <div className="form-group">
                                    <input type="text" name="first_name" value={this.state['first_name']} className={this.state.errors.first_name  ? "req-error" : "form-control email-input-1" } placeholder="First Name"
                                    onInput={(event)=>{this.saveData(event) ; this.isValidate(event , 'input')}}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="last_name" value={this.state['last_name']} className={this.state.errors.last_name  ? "req-error" : "form-control email-input-3" } placeholder="Last Name"
                                    onInput={(event)=>{this.saveData(event) ; this.isValidate(event , 'input')}}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="email" value={this.state['email']} className={this.state.errors.email  ? "req-error" : "form-control email-input-3" } placeholder="Email"
                                    onInput={(event)=>{this.saveData(event) ; this.isValidate(event , 'input')}}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" name="password" value={this.state['password']} className={this.state.errors.password ? "req-error" :"form-control password-input-2 email-input-3"} placeholder="Password"
                                    onInput={(event)=>{this.saveData(event) ; this.isValidate(event , 'input')}}/>
                                </div>
                                <div className="form-group" style={{position:"relative"}}>
                                    <input type="text" name="mobile" value={this.state['mobile']} className={this.state.errors.mobile  ? "req-error" : "form-control email-input-3" } placeholder="Mobile"  disabled={isOtpVerified}
                                    onInput={(event)=>{this.saveData(event) ; this.isValidate(event , 'input')}} onKeyPress={(e)=>this.numberOnly(e)}/>
                                    {/* {!isOtpVerified && <button data-test="button" type="button"  onClick={()=>this.checkMobileNoOnOtpBtn()}
                                     className="btn-primary btn Ripple-parent submit-otp-btn">Get OTP</button> }
                                     {isOtpVerified && <button data-test="button" type="button"  
                                     className="btn-success btn Ripple-parent submit-otp-btn"> <i className="fa fa-check"></i> Verified</button>   } */}
                                </div>
                                <div className="form-group">
<div className="form-control email-input-3 pt-5">
<span className="radio-span">You are : </span>
<label>
      <input type="radio" name="user_type" value="STUDENT" onClick={this.saveData} defaultChecked/>
      Student </label>
      <label>
      <input type="radio" name="user_type" value="PARENT" onClick={this.saveData}/>
       Parent </label> 
</div> 
</div>
                                <div className="form-group">
                                    <input type="text" name="referral_code" value={this.state['referral_code']} className="form-control email-input-2" placeholder="Referral Code (optional)"
                                    onInput={(event)=>{this.saveData(event) ; this.isValidate(event , 'input')}}/>
                                </div>
                               <div className="form-group">
                               {!isOtpVerified && <button data-test="button" type="button"  onClick={()=>this.checkMobileNoOnOtpBtn()}
                                     className="btn btn-primary btn-full-width Ripple-parent mt-5">Get OTP</button> }
                                     {isOtpVerified && <button data-test="button" type="button"  
                                     className="btn btn-success btn-full-width mt-5 Ripple-parent "> <i className="fa fa-check"></i> Verified</button>   }
                               </div>

                                <div className="form-group">
                                <div className="checkbox">
                                    <label><input type="checkbox" checked={this.state['is_linked']? 'checked' : ''} name="is_linked" onChange={this.selectLinkingChecbox}></input>
                                    Link your account with existing student/parent account(optional)</label>
                                    <div className ={`linking-div ${this.state['is_linked']? '' : 'hidden'}`}>
                                        <div className="form-group mt-5" style={{position:"relative"}}>
                                        <input data-test="input" name="sendTo" value={this.state['sendTo']} placeholder="Email/Mobile" type="text" onChange={this.saveData ,this.validMobileEmailForLinking}  style={{width:'66%'}}  className ={this.state.errors.isvalidEmailMobile  ? "req-error" : "form-control email-input-2" }  disabled={isOtpVerifiedForLinking}/>
                                        {!isOtpVerifiedForLinking &&
                                        <button data-test="button" type="button" onClick={()=>this.props.getOtpForLinking(otpMode , otpSendTo , otpUserType)} className="btn-primary btn Ripple-parent submit-otp-btn" disabled={!this.state.sendReq}> Get OTP</button>}
                                        {isOtpVerifiedForLinking && <button data-test="button" type="button"  
                                        className="btn-success btn Ripple-parent submit-otp-btn"> <i className="fa fa-check"></i> Verified</button>   }
                                        </div>
                                    </div>
                                </div>
                                </div>
                                {/* <div className="checkbox pull-left">
                                    <label><input name="remember" type="checkbox"/>Remember me</label>
                                </div>
                                <div className="forgot-password-text pull-right">
                                    <a href="#" data-toggle="modal" data-target="#modal-login-forgot-password" onClick={()=>this.props.toggleModal('signup')}>Forgot password?</a>
                                </div> */}

                                <input type="hidden" id="homey_login_security" name="homey_login_security" value="d2fec70811"/>
                                <input type="hidden" name="_wp_http_referer" value="/listing/modern-apartment-with-pool/?detail_layout=v1"/>               
                                <input type="hidden" name="action" id="homey_login_action" value="homey_login"/>
                                <button type="button" className="homey_login_button btn btn-primary btn-full-width" 
                                onClick={()=>this.checkValidationOnSubmit()} disabled={!this.props.isOtpVerified}>Register</button>
                      
                            {/* <p className="text-center">Don't you have an account? 
                            <a href="#" data-toggle="modal" data-target="#modal-register" data-dismiss="modal">Register</a></p> */}
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>

        <OTPModal data={this.props} stateData={this.state}></OTPModal>
        <UserTypeModal data={this.props}></UserTypeModal>

  </div>);  
  }
}

export function OTPModal(props){
 console.log(props);
  // ote : NDeclare a new state variable, which we'll call "otpNo"  by using useState Hook
  // arg inside useState(null) i.e null is the default value of "otpNo"
  // useState is only work inside functional Component not in class component
  // similar to "this.state = {otpNo : null};"
  console.log("**********************");
  console.log(props.stateData['mobile'])
  const [otpNo, setOtpNo] = useState(null);
  //const [otpSendTo , setOtpSendTo] = useState(null);
  let otpMode, otpSendTo, verificationType;
  if(props.stateData['modeType']){
    otpMode = props.stateData['modeType'];
  }else{
    otpMode = 'MOBILE';
  }
  if(props.stateData['sendTo']){
    otpSendTo = props.stateData['sendTo'];
  }else if(props.stateData['mobile']){
    otpSendTo = props.stateData['mobile'];
    //console.log("otpSendto="+otpSendTo);
    // let val = props.stateData['mobile'];
    // setOtpSendTo(otpSendTo => val);
  }

  if(props.stateData['is_linked'] && (props.stateData['sendTo'] !== null && props.stateData['sendTo'] !== undefined && props.stateData['sendTo'] !== '')){
    verificationType='linking';
  }
   if(props.stateData['mobile'] !== null && props.stateData['mobile'] !== undefined && props.stateData['mobile'] !== ''){
     verificationType='mobile';
  }
console.log(verificationType);

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

   console.log("otpSendto *********** ="+otpSendTo);
  return(       
        <div className={`modal fade custom-modal-login in ${props.data.openOtpModal  && props.data.openSignUpModal ? "showModal" : "hideModal"}`} id="modal-login" tabIndex="-1" role="dialog">
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


function UserTypeModal(props){

  const [userType, setUserType] = useState("STUDENT");
  const [error , setError] = useState("");

  const saveData = (e) =>{
    let val = e.target.value;
    if(val){
     setUserType(userType => val);
    } 
  }

  const validate = ()=>{   
      let isFormValid = true;
      if(!userType){
        setError(error => "Please select User Type");
        isFormValid = false;
      }  

      if(isFormValid){
         props.data.updateUserType(userType);
      }
  }

  return (
  <div className={`modal fade custom-modal-login in ${props.data.openUserTypeModal ? "showModal" : "hideModal"}`} id="modal-login" tabIndex="-1" role="dialog">
        <div className="modal-dialog clearfix" role="document">
            
              <div className="modal-body-left pull-left" style={{'backgroundImage': 'url(https://demo01.gethomey.io/wp-content/uploads/2018/10/01-3.jpg)' ,  'backgroundSize': 'cover', 'backgroundRepeat' : 'no-repeat' , 'backgroundPosition' : '50% 50%'}}>
                <div className="login-register-title">
                    User Type          
                </div>
              </div>
            
            <div className="modal-body-right pull-right">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" aria-label="Close" onClick={()=>props.data.toggleModal('usertype')}><span aria-hidden="true">×</span></button>
                        <h4 className="modal-title">User Type</h4>
                    </div>
                    <div className="modal-body">
                       <div className="homey_login_messages message"></div>
                            <div className="modal-login-form">
                               <p className="text-center"><strong></strong></p>
                               <form className=" mx-4 grey-text">
                                    <div className ="linking-div" style={{'margin': '14px 0px 3px 0px'}}>
                                      <span className="radio-span">You are : </span>
                                      <input type="radio" name="user_type" value="STUDENT" onClick={(e)=>saveData(e)} defaultChecked/>
                                      <span className="radio-label">Student</span>
                                      <input type="radio" name="user_type" value="PARENT" onClick={(e)=>saveData(e)}/>
                                      <span className="radio-label">Parent</span>
                                    </div>
                                    <span>{error}</span>
                              </form>
                                    <br/>
                                    <button type="button" className="homey_login_button btn btn-primary btn-full-width" 
                                    onClick={(e)=>validate(e)}>Submit</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>     
        
          
          
          );
}


const mapStateToProps = state => {
  return {
     openSignUpModal : state.header['signup-modal'],
     openOtpModal : state.header['otp-modal'],
     openUserTypeModal : state.header['usertype-modal'],
     otpDetail: state.signup.otpDetail,
     resendOTP:state.signup.reSend,
     isOtpVerified:state.signup.isOtpVerified,
     isOtpVerifiedForLinking:state.signup.isOtpVerifiedForLinking,
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onSubmit: data  => dispatch(submitData(data)),
    toggleModal: type => dispatch(toggleModal(type)),
    getOtpForLinking :(modeType , sendTo , userType) => dispatch(getOTPForLinking(modeType , sendTo , userType)),
    getOtp : (modeType , sendTo,type) => dispatch(getOTP(modeType , sendTo,type)),
    verifyOtp : (modeType , userId , otpNo , verify) => dispatch(verifyOTP(modeType , userId , otpNo , verify)),
    updateUserType : (userType) => dispatch(updateUserType(userType)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
