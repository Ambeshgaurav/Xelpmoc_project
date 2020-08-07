import React, { Component } from 'react';
// import { ACCESS_TOKEN } from '../../constants';
import { Redirect } from 'react-router-dom'
import {ACCESS_TOKEN} from '../../redux-container/constants/constantSessionKey';
// import {getOAuthData  , getOTP} from '../../redux-container';

class OAuth2RedirectHandler extends Component {
    // constructor(props){
    //    super(props);
    // }

    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {        
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        if(token) {
            // sessionStorage.setItem(USER_LOGGED_IN , true);
            sessionStorage.setItem(ACCESS_TOKEN, token);
            //this.props.getOAuthData();
             return <Redirect to={{
                 pathname: "/home",
                 state: { from: this.props.location }
             }}/>; 
        } 
        else {
            return <Redirect to={{
                pathname: "/login",
                state: { 
                    from: this.props.location,
                    error: error 
                }
            }}/>; 
        }
    }
}


// const mapStateToProps = state => {
//     return {
//       authenticated : state.signup['authenticated'],
//       loading : state.signup['loading'],  
//     }
//   }
  
  
//   const mapDispatchToProps = dispatch => {
//     return {
//       getOAuthData:() => dispatch(getOAuthData()),
//       getOtp : (modeType , sendTo) => dispatch(getOTP(modeType , sendTo)),
  
//     }
//   }
  
//export default connect(mapStateToProps,mapDispatchToProps)(OAuth2RedirectHandler);

export default OAuth2RedirectHandler;