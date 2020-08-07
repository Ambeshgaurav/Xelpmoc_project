import {SIGNINMODAL , SIGNUPMODAL , OTPMODAL , USERTYPEMODAL,SCHEDULEVISITMODAL , 
  REFERRALMODAL,BOOKINGMODAL,BANNERIMAGE,TERMSCONDITIONMODAL} from './types';
import {toastr} from 'react-redux-toastr';
import {webApiCall} from '../ajax' 
import {USER_ACCOUNT_DETAILS , TERMS_CONDITIONS ,FAQ_INFO , TESTIMONIAL_INFO} from '../constants/constantSessionKey';
import {history } from './../store';
import {GET_TERMS_AND_CONDITIONS , GET_FAQ_INFO , USER_DETAILS, GET_TESTIMONIALS_INFO, SEND_REFERRAL_CODE,GET_BANNER_IMAGE} from '../constants/constantUrl';



const toggleSignInModal = ()=> {
  return {
    type:SIGNINMODAL,
  }
}
const toggleSignUpModal = ()=> {
  return {
    type:SIGNUPMODAL
  }
}
const toggleOtpModal = ()=> {
  return {
    type:OTPMODAL
  }
}
const toggleUserTypeModal = ()=> {
  return {
    type:USERTYPEMODAL
  }
}
const toggleScheduleVisitModal = ()=> {
  return {
    type:SCHEDULEVISITMODAL
  }
}
const toggleReferralModal = ()=> {
  return {
    type:REFERRALMODAL
  }
}

const toggleBookingModal = ()=> {
  return {
    type:BOOKINGMODAL
  }
}
const toggleTermsConditionModal = ()=> {
  return {
    type:TERMSCONDITIONMODAL
  }
}


export const toggleModal = (type) =>{
  return (dispatch)=> {
    if(type === 'signin'){
      //sessionStorage.removeItem("SITE-VISIT-MODAL");
      dispatch(toggleSignInModal());
    }else if(type === 'signup'){
      sessionStorage.removeItem('OtpVerified'); 
      sessionStorage.removeItem('isOtpVerifiedForLinking'); 
      dispatch(toggleSignUpModal());
    }else if(type === 'otp'){
      dispatch(toggleOtpModal());
    }else if(type === 'usertype'){
      dispatch(toggleUserTypeModal());
    }else if(type === 'schedulevisit') {
      sessionStorage.removeItem('OtpVerified'); 
      sessionStorage.removeItem('isOtpVerifiedForLinking'); 
      dispatch(toggleScheduleVisitModal());
    }else if(type === 'referral'){
      dispatch(toggleReferralModal());
    }else if(type === 'bookingroom'){
      dispatch(toggleBookingModal());
    }else if(type === 'termscondition'){
      dispatch(toggleTermsConditionModal());
    }
  } 
} 

export const logoutApp = () =>{
  return (dispatch) =>{
      sessionStorage.clear();
      toastr.success("Logged out successfully");    
      history.push('/login');
  }
}

export const getUserDetails = () =>{
  return (dispatch) =>{
    //if(!JSON.parse(sessionStorage.getItem(USER_ACCOUNT_DETAILS))){
      webApiCall.get(USER_DETAILS)
      .then(response => {
        console.log(response);
        if(response){
          if(response['status'] === 200){   
            const user = response.data['result'];
            sessionStorage.setItem(USER_ACCOUNT_DETAILS , JSON.stringify(user));
            history.push('/usersetting');
          }
        }
      })
      .catch(error => {
        if(error.response){
          if(error.response.data.status === 400){  
            toastr.error(error.response.data['message']);
          }else if(error.response.data['status'] === 401){
            toastr.error(error.response.data['message']);
          }
        }else{
          toastr.error("Error");
        }   
      })
   //}
 }
}

export const sendReferralCode = (modeType,userId) => {
  return (dispatch) =>{
     webApiCall.get(SEND_REFERRAL_CODE+"?modeType="+modeType+"&userId="+userId)
          .then(response => {
            console.log(response);
            if(response){
              if(response['status'] === 200){ 
                toastr.success(response.data['message']);  
                dispatch(toggleModal('referral')); 
              }
            }
          })
          .catch(error => {
            if(error.response){
              toastr.error(error.response.data['message']);
            }
          })
    }
}



export const getTermsAndCondition = (type) => {
  console.log(type);
  
  return (dispatch) =>{
     webApiCall.get(GET_TERMS_AND_CONDITIONS)
          .then(response => {
            console.log(response);
            if(response){
              if(response['status'] === 200){ 
                let data = response['data']['result'];
                sessionStorage.setItem(TERMS_CONDITIONS , JSON.stringify(data));
                if(type==="header") {
                  history.push('/termsconditions');    
                }
              }
            }
          })
          .catch(error => {
            if(error.response){
            }
          })
    }
}


export const getFAQInfo = () => {
  return (dispatch) =>{
     webApiCall.get(GET_FAQ_INFO)
          .then(response => {
            console.log(response);
            if(response){
              if(response['status'] === 200){ 
                let data = response['data']['result'];
                sessionStorage.setItem(FAQ_INFO , JSON.stringify(data)); 
                history.push('/FAQ');     
              }
            }
          })
          .catch(error => {
            if(error.response){
            }
          })
    }
}

export const getTestimonialInfo = () => {
  return (dispatch) =>{
     webApiCall.get(GET_TESTIMONIALS_INFO)
          .then(response => {
            console.log(response);
            if(response){
              if(response['status'] === 200){ 
                let data = response['data']['result']['user_details'];
                console.log(data);
                sessionStorage.setItem(TESTIMONIAL_INFO , JSON.stringify(data));   
                history.push('/testimonial');  
              }
            }
          })
          .catch(error => {
            if(error.response){
            }
          })
    }
}
export const getBannerImage = () => {
  return async (dispatch) =>{
      await webApiCall.get(GET_BANNER_IMAGE)
           .then(response => {
             console.log(response);
             if(response){
               if(response['status'] === 200){ 
                let data = response['data']['result']; 
                 dispatch({type:BANNERIMAGE,payload:data});
               }
             }
           })
           .catch(error => {
             if(error.response){
               if(error.response.data.status === 400){  
                 toastr.error(error.response.data['message']);  
               }else{
                 toastr.error(error.response.data['message']); 
               }
             } 
           })
     }
}




