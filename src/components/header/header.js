import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import './header.css'
import SignIn from '../signin';
import {toggleModal, logoutApp, getTopTrendingProperty,
  getTermsAndCondition, getUserDetails, getFAQInfo, getPropertiesDetailBySearch, getCitiesBySearch,
  getCollegesByCity, getTestimonialInfo} from '../../redux-container';
import {USER_DATA,AUTHENTICATED,COLLEGE_DATA } from '../../redux-container/constants/constantSessionKey';
import logo from '../../assets/images/experion-logo.png'
import whiteLogo from '../../assets/images/experion-logo-white.png'
import { history } from '../../redux-container/store';
import Select from 'react-select';


class Header extends Component {
constructor(props){
    super(props);
    this.state = {
      headerClass1:'transparent-header',
      headerClass2:'',
      headerClass3:'',
      imgSrc: whiteLogo,
      city_id : null,
      college_id : null,
      isDisabled :true,
      occ_type : null
    }
}


componentDidMount() {
  console.log(history.location.pathname);
    if(history.location.pathname != ('/'||'/login')){
      if(history.location.pathname === ('/search') || history.location.pathname === ('/FAQ') || history.location.pathname === ('/termsconditions')){
        this.setState({headerClass1: "",headerClass2:"" , headerClass3:""});
        this.setState({imgSrc: logo});
      }else if(history.location.pathname !== ('/'||'/login')){
        this.setState({headerClass1: "",headerClass2:"sticky-nav-area" , headerClass3:"homey-in-view"});
        this.setState({imgSrc: logo});
      } 
    }
    if(history.location.pathname === '/login' || history.location.pathname === '/home' || history.location.pathname === '/'){
      this.callApiOnLoad("" , "login");
    }
    window.addEventListener('scroll', this.handleScroll);

    
}

componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
}

callApiOnLoad=(e,pathname)=>{
  console.log(pathname);
  if(pathname === ('usersetting')){
    this.props.getUserDetails();
  }else if(pathname === ('termsconditions')){
    this.props.getTermsAndCondition('header');
  }else if(pathname === ('FAQ')){
    this.props.getFAQInfo();
  }else if(pathname === ('testimonial')){
    this.props.getTestimonialInfo();
  }else if(pathname === ('login')){
    this.props.getPropertiesDetailBySearch(null,null,null,null,null,0,true);
  }
}

handleScroll = (event) => {
    if(history.location.pathname === ('/login') || history.location.pathname === ('/')){
      if (window.scrollY >= 0 && window.scrollY < 30) {
          this.setState({ headerClass1: "transparent-header",headerClass2:"" , headerClass3:""});
          this.setState({imgSrc: whiteLogo});
      }
      if (window.scrollY >= 30 && window.scrollY < 80) {
        this.setState({  headerClass1: "",headerClass2:"sticky-nav-area" , headerClass3:"" });
      }  
      if (window.scrollY >= 80) {
        this.setState({  headerClass1: "",headerClass2:"sticky-nav-area" , headerClass3:"homey-in-view"});
        this.setState({imgSrc: logo});
      }
    }else if(history.location.pathname === ('/search') || history.location.pathname === ('/FAQ') || 
    history.location.pathname === ('/termsconditions')){
      if (window.scrollY >= 0 && window.scrollY < 30) {
        this.setState({  headerClass1: "",headerClass2:"" , headerClass3:""});
        this.setState({imgSrc:logo});
      }
      if (window.scrollY >= 30 && window.scrollY < 80) {
        this.setState({  headerClass1: "",headerClass2:"sticky-nav-area" , headerClass3:"" });
      }  
      if (window.scrollY >= 80) {
        this.setState({  headerClass1: "",headerClass2:"sticky-nav-area" , headerClass3:"homey-in-view"});
        this.setState({imgSrc: logo});
      }
    }else{
      this.setState({headerClass1: "",headerClass2:"sticky-nav-area" , headerClass3:"homey-in-view"});
      this.setState({imgSrc: logo});
    }    
}

//*********** */ for search properties ***********
searchForCities=(data)=>{
  this.props.getCitiesBySearch(data);
}

getColleges=(data)=>{
  console.log(data);
  if(data){
    if(data['value']){
      this.setState({'city_id' : data['value']});
      sessionStorage.setItem('SELECTED_CITY', JSON.stringify(data));
      sessionStorage.removeItem('CITY_ID');
      sessionStorage.removeItem('COLLEGE_ID'); 
      this.setState({'isDisabled' : false});
      this.props.getCollegesByCity(data['value']);
    }else if(!data['value']){
        sessionStorage.removeItem('SELECTED_CITY');
        sessionStorage.removeItem('SELECTED_COLLEGE');
        sessionStorage.removeItem('CITY_ID');
        sessionStorage.removeItem('COLLEGE_ID'); 
        this.setState({'city_id' : null});
        this.setState({ 'college_id' : null});
        this.setState({'isDisabled' : true});
    }
  }else{
    sessionStorage.removeItem('SELECTED_CITY');
    sessionStorage.removeItem('SELECTED_COLLEGE');
    sessionStorage.removeItem('CITY_ID');
    sessionStorage.removeItem('COLLEGE_ID'); 
    this.setState({'city_id' : null});
    this.setState({ 'college_id' : null}); 
    this.setState({'isDisabled' : true});
  }  
}

handleCollegeChange = data => {
  if(data){
      if(data['value']){
        this.setState({ 'college_id' : data['value']});
        sessionStorage.setItem('SELECTED_COLLEGE', JSON.stringify(data));
        sessionStorage.removeItem('COLLEGE_ID');
      }else if(!data['value']){
        sessionStorage.removeItem('SELECTED_COLLEGE');
        sessionStorage.removeItem('COLLEGE_ID');
        this.setState({ 'college_id' : null});
      }
  }else{
    sessionStorage.removeItem('SELECTED_COLLEGE');
    sessionStorage.removeItem('COLLEGE_ID');
    this.setState({ 'college_id' : null});
  }   
};

handleOccupancyChange = data => {
  console.log(data);
  if(data){
      if(data['value']){
        this.setState({'occ_type' : data['value']});
        sessionStorage.setItem('SELECTED_OCCUPANCY', JSON.stringify(data));
        sessionStorage.removeItem('OCCUPANCY_TYPE');
      }else if(!data['value']){
        sessionStorage.removeItem('SELECTED_OCCUPANCY');
        sessionStorage.removeItem('OCCUPANCY_TYPE');
        this.setState({ 'occ_type' : null});
      }
  }else{
      sessionStorage.removeItem('SELECTED_OCCUPANCY');
      sessionStorage.removeItem('OCCUPANCY_TYPE');
      this.setState({ 'occ_type' : null});
  }
};


getPropertiesAccToFilter = () =>{

  console.log(this.state['occ_type']);
  console.log(this.state['college_id']);
  console.log(this.state['city_id']);

let city_id, college_id, occ_type;
let sort_key = sessionStorage.getItem('SORT_KEY');
let sort_order = sessionStorage.getItem('SORT_ORDER');

if(sessionStorage.getItem('CITY_ID')){
  city_id = sessionStorage.getItem('CITY_ID');
}else{
  city_id = this.state['city_id'];
}
if(sessionStorage.getItem('COLLEGE_ID')){
  college_id = sessionStorage.getItem('COLLEGE_ID');
}else{
  college_id = this.state['college_id']; 
}
if(sessionStorage.getItem('OCCUPANCY_TYPE')){
  occ_type = sessionStorage.getItem('OCCUPANCY_TYPE');
}else{
  occ_type = this.state['occ_type']
}

  this.props.getPropertiesDetailBySearch(city_id,college_id,occ_type,sort_key,sort_order,0,null);
}

//**************************** */


render() {

  //************ for search properties **********/
    const cdata = this.props.cityDataBySearch;
    const coldata = JSON.parse(sessionStorage.getItem(COLLEGE_DATA));
    let {isDisabled} = this.state;
   // console.log(sessionStorage.getItem('SELECTED_OCCUPANCY'));

    let colObj={},colArray=[{'value': '','label':'Search College'}]
    ,cityObj={} , cityArray=[{'value': '','label':'Search City'}] ;

    if(coldata){
      coldata.map((val , index)=>{
         colObj= {};
         colObj['value'] = val['college_id'];
         colObj['label'] = val['college_name'];
         colArray.push(colObj);
      })  
    }

    if(cdata){
      cdata.map((val , index)=>{
        cityObj= {};
        cityObj['value'] = val['cityId'];
        cityObj['label'] = val['city_name'];
        cityArray.push(cityObj);    
      })
    }
     let occupancyArray = [
      {'value' : '','label':'Select Occupancy'},
      {'value' : 'GIRLS' , 'label':'Girls'},
      {'value' : 'BOYS' , 'label':'Boys'},
      {'value' : 'BOTH' , 'label':'Boys & Girls'}]

    // let defaultCity= {'value' : '','label':'Select City'},
      // defaultCollege = {'value' : '','label':'Select College'},
      // defaultOcc =  {'value' : '','label':'Select Occupancy Type'};
      let defaultCity , defaultCollege , defaultOcc ;
      if( JSON.parse(sessionStorage.getItem('SELECTED_OCCUPANCY'))){
        defaultOcc = JSON.parse(sessionStorage.getItem('SELECTED_OCCUPANCY'));
      }
      if(JSON.parse(sessionStorage.getItem('SELECTED_CITY'))){
        defaultCity = JSON.parse(sessionStorage.getItem('SELECTED_CITY'));
        isDisabled = false;
      }
      if( JSON.parse(sessionStorage.getItem('SELECTED_COLLEGE'))){
        defaultCollege = JSON.parse(sessionStorage.getItem('SELECTED_COLLEGE'));
        isDisabled = false;
      }
      
  //**************************************************** */

        // let userLoggedIn = JSON.parse(sessionStorage.getItem(USER_LOGGED_IN));
        let authenticated = JSON.parse(sessionStorage.getItem(AUTHENTICATED));
        let userData = JSON.parse(sessionStorage.getItem(USER_DATA));
        return (<Fragment>       
         <div className={`nav-area header-type-1 ${(history.location.pathname !== ('/search') && history.location.pathname !== ('/FAQ') && history.location.pathname !== ('/termsconditions')) &&  this.state.headerClass1}`}>
            <header id="homey_nav_sticky" className={`header-nav hidden-sm hidden-xs ${this.state.headerClass2} ${this.state.headerClass3} `} data-sticky="1" style={(history.location.pathname !== ('/search') && history.location.pathname !== ('/FAQ') && history.location.pathname !== ('/termsconditions') ) ? {marginBottom: '-82px'}: {}}>
                <div className="container-fluid">
                    <div className="header-inner table-block">
                        <div className="header-comp-logo">
                          <h1>
                            {userData && authenticated ? <Link className="homey_logo" to="/home">
                              <img src={`${this.state.imgSrc}`}  alt="Experion" title="Experion" width="50" height="50"/>
                            </Link> : <Link className="homey_logo" to="/login">
                              <img src={`${this.state.imgSrc}`}  alt="Experion" title="Experion" width="50" height="50"/>
                            </Link>}
                          </h1>         
                        </div>
                    {/* <div className="header-comp-nav text-right">
                    
                    </div> */}
                    <div className="header-comp-right">
                        <div className="account-login nav navbar-nav navbar-right">
                          <ul className="login-register list-inline">
                                <li>
                                  <Link className="bold-word-400" to="aboutus">About Us</Link>
                                </li>
                                <li>
                                  <a className="bold-word-400" onClick={(e)=>this.callApiOnLoad(e,'termsconditions')}>Terms & Conditions</a>
                                </li> 
                                <li>
                                  <a className="bold-word-400"  onClick={(e)=>this.callApiOnLoad(e,'FAQ')}>FAQ</a>
                                </li>
                                <li>
                                  <a className="bold-word-400"  onClick={(e)=>this.callApiOnLoad(e,'testimonial')}>Testimonial</a>
                                </li>
                                  {/* for profile image */}
                                  {userData && authenticated && (userData['profile_url'] ? <li><img width="42" alt="" height="42" style={{'borderRadius': '24px'}} 
                                  src={userData['profile_url']}></img></li> : <li><div className="user-img"><span className="bold-word-400">
                                  {userData && userData['first_name'].substring(0,1)}</span></div></li>)}                          
                                 
                                   {/* for user name / email / mobile */}
                                  {userData && authenticated  ? ( userData['first_name'] ? <li style={{paddingLeft : '2px'}}><span className="bold-word-400">{userData['first_name']}</span></li> : (userData['email'] ? <li style={{paddingLeft : '2px'}}><span className="bold-word-400">{userData['email']}</span></li> : <li style={{paddingLeft : '2px'}}><span className="bold-word-400">{userData['mobile']}</span></li>)) : <li><a onClick={()=>this.props.toggle('signin')} className="bold-word-400">Login</a></li>}

                                  {/*******  dropdown in header **********/}
                                  { userData && authenticated ? <li className="dropdown" style={{paddingLeft : '2px'}}>
                                      <a href="#" className="dropdown-toggle" data-toggle="dropdown"> 
                                        <span className="caret"></span>
                                      </a>
                                        <ul className="dropdown-menu" role="menu">
                                          <li><a onClick={(e)=>this.callApiOnLoad(e,'usersetting')}>User Setting</a></li>
                                          <li className="divider"></li>
                                          <li><a onClick={()=>this.props.logout()}>Logout</a></li>
                                        </ul>
                                          </li> 
                                          : 
                                      <li><a onClick={()=>this.props.toggle('signup')} className="bold-word-400">Register</a></li>} 
                                        
                                          {/* <li className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown"> 
                                               <span className="caret"></span>
                                            </a>
                                            <ul className="dropdown-menu" role="menu">
                                              <li><a onClick={()=>this.props.logout()}>Logout</a></li>
                                              <li className="divider"></li>
                                              <li><Link to="#">User Setting</Link></li>
                                            </ul>
                                          </li> */}
                          </ul>   
                        </div>         
                    </div>
                  </div>
                </div>
            </header>

    {history.location.pathname === ('/search') && <div id="homey-main-search" className="main-search " data-sticky="0">
        <div className="container-fluid">
        <div className="search-wrap search-banner search-banner-desktop hidden-xs">
          <div className="search-destination">
                <Select
                  isClearable
                  placeholder={<div>Search City</div>}
                  name="city_id"
                  onChange={this.getColleges}
                  options={cityArray}
                  onInputChange = {this.searchForCities}
                  defaultValue={defaultCity}
                  />
          </div>
              <div className="search-destination">
                    <Select
                      isClearable
                      placeholder={<div>Search College</div>}
                      name="college_id"
                      onChange={this.handleCollegeChange}
                      options={colArray}
                      isDisabled={isDisabled}
                      defaultValue={defaultCollege}/>
              </div> 
            <div className="search-destination"> 
                  <Select
                    isClearable
                    placeholder={<div>Select Occupancy Type</div>}
                    name="occupancy_id"
                    onChange={this.handleOccupancyChange}
                    options={occupancyArray}
                    defaultValue={defaultOcc}
                    />
            </div>              	
          <div className="search-button">
            <button className="btn btn-primary" onClick={this.getPropertiesAccToFilter}>Search</button> 
            {/* <Link to="#" type="submit" className="btn btn-primary" onclick="">Search</Link> */}
          </div>
      </div> 	
        </div>
      </div>}
  <SignIn></SignIn>
  </div>
  </Fragment> )
  }
}

{/* <li>{userData['name']}</li>*/}
const mapStateToProps = state => {
  return {
    loggedIn : state.signin['loggedIn'],
    loggedInUsername : state.signin['userData']['name'],
    authenticated : state.signup['authenticated'],
    loading : state.signup['loading'], 
    cityDataBySearch : state['property']['cityDataBySearch'],
    collegeDataByCity : state['property']['collegeDataByCity'],
  }
}

const mapDispatchToProps = (dispatch) =>{
   return {
      toggle: (type)=> dispatch(toggleModal(type)),
      logout:()=> dispatch(logoutApp()),
      getTopTrendingProperty : ()=> dispatch(getTopTrendingProperty()),
      getTermsAndCondition :(type)=>dispatch(getTermsAndCondition(type)),
      getUserDetails :()=> dispatch(getUserDetails()),
      getFAQInfo : ()=> dispatch(getFAQInfo()),
      getPropertiesDetailBySearch :(city,college,occupancy,sortKey,sortOrder,offset,isTrending) => dispatch(getPropertiesDetailBySearch(city,college,occupancy,sortKey,sortOrder,offset,isTrending)),
      getCitiesBySearch:(name) => dispatch(getCitiesBySearch(name)),
      getCollegesByCity:(cityId) => dispatch(getCollegesByCity(cityId)),
      getTestimonialInfo:()=>dispatch(getTestimonialInfo()),
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);