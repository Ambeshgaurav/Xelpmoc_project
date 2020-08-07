import {webApiCall} from '../ajax' 
import {FETCH_USER_DETAILS , FETCH_USER_OAUTH_DATA , FETCH_USER_SUCCESS , FETCH_USER_FAILURE,FETCH_OTP_VERIFICATION_DETAIL,OTP_VERIFIED,OTP_VERIFIED_FOR_LINKING} from './types'
import {SIGN_UP , GET_OTP , GET_USER_DATA , CHECK_LINK_GET_OTP
   , VERIFY_OTP , UPDATE_USER_TYPE} from '../constants/constantUrl';
import {toastr} from 'react-redux-toastr'
import {toggleModal} from '../../redux-container';
import {USER_DATA , AUTHENTICATED ,ACCESS_TOKEN,USER_ID} from '../constants/constantSessionKey';
import { history } from './../store';


const fetchUserDetails = ()=> {
  return {
    type : FETCH_USER_DETAILS,
  }
}

const fetchUserSuccess = (data)=> {
  return 
}

const fetchUserError = (data)=> {
  return {
    type : FETCH_USER_FAILURE,
    payload : data,
  }
}

const fetchUserOauthDetails = (data)=> {
  return {
    type : FETCH_USER_OAUTH_DATA,
    payload : data,
  }
}
const fetchOtpVerifiactionDetail=(data)=>{
  return {
    type : FETCH_OTP_VERIFICATION_DETAIL,
    payload : data,
  }
}

const OtpVerified=()=>{
  return{
    type: OTP_VERIFIED,
  }
}
const isOtpVerifiedForLinking=()=>{
  return{
    type: OTP_VERIFIED_FOR_LINKING,
  }
}

export const submitData = (data) => {
  delete data['errors'];
  delete data['modeType'];
  delete data['sendTo'];
    return (dispatch) =>{
     dispatch(fetchUserDetails());
     webApiCall.post(SIGN_UP , data)
        .then(response => {
          if(response){
              console.log(response);
              if(response.data['status'] === 200){  
                const user = {}; 
                dispatch(fetchUserSuccess(user));  
                toastr.success(response.data["message"]);  
                sessionStorage.setItem(ACCESS_TOKEN , response['data']['result']['accessToken']);
                dispatch(getOAuthData());
                dispatch(toggleModal('signup')); 

                
              }
          }
        })
        .catch(error => {
          if(error.response){
            sessionStorage.setItem('isOtpVerifiedForLinking',JSON.stringify(false)); 
            sessionStorage.setItem('OtpVerified',JSON.stringify(false));
            if(error.response.status === 400){
              toastr.error(error.response.message)
              dispatch(fetchUserError(error.response.message));
            }
            if(error.response.data['status'] === 400){
              // sessionStorage.setItem(USER_LOGGED_IN , JSON.stringify(false));  
              // sessionStorage.setItem(AUTHENTICATED , JSON.stringify(false)); 
              toastr.error(error.response.data['message']);
              const errMsg = error.response.data['message'];
              dispatch(fetchUserError(errMsg));
            }else if(error.response.data['status'] === 401){
              // sessionStorage.setItem(USER_LOGGED_IN , JSON.stringify(false));  
              // sessionStorage.setItem(AUTHENTICATED , JSON.stringify(false)); 
              toastr.error(error.response.data['message']);
              const errMsg = error.response.data['message'];
              dispatch(fetchUserError(errMsg));
            }
            else if(error.response.data['status'] === 500)
            {
              toastr.error(error.response.data['message']);
              const errMsg = error.response.data['message'];
              dispatch(fetchUserError(errMsg));
            }
          }else{
            toastr.error("Error'");
          } 
          dispatch(fetchUserError("Valid data"));
        })
    }
}


export const getOTPForLinking = (mode , sendTo , userType) => {
  return (dispatch) =>{
    webApiCall.get(CHECK_LINK_GET_OTP +"?modeType="+mode+"&userId="+sendTo+"&userType="+userType)
      .then(response => {
        if(response){
          console.log(response.data);
          if(response.data['status'] === 200){ 
            dispatch(toggleModal('otp'));
            toastr.success(response.data["message"]);
          }
        } 
      })
      .catch(error => {
        if(error.response){
          if(error.response.data['status'] === 400){
            toastr.error(error.response.data['message']);
          }
        }else{
          //toastr.error("Mandatory field is empty");
        } 
      })
  }
}

export const getOTP = (mode,sendTo,type) => {
  return (dispatch) =>{
    webApiCall.get(GET_OTP +"?modeType="+mode+"&sendTo="+sendTo)
      .then(response => {
        if(response){
          console.log(response.data);
          if(response.data['status'] === 200){ 
            if(type === 'send'){
              // if(ctype === 'schedule'){
              //   dispatch(toggleModal('scheduleotp')); 
              // }else{
                dispatch(toggleModal('otp'));   
              //}   
            }
            if(type === 'resend'){
              const data=''
              dispatch(fetchOtpVerifiactionDetail(data,true));
            }
            toastr.success(response.data["message"]);
          }
        }  
      })
      .catch(error => {
        if(error.response){
          if(error.response.data['status'] === 400){
            toastr.error(error.response.data['message']);
          }
        }else{
          //toastr.error("Mandatory field is empty");
        }  
      })
  }
}

export const verifyOTP = (mode , userId, otp,verificationType) => {
  return (dispatch) =>{
    webApiCall.get(VERIFY_OTP +"?modeType="+mode+"&userId="+userId+"&otp="+otp)
      .then(response => {
        if(response){
            console.log(response.data);
            if(response.data['status'] === 200){ 
              if(verificationType==='linking') 
              {
                dispatch(isOtpVerifiedForLinking()); 
                sessionStorage.setItem('isOtpVerifiedForLinking',JSON.stringify(true)); 
  
              }
              else if(verificationType==='mobile'){
                dispatch(OtpVerified());
                sessionStorage.setItem('OtpVerified',JSON.stringify(true)); 

              }
              toastr.success(response.data["message"]);
              dispatch(toggleModal('otp')); 
            }
        }   
      })
      .catch(error => {
        sessionStorage.setItem('isOtpVerifiedForLinking',JSON.stringify(false)); 
        sessionStorage.setItem('OtpVerified',JSON.stringify(false));
        if(error.response){
          if(error.response.data['status'] === 400){
            const data= error.response.data['result']; 
            dispatch(fetchOtpVerifiactionDetail(data));  
            toastr.error(error.response.data['message']);
          }
        }else{
          //toastr.error("Mandatory field is empty");
        }  
      })
  }
}


export const getOAuthData = () => dispatch =>{
  dispatch(fetchUserDetails());
  webApiCall.get(GET_USER_DATA)
    .then(response => {
      if(response){
          if(response.data['status'] === 200){  
            // sessionStorage.setItem(USER_LOGGED_IN , JSON.stringify(true)); 
            sessionStorage.setItem(AUTHENTICATED , JSON.stringify(true)); 
            const user = response.data['result'];
            sessionStorage.setItem(USER_DATA , JSON.stringify(user));  
            sessionStorage.setItem(USER_ID,user['id']);
            dispatch(fetchUserOauthDetails(user));   
            history.push('/home');
          }
      }
    })
    .catch(error => {
      if(error.response){
        if(error.response.data['status'] === 400){
            // sessionStorage.setItem(USER_LOGGED_IN , JSON.stringify(false));  
            sessionStorage.setItem(AUTHENTICATED , JSON.stringify(false)); 
            toastr.error(error.response.data['message']);
            const errMsg = error.response.data['message'];
            dispatch(fetchUserError(errMsg));
        }else if(error.response.data['status'] === 401){
          // sessionStorage.setItem(USER_LOGGED_IN , JSON.stringify(false));  
          sessionStorage.setItem(AUTHENTICATED , JSON.stringify(false)); 
          toastr.error(error.response.data['message']);
          const errMsg = error.response.data['message'];
          dispatch(fetchUserError(errMsg));
        }else if(error.response.data['status'] === 404){
          const errMsg = error.response.data['message'];
          dispatch(fetchUserError(errMsg));
            if(error.response.data['message'] === 'USER_TYPE_NOT_FOUND'){
              dispatch(toggleModal('usertype'));
            }else{
              // sessionStorage.setItem(USER_LOGGED_IN , JSON.stringify(false));  
              sessionStorage.setItem(AUTHENTICATED , JSON.stringify(false)); 
              toastr.error(error.response.data['message']);
            }
        }
      }else{
        toastr.error("Error");
      } 
    })    
}

export const updateUserType = (userType) => dispatch =>{
  webApiCall.put(UPDATE_USER_TYPE+'?userType='+userType)
    .then(response => {
      if(response){
          if(response.data['status'] === 200){  
            dispatch(toggleModal("usertype"));
            // sessionStorage.setItem(USER_LOGGED_IN , JSON.stringify(true)); 
            sessionStorage.setItem(AUTHENTICATED , JSON.stringify(true)); 
            const user = response.data['result'];
            sessionStorage.setItem(USER_DATA , JSON.stringify(user));  
            dispatch(fetchUserOauthDetails(user)); 
            history.push('/home');
          }
      }
    })
    .catch(error => {
      if(error.response){
        if(error.response.data['status'] === 400){
          // sessionStorage.setItem(USER_LOGGED_IN , JSON.stringify(false));  
          sessionStorage.setItem(AUTHENTICATED , JSON.stringify(false)); 
          toastr.error(error.response.data['message']);
          const errMsg = error.response.data['message'];
          dispatch(fetchUserError(errMsg));
        }else if(error.response.data['status'] === 401){
          // sessionStorage.setItem(USER_LOGGED_IN , JSON.stringify(false));  
          sessionStorage.setItem(AUTHENTICATED , JSON.stringify(false)); 
          toastr.error(error.response.data['message']);
          const errMsg = error.response.data['message'];
          dispatch(fetchUserError(errMsg));
        }
      }else{
        toastr.error("Error");
      } 
    })    
}







