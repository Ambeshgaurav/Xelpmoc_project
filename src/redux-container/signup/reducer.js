import {FETCH_USER_DETAILS , FETCH_USER_SUCCESS ,FETCH_USER_FAILURE , FETCH_USER_OAUTH_DATA,FETCH_OTP_VERIFICATION_DETAIL,OTP_VERIFIED,OTP_VERIFIED_FOR_LINKING} from './types'

const initialSignUpState = {
    loading:false,
    userData : {},
    otpDetail:'',
    authenticated : false,
    isOtpVerified:false,
    isOtpVerifiedForLinking:false

}

const signupReducer = (state = initialSignUpState , action) =>{
    switch(action.type){
        case FETCH_USER_DETAILS : return {
          ...state , 
          loading : true,
          authenticated : false
        } 
        case FETCH_USER_SUCCESS : return {
            loading : false ,
            userData : action.payload,
            authenticated : false
        }
        case FETCH_USER_FAILURE : return {
            loading : false,
            loggedIn : false,
            userData : {},
        }
        case FETCH_USER_OAUTH_DATA : return {
            loading : false,
            userData : action.payload,
            authenticated : true
        }
        case FETCH_OTP_VERIFICATION_DETAIL:return{
            loading : false,
            otpDetail : action.payload,
            authenticated : true,
        }
        case OTP_VERIFIED:return{
            loading : false,
            authenticated : true,
            isOtpVerified:true,
        }
        case OTP_VERIFIED_FOR_LINKING:return{
            loading : false,
            authenticated : true,
            isOtpVerifiedForLinking:true,
            isOtpVerified:true
        }
        
        default : return state;
    }  
}

export default signupReducer;