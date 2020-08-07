import {SIGNINMODAL , SIGNUPMODAL , OTPMODAL , USERTYPEMODAL,SCHEDULEVISITMODAL , SCHEDULEOTPMODAL,
    REFERRALMODAL , BOOKINGMODAL,BANNERIMAGE,TERMSCONDITIONMODAL} from './types'

const initialHeaderState = {
    'signin-modal': false,
    'signup-modal': false,
    'otp-modal' :false,
    'usertype-modal' : false,
    'authenticated' : false,
    'schedule-visit-modal': false,
    'referral-modal' : false,
    'booking-room' : false,
    'modal-backdrop' : false,
    'modal-otp-backdrop':false,
    'terms-condition':false,
}

const headerReducer = (state = initialHeaderState , action) =>{
    switch(action.type){
        case SIGNINMODAL : return {
          ...state , 'signin-modal' : !state['signin-modal'],
          'modal-backdrop' : !state['modal-backdrop'],
        } 
        case SIGNUPMODAL : return {
            ...state , 'signup-modal' : !state['signup-modal'],
            'modal-backdrop' : !state['modal-backdrop'],
        }
        case OTPMODAL : return {
            ...state , 'otp-modal' : !state['otp-modal'],
            'modal-otp-backdrop' : !state['modal-otp-backdrop'],
        }
        case USERTYPEMODAL : return {
            ...state , 'usertype-modal' : !state['usertype-modal'],
            'modal-backdrop' : !state['modal-backdrop'],
        }
        case SCHEDULEVISITMODAL : return {
            ...state , 'schedule-visit-modal' : !state['schedule-visit-modal'],
            'modal-backdrop' : !state['modal-backdrop'],
        }
        case REFERRALMODAL : return{
            ...state , 'referral-modal' : !state['referral-modal'],
            'modal-backdrop' : !state['modal-backdrop'],
        }
        case BOOKINGMODAL : return {
            ...state , 'booking-room' : !state['booking-room'],
            'modal-backdrop' : !state['modal-backdrop'],
        }
        case TERMSCONDITIONMODAL : return {
            ...state , 'terms-condition' : !state['terms-condition'],
            'modal-backdrop' :true, 
        }
        case BANNERIMAGE : return {
            ...state ,
            bannerImage:action.payload,
        }
       
        default : return state;
    }  
}

export default headerReducer;