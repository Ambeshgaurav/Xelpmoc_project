import React , { Component} from 'react';
import ReduxToastr from 'react-redux-toastr';
import {Route,Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import { ConnectedRouter} from 'connected-react-router'
import{ history } from './redux-container/store';

import './App.css';
import Footer from './components/footer';
import Home from './components/home';
import Search from './components/search';
import Main from './components/main';
import UserSetting from './components/user-setting';
import PropertyDetails from './components/property-details';
import PrivateRoute from './components/common/PrivateRoute'
import LoaderIndicator from './components/common/LoaderIndicator'
import OAuth2RedirectHandler from './components/oauth2/OAuth2RedirectHandler';
import AboutUs from './components/about-us/about-us';
import TermsCondition from './components/terms-condition';
import FrequentlyAskedQues from './components/frequently-asked-ques';
import Testimonial from './components/testimonial';
import {getOAuthData  , getOTP , getTopTrendingProperty} from './redux-container';
import { ACCESS_TOKEN,AUTHENTICATED } from './redux-container/constants/constantSessionKey';


// Create an enhanced history that syncs navigation events with the store


//**Flow of react class**
//1.constructor
//2.componentWillMount
//3.render
//4.componentDidMount

class App extends Component {
  constructor(props) {
    super(props);
    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);  
  }

loadCurrentlyLoggedInUser(){ 
  if(sessionStorage.getItem(ACCESS_TOKEN)) {   
    this.props.getOAuthData();
  }
  //this.props.getTopTrendingProperty();
}

componentDidMount(){
  console.log("comp did mount .... ");
  this.loadCurrentlyLoggedInUser();    
}

  render(){
      if(this.props.loading) {
        return <LoaderIndicator/>
      }
      let authenticated = JSON.parse(sessionStorage.getItem(AUTHENTICATED));

      return (
          <ConnectedRouter history={history}>
                   <Switch>
                      <Route exact path="/" component={Main}></Route>   
                      <PrivateRoute path="/home" authenticated={authenticated}
                        component={Home}></PrivateRoute>
                      <Route exact path="/login" component={Main}></Route> 
                      <Route exact path="/search" component={Search}></Route> 
                      <Route exact path="/aboutus" component={AboutUs}></Route> 
                      <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>  
                      <Route path="/property" component={PropertyDetails}></Route> 
                      <Route path="/termsconditions" component={TermsCondition}></Route> 
                      <Route exact path="/FAQ" component={FrequentlyAskedQues}></Route> 
                      <Route path="/usersetting" component={UserSetting}></Route> 
                      <Route path="/testimonial" component={Testimonial}></Route> 
                    </Switch> 

            <Footer/>  
              <ReduxToastr
                style={{ fontSize: '10px' }}
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="top-center"
                getState={(state) => state.toastr} // This is the default
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar
                closeOnToastrClick>
              </ReduxToastr> 
              <div className={`${this.props.backdrop ? 'modal-backdrop' : ''}`}></div>
              <div className={`${this.props.otpBackdrop ? 'modal-backdrop' : ''}`}></div>
          </ConnectedRouter>
        );
    }
}


const mapStateToProps = state => {
  return {
    authenticated : state.signup['authenticated'],
    loading : state.signup['loading'],  
    backdrop : state.header['modal-backdrop'],
    otpBackdrop : state.header['modal-otp-backdrop'],
  }
}


const mapDispatchToProps = dispatch => {
  return {
    getOAuthData:() => dispatch(getOAuthData()),
    getOtp : (modeType , sendTo) => dispatch(getOTP(modeType , sendTo)),
    //getTopTrendingProperty : () => dispatch(getTopTrendingProperty()),

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
