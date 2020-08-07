import React, { Component, Fragment, useState } from 'react';
import Pagination from "react-js-pagination";
import './search.css'
import Header from '../header';
import {ACCESS_TOKEN,USER_DATA,PROPERTY_DATA_BY_SEARCH,USER_ID} from '../../redux-container/constants/constantSessionKey';
import { connect } from 'react-redux';
import {getPropertiesDetailBySearch , getPropertyById , toggleModal , getOTP , verifyOTP,getScheduleVisit} from '../../redux-container';
import Select from 'react-select';
import {DateTimePicker } from '@progress/kendo-react-dateinputs'
import '@progress/kendo-react-intl'

class Search extends Component {
  constructor(props){
      super(props);
      this.state = {
        activePage: 1,
        sortKey:null,
        sortOrder:null
      };
  }

scheduleVisit=(prptyId)=>{
    this.setState({property_id:prptyId})
    this.props.toggleModal('schedulevisit');
}  
 
handlePageChange = (pageNumber) => {
    this.setState({activePage: pageNumber});
    this.getProperty((pageNumber-1));
}

handleSortingChange = data => {
    if(data){
        if(data['value']){
            let d = data['value'].split('-');
            this.setState({ 'sortKey' : d[0]});
            this.setState({ 'sortOrder' : d[1]});
            sessionStorage.setItem('SORT_KEY',d[0]);
            sessionStorage.setItem('SORT_ORDER',d[1]);
            this.setState({'activePage' : 1});
            this.getProperty(0);
        }else{
          sessionStorage.removeItem('SORT_KEY');
          sessionStorage.removeItem('SORT_ORDER'); 
        }
    }else{
        sessionStorage.removeItem('SORT_KEY');
        sessionStorage.removeItem('SORT_ORDER');
    }
};

getProperty(offset){
   let city_id = sessionStorage.getItem('CITY_ID');
   let college_id = sessionStorage.getItem('COLLEGE_ID');
   let occ_type = sessionStorage.getItem('OCCUPANCY_TYPE');
   let sort_key = sessionStorage.getItem('SORT_KEY');
   let sort_order = sessionStorage.getItem('SORT_ORDER');
   this.props.getPropertiesDetailBySearch(city_id,college_id,occ_type,sort_key,sort_order,offset,null);
}

render() {
   let propsData = [];
   if(sessionStorage.getItem(PROPERTY_DATA_BY_SEARCH)){
        propsData =  JSON.parse(sessionStorage.getItem(PROPERTY_DATA_BY_SEARCH));
   }

   let userId = sessionStorage.getItem(USER_ID);

   let sortArray = [
    {'value' : 'startingPrice-asc','label':'Sort By'},
    {'value' : 'startingPrice-asc', 'label':'Price (Low to High)'},
    {'value' : 'startingPrice-desc', 'label':'Price (High to Low)'}];

    return (
    <Fragment>
     <Header/> 
    <div id="section-body" style={{transform: 'none', paddingTop: '0px'}}>

    <section className="main-content-area listing-page listing-page-full-width homey-matchHeight-needed" style={{transform: 'none',}}>
      <div className="container">
          <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="page-title">
                      <div className="block-top-title">
                          <ol className="breadcrumb"><li itemScope="" itemType="http://data-vocabulary.org/Breadcrumb">
                              <a itemProp="url" href="https://demo01.gethomey.io/"><span itemProp="title">Home</span></a></li>
                              <li className="active">Search Results</li></ol>                    
                              {propsData['result'] && propsData['result'].length >0 ? <h1 className="listing-title">Search Results</h1> : 
                              <h1 className="listing-title">No Record Found</h1>}
                      </div>
                  </div>
              </div>
          </div>
      </div>
  
      <div className="container" style={{transform: 'none',}}>
          <div className="row" style={{transform: 'none',}}>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
  
                  
        {propsData['result'] && propsData['result'].length >0 && <div className="sort-wrap clearfix">
                <div className="pull-left">
                    <div id="listings_found" className="number-of-listings">
                    </div>
                </div>
                <div className="pull-right">
                    <ul className="list-inline">
                        <li><strong>Sort By:</strong></li>
              {/* <li>
                  <div className="btn-group bootstrap-select"><button type="button" className="btn dropdown-toggle bs-placeholder btn-default" data-toggle="dropdown" role="button" data-id="sort_listings" title="Default Order"><span className="filter-option pull-left">Default Order</span>&nbsp;<span className="bs-caret"><span className="caret"></span></span></button><div className="dropdown-menu open" role="combobox"><ul className="dropdown-menu inner" role="listbox" aria-expanded="false"><li data-original-index="1" className="selected"><a tabIndex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="true"><span className="text">Default Order</span>
                  <span className="glyphicon glyphicon-ok check-mark">
                    </span></a></li><li data-original-index="2">
                    <a tabIndex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span className="text">Price (Low to High)</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3"><a tabIndex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span className="text">Price (High to Low)</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="4"><a tabIndex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span className="text">Rating</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="5"><a tabIndex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span className="text">Featured First</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="6"><a tabIndex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span className="text">Date Old to New</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="7"><a tabIndex="0" className="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false"><span className="text">Date New to Old</span><span className="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div>
                   */}
            {/* <select id="sort_listings" className="selectpicker" title="Default Order" data-live-search-style="begins" data-live-search="false" tabIndex="-98"><option className="bs-title-option" value="">Default Order</option>
                  <option value="">Default Order</option>
                  <option value="a_price">Price (Low to High)</option>
                  <option value="d_price">Price (High to Low)</option>
                  <option value="d_rating">Rating</option> 
                  <option value="featured_top">Featured First</option> 
                  <option value="a_date">Date Old to New</option>
                  <option value="d_date">Date New to Old</option>
            </select> */}
              
        {/* </div>
              </li> */}
             <li> <div className="search-destination"> 
                    <Select
                      placeholder={<div>Sort By</div>}
                      onChange={this.handleSortingChange}
                      options={sortArray} 
                    />
                </div> 
             </li>
          </ul>
      </div>
   </div>  }             

        <div className="listing-wrap item-grid-view">
          <div className="row">
            {propsData['result'] && propsData['result'].map((property,index)=>{ 
              return (<div key={index} className="item-wrap infobox_trigger homey-matchHeight" style={{height: '430px',}}>
                          <div className="media property-item">
                        <div className="media-left">
                            <div className="item-media item-media-thumb"> 
                                <span className="label-wrap top-left">
                                    <span className="label label-success label-featured">Featured</span>
                                </span>
                                <a className="hover-effect">
                                    <img width="450" height="300" src= {property['image_url']} className="img-responsive wp-post-image" alt=""  sizes="(max-width: 450px) 100vw, 450px"/>                
                                </a>
                                <div className="item-media-price">
                                    <span className="item-price">
                                        <sup>Rs</sup>{property['startingPrice']}<sub>/month</sub>
                                    </span>
                                    <span className="item-user-image item-price" style={property['occupancy_type'] === 'BOTH' ? {'fontSize': '18px'} : {'fontSize': '18px'}}>                      
                                        {property && property['occupancy_type'] === 'BOTH' ? 'Boys & Girls' : property['occupancy_type'] === 'GIRLS' ? 'Girls only' : 'Boys only'}
                                    </span>
                                </div> 
                               
                            </div>
                        </div>
                        <div className="media-body item-body clearfix">
                            <div className="item-title-head table-block">
                                <div className="title-head-left">
                                    <h2 className="title"><a>
                                    {property && property['property_name']}</a></h2>
                                    <address className="item-address">   
                                        {property && property['address']} , {property && property['landmark']} , {property && property['city']} , {property && property['state']} ,  {property && property['pin_code']} 
                                        {/* {property['location'] && (property['location']['address'], property['location']['landmark'], property['location']['city'], property['location']['state'], property['location']['pin_code']} */}
                                    </address>              
                                </div>
                            </div>  
                            <ul className="item-amenities-button">
                                <li>
                                   <button className=" btn  btn-grey-outlined" tabIndex="-1" onClick={()=>this.props.getPropertyById(property['id'] , userId)}>Explore</button>
                                </li>
                                <li>
                                    <button className=" btn btn-primary"  onClick={()=>this.scheduleVisit(property['id'])}>Schedule Visit</button>
                                </li>                            
                            </ul>  
    <div className="item-footer">   
                        </div>
                     </div>
                   </div>
                </div>)                 
            })} 

          </div>

        {(propsData['totalSize'] > 6) && <Pagination
          hideFirstLastPages
          activePage={this.state.activePage}
          prevPageText= {<i className="fa fa-angle-left"></i>}
          nextPageText={<i className="fa fa-angle-right"></i>}
          itemsCountPerPage={6}
          totalItemsCount={propsData['totalSize']}
          pageRangeDisplayed={4}
          onChange={this.handlePageChange}
        />}
                                              
            </div>                
              </div>
          </div>
      </div>      
  </section>
  </div>
  <ScheduleVisit data={this.props} propertyId={this.state['property_id']}></ScheduleVisit>
</Fragment>) ;
  }
}

//Schedule Visit
function ScheduleVisit(props){
    const [date_time ,setDateTime] = useState((new Date()).toISOString());
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
 
    const [error_mobile ,setErrorMobile] = useState(null);
    const [error_first_name, setErrorFirstName] = useState(null);
    const [error_last_name, setErrorLastName] = useState(null);
    const [error_date_time, setErrorDateTime] = useState("");
 
   
    let token;
    token=sessionStorage.getItem(ACCESS_TOKEN);
    console.log(token);    
 
     let property_id ,user_data=[],user_id;
     if(JSON.parse(sessionStorage.getItem(USER_DATA))){
      user_data= JSON.parse(sessionStorage.getItem(USER_DATA));
     }
     let isOtpVerified= JSON.parse(sessionStorage.getItem('OtpVerified'));
      console.log(user_data);
      if(Object.keys(user_data).length > 0){
          user_id=user_data['id'];
      }
       if(props.propertyId){
          console.log(props.propertyId);
          property_id=props.propertyId;
       }
     
    const saveData = (e) =>{
      console.log(e.target.value);
      let val = e.target.value;
      let name = e.target.name;
      if(val && name === 'first_name'){
         setFirstName(first_name => val)
      }else if(val && name === 'last_name'){
         setLastName(last_name => val)
      }else if(val && name === 'mobile'){
         setMobile(mobile => val)
      }else if(val){
         val= val.toISOString();
         setDateTime(date_time => val);;
      } 
      
      console.log(date_time);
      console.log(first_name);
      console.log(mobile);
    }
 
    const checkMobileNoOnOtpBtn = ()=>{
       let formIsValid = true;
      
         if(!mobile){
           formIsValid = false;
           setErrorMobile(error_mobile => true);
         }else{
          setErrorMobile(error_mobile => false);
         }
    
         console.log(mobile);
         console.log(error_mobile);
         if(formIsValid){
           props.data.getOtp('MOBILE' , mobile,'send');
         }
     }
 
     const checkValidationOnSubmit= ()=>{
      let formIsValid = true;
 
       let token=sessionStorage.getItem(ACCESS_TOKEN);
       if(!token){
           if(!first_name){
             formIsValid = false;
             setErrorFirstName(error_first_name => true);
           }
           if(!last_name){
             formIsValid = false;
             setErrorLastName(error_last_name => true);
           }
           if(!mobile){
             formIsValid = false;
             setErrorMobile(error_mobile => true);
           }
           if(!date_time){
             formIsValid = false;
             setErrorDateTime(error_date_time => true);
           }
       }else{
          if(!date_time){
             formIsValid = false;
             setErrorMobile(error_date_time => true);
           }
       }    
           if(formIsValid){
             submitData();
           }
     }
     
     const submitData=(e)=>{
        console.log('submit');
        let data = {};
          if(token){
             data ={
                user_id:user_id,
                property_id:property_id,
                visit_time:date_time.toString(),
             }
          }else{
             data={
                first_name : first_name,
                last_name : last_name,
                mobile : mobile,
                property_id:property_id,
                visit_time:date_time.toString(),
             }
          }
      
      props.data.getScheduleVisit(data);
      //resetModal();
    }
 
    const resetModal=()=>{
      setFirstName(first_name => '');
      setLastName(last_name => '');
      setMobile(mobile => '');
      setDateTime(date_time => '');
      props.data.toggleModal('schedulevisit');
   }
 
   
    return (
       <Fragment>
       <div className={`modal fade custom-modal-login in ${props.data.openScheduleModal ? "showModal" : "hideModal"}`} id="modal-login" tabIndex="-1" role="dialog">
       <div className="modal-dialog clearfix" role="document">
           
             <div className="modal-body-left pull-left" style={{'backgroundImage': 'url(https://demo01.gethomey.io/wp-content/uploads/2018/10/01-3.jpg)' ,  'backgroundSize': 'cover', 'backgroundRepeat' : 'no-repeat' , 'backgroundPosition' : '50% 50%'}}>
               <div className="login-register-title">
                 Schedule Visit          
               </div>
             </div>
           
           <div className="modal-body-right pull-right">
               <div className="modal-content">
                   <div className="modal-header">
                       <button type="button" className="close" aria-label="Close" onClick={()=>resetModal()}><span aria-hidden="true">×</span></button>
                       <h4 className="modal-title">Schedule Visit</h4>
                   </div>
                   <div className="modal-body">
                      <div className="homey_login_messages message"></div>
   
                           <div className="modal-login-form">
                              <p className="text-center"><strong></strong></p>
                                  {!token && <div className="form-group">
                                     <input type="text" name="first_name" value={first_name} className={error_first_name  ? "req-error" : "form-control email-input-1" } placeholder="First Name"
                                     onInput={(e)=>{saveData(e)}}/>
                                  </div>} 
                                  {!token && <div className="form-group">
                                     <input type="text" name="last_name" value={last_name} className={error_last_name  ? "req-error" : "form-control email-input-3" } placeholder="Last Name"
                                     onInput={(e)=>{saveData(e)}}/>
                                  </div> } 
                                  {!token && <div className="form-group">
                                     <input text="input" name="mobile" value={mobile} placeholder="Mobile" type="text" className={error_mobile  ? "req-error" : "form-control email-input-3" }  
                                     onInput={(e)=>{saveData(e)}} />
                    
                                  </div>}
                                  <div className={error_date_time  ? "form-group req-error" : "form-group" }>
                                        {/* <input type="datetime-local" name="date_time" className="form-control email-input-2" placeholder="Date/Time" onInput={(e)=>saveData(e)}/> */}
                                        <DateTimePicker
                                          format="dd/MM/yyyy hh:mm:ss"
                                          formatPlaceholder="formatPattern"
                                          min={new Date()}
                                          onChange={(e)=>saveData(e)}
                                          defaultValue={new Date()}
                                       />
                                  </div> 
                                  {!token && <div className="form-group">
                                     {!isOtpVerified && <button data-test="button" type="button"  onClick={()=>checkMobileNoOnOtpBtn()}
                                      className="btn btn-primary btn-full-width Ripple-parent mt-5">Get OTP</button> }
                                      {isOtpVerified && <button data-test="button" type="button"  
                                      className="btn btn-success btn-full-width mt-5 Ripple-parent "> <i className="fa fa-check"></i> Verified</button>   }
                                  </div>}                                
                                 
                                  <div className="form-group">    
                                     <button type="button" className="homey_login_button btn btn-primary btn-full-width" onClick={(e)=>checkValidationOnSubmit(e)} disabled={!isOtpVerified && !token}>Submit</button>
                                  </div>   
                         
                           </div>
                   </div>
               </div>
           </div>
       </div>
   </div> 
      <OTPModal data={props.data} mobile={mobile}></OTPModal> 
   </Fragment>       
               
    );
  }


function OTPModal(props){
    // ote : NDeclare a new state variable, which we'll call "otpNo"  by using useState Hook
    // arg inside useState(null) i.e null is the default value of "otpNo"
    // useState is only work inside functional Component not in class component
    // similar to "this.state = {otpNo : null};"
    const [otpNo, setOtpNo] = useState(null);
    let otpMode  , otpSendTo, verificationType;
      otpMode = 'MOBILE';
      otpSendTo = props['mobile'];
     if(props['mobile']){
      verificationType='mobile';
    }
 
    const saveData = (e) =>{
      let val = e.target.value;
      if(val){
        setOtpNo(otpNo => val);
      }
    }
    var attemptleft;
     if(props.data.otpDetail!== undefined && props.data.otpDetail!== null && props.data.otpDetail!== '' && props.data.otpDetail!== {} )
     {
      attemptleft= <p className="pull-right margin-0 text-primary">Remaining attempt:{props.data.otpDetail.noOfAttempt}</p>
     }
    return(       
          <div className={`modal fade custom-modal-login in ${props.data.openOtpModal && props.data.openScheduleModal ? "showModal" : "hideModal"}`} id="modal-login" tabIndex="-1" role="dialog">
          <div className="modal-dialog clearfix" role="document">
              
                <div className="modal-body-left pull-left" style={{'backgroundImage': 'url(https://demo01.gethomey.io/wp-content/uploads/2018/10/01-3.jpg)' ,  'backgroundSize': 'cover', 'backgroundRepeat' : 'no-repeat' , 'backgroundPosition' : '50% 50%'}}>
                  <div className="login-register-title">
                      OTP Verification           
                  </div>
                </div>
              
              <div className="modal-body-right pull-right">
                  <div className="modal-content">
                      <div className="modal-header">
                          <button type="button" className="close" aria-label="Close" onClick={()=>props.data.toggleModal('otp')}><span aria-hidden="true">×</span></button>
                          <h4 className="modal-title">Verify OTP</h4>
                      </div>
                      <div className="modal-body">
                         <div className="homey_login_messages message"></div>
      
                              <div className="modal-login-form">
                                 <p className="text-center"><strong></strong></p>
                                      {attemptleft}
                                      <div className="form-group">
                                          <input type="text" name="otp" className="form-control email-input-2" placeholder="OTP"
                                          onInput={(e)=>saveData(e)}/>
  
                                      </div>                                   
                                      <p className="margin10" onClick={()=>props.data.getOtp(otpMode , otpSendTo,'resend')}>OTP not received ? <span className="text-info .text-underline .cursor">Resend OTP </span> </p>
                                      <button type="button" className="homey_login_button btn btn-primary btn-full-width" 
                                      onClick={()=>props.data.verifyOtp(otpMode , otpSendTo , otpNo ,verificationType)}>Verify</button>
                            
                              </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>     
      
      )
  }
 


const mapStateToProps = state => {
    return {
      loggedIn : state.signin['loggedIn'],
      loggedInUsername : state.signin['userData']['name'],
      authenticated : state.signup['authenticated'], 
      openScheduleModal : state.header['schedule-visit-modal'],
      openOtpModal : state.header['otp-modal'],
      isOtpVerified:state.signup['isOtpVerified'],
      otpDetail: state.signup['otpDetail'],
      resendOTP:state.signup['reSend'],
    }
  }
  
  const mapDispatchToProps = (dispatch) =>{
     return {
        getPropertiesDetailBySearch :(city,college,occupancy,sortKey,sortOrder,offset) => dispatch(getPropertiesDetailBySearch(city,college,occupancy,sortKey,sortOrder,offset)),
        getPropertyById:(id , userId) => dispatch(getPropertyById(id,userId)),
        toggleModal:(type)=> dispatch(toggleModal(type)),
        getScheduleVisit:(data)=>dispatch(getScheduleVisit(data)),
        getOtp : (modeType , sendTo,type) => dispatch(getOTP(modeType , sendTo,type)),
        verifyOtp : (modeType , userId , otpNo , verify) => dispatch(verifyOTP(modeType , userId , otpNo , verify)),
     }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Search);
