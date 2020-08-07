import {FETCH_USER_DETAILS , FETCH_USER_FAILURE , FETCH_USER_SUCCESS} from './types'
import {webApiCall} from '../ajax' 
import {SIGN_IN} from '../constants/constantUrl';
import {toggleModal , getOAuthData} from '../../redux-container';
import {toastr} from 'react-redux-toastr'
import {ACCESS_TOKEN , AUTHENTICATED} from '../constants/constantSessionKey';

const fetchUserDetails = ()=> {
  return {
    type : FETCH_USER_DETAILS,
  }
}

const fetchUserSuccess = (data)=> {
  return {
    type : FETCH_USER_SUCCESS,
    payload : data,
  }
}

const fetchUserError = (data)=> {
  return {
    type : FETCH_USER_FAILURE,
    payload : data,
  }
}

export const loginApp = (data) => {
  console.log("login app starts **** ");
    return (dispatch) =>{
     dispatch(fetchUserDetails);
     webApiCall.post(SIGN_IN , data)
          .then(response => {
            console.log(response);
            if(response){
              if(response['status'] === 200){ 
                sessionStorage.setItem(ACCESS_TOKEN , response['data']['accessToken']);
                // call user/me API
                dispatch(getOAuthData());
                dispatch(toggleModal('signin')); 
                toastr.success(response.data["message"]);    
              }
            }
          })
          .catch(error => {
            if(error.response){
              if(error.response.data.status === 400){  
                // sessionStorage.setItem(USER_LOGGED_IN , JSON.stringify(false));
                sessionStorage.setItem(AUTHENTICATED , JSON.stringify(false)); 
                const errMsg = error.message;
                dispatch(fetchUserError(errMsg));  
                toastr.error(error.response.data['message']);   
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
}