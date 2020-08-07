import {FETCH_USER_DETAILS , FETCH_USER_SUCCESS ,FETCH_USER_FAILURE} from './types'

const initialSignInState = {
    loading:false,
    userData : {},
    loggedIn:false
}

const signinReducer = (state = initialSignInState , action) =>{
    switch(action.type){
        case FETCH_USER_DETAILS : return {
          ...state , 
          loading : true,
          loggedIn : false,
          userData : {},
        } 
        case FETCH_USER_SUCCESS : return {
            loading  : false ,    
            loggedIn : true,
            userData : action.payload,

        }
        case FETCH_USER_FAILURE : return {
            loading : false,
            loggedIn : false,
            userData : {},
        }
        default : return state;
    }  
}

export default signinReducer;