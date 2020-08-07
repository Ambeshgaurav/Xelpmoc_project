import React, { Component } from 'react';
import './signin.css'
import {connect} from 'react-redux';
import {loginApp , toggleModal} from '../../redux-container';
import SignUp from '../signup'
import {GOOGLE_AUTH_URL , FACEBOOK_AUTH_URL} from '../../redux-container/constants/constantUrl';


class SignIn extends Component {  
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
        "email": "",
        "password" : "",
          errors:{
          email:'',
          password:''
        }
    }
   
    this.saveData = this.saveData.bind(this);
  }

  saveData = (e) =>{  
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name] : value});
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
            case "email" :{
              errors["email"] = value.length ? false: true;
              break;
            } 
            case "password" :{
              errors["password"] = value.length ? false: true;
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

      if(!fields["email"]){
          formIsValid = false;
          errors["email"] = true;        
      }

      if(!fields["password"]){
        formIsValid = false;
        errors["password"] = true;        
      }
      

      this.setState({errors:errors}) 
     
      if(formIsValid){
        this.props.loginForm(this.state)
          //this.resetModal();
      }
}

  openSignupCloseSignin(){
    this.props.toggleModal('signin');
    this.props.toggleModal('signup');
    sessionStorage.removeItem('SITE-VISIT-MODAL');
  }


  resetModal=()=>{
    this.setState({ "email": "","password" : "","errors":""});
    this.props.toggleModal('signin');
    sessionStorage.removeItem('SITE-VISIT-MODAL');
  }

  render() {
    return (
      <div>
    <div className={`modal fade custom-modal-login in ${this.props.openSignInModal ? "showModal" : "hideModal"}`} id="modal-login" tabIndex="-1" role="dialog" data-backdrop="static">
       <div className="modal-dialog clearfix" role="document">
          <div className="modal-body-left pull-left" style={{'backgroundImage': 'url(https://demo01.gethomey.io/wp-content/uploads/2018/10/01-3.jpg)' ,  'backgroundSize': 'cover', 'backgroundRepeat' : 'no-repeat' , 'backgroundPosition' : '50% 50%'}}>
            <div className="login-register-title">
                Welcome back Please Login            
            </div>
          </div>
        
        <div className="modal-body-right pull-right">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" aria-label="Close" onClick={this.resetModal}><span aria-hidden="true">×</span></button>
                    {JSON.parse(sessionStorage.getItem('SITE-VISIT-MODAL')) ? <h4 className="modal-title">Please login to continue</h4> : <h4 className="modal-title">Login</h4>}
                </div>
                <div className="modal-body">
                   <div className="homey_login_messages message"></div>
                   <a href={FACEBOOK_AUTH_URL}><button type="button" className="homey-facebook-login btn btn-facebook-lined btn-full-width"><i className="fa fa-facebook" aria-hidden="true"></i> Login with Facebook</button></a>
                   <a href={GOOGLE_AUTH_URL}><button type="button" className="homey-google-login btn btn-google-plus-lined btn-full-width"><i className="fa fa-google-plus" aria-hidden="true"></i> Login with Google</button></a>
                        <div className="modal-login-form">
                           <p className="text-center"><strong>OR</strong></p>
                         
                                <div className="form-group">
                                    <input type="text" name="email" value={this.state['email']} className={this.state.errors.email  ? "req-error" : "form-control email-input-1" } placeholder="Email/Mobile"
                                    onInput={(event)=>{this.saveData(event); this.isValidate(event, 'input')}}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" name="password" value={this.state['password']}  className={this.state.errors.password ? "req-error":"form-control password-input-2"} placeholder="Password"
                                    onInput={(event)=>{this.saveData(event); this.isValidate(event,'input')}}/>
                                </div>
                                <div className="checkbox pull-left">
                                    <label><input name="remember" type="checkbox"/>Remember me</label>
                                </div>
                                <div className="forgot-password-text pull-right">
                                  {/* <span></span> */}
                                    {/* <a href="#" data-toggle="modal" data-target="#modal-login-forgot-password" onClick={()=>this.props.toggleModal('signin')}>Forgot password?</a> */}
                                </div>

                                <input type="hidden" id="homey_login_security" name="homey_login_security" value="d2fec70811"/>
                                <input type="hidden" name="_wp_http_referer" value="/listing/modern-apartment-with-pool/?detail_layout=v1"/>               
                                <input type="hidden" name="action" id="homey_login_action" value="homey_login"/>
                                <button type="button" className="homey_login_button btn btn-primary btn-full-width" 
                                onClick={()=>{this.checkValidationOnSubmit()}}>Log In</button>
                      
                            <p className="text-center">Don't have an account? 
                            <a  onClick={()=>this.openSignupCloseSignin()}> Register </a></p>
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>
<SignUp></SignUp>
</div>     
    );
  }
}


const mapStateToProps = state => {
    return {
      openSignInModal : state.header['signin-modal'],
      openSheduleModal : state.header['shedule-visit-model'],
      // openScheduleLoginModal : state.header['schedulevisit-loginmodal'],
    }
}

const mapDispatchToProps = dispatch => {
    return {
      loginForm:  data => dispatch(loginApp(data)),
      toggleModal: type => dispatch(toggleModal(type))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
