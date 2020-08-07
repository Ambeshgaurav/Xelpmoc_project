import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import TrendingProperties from '../trending-properties';
import {getPropertiesDetailBySearch , getCitiesBySearch , getCollegesByCity,getBannerImage} from '../../redux-container';
import './banner.css';
import {COLLEGE_DATA} from '../../redux-container/constants/constantSessionKey';
import Select from 'react-select';
import { history } from '../../redux-container/store';


class Banner extends Component {
  constructor(props){
    super(props);
    this.state={
      'citySearch' : null,
      'city_id' : null,
      'city_name' : null,
      'college_id' : null,
      'isDisabled' :true,
      'occ_type' : null,
      'clear_filter':false,
    }
  }

  componentDidMount() {
    this.props.getBannerImage()
  }

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
          sessionStorage.removeItem('COLLEGE_ID');
          sessionStorage.setItem('SELECTED_COLLEGE', JSON.stringify(data));
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
          sessionStorage.removeItem('OCCUPANCY_TYPE');
          sessionStorage.setItem('SELECTED_OCCUPANCY', JSON.stringify(data));
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

  render() {
  
    const cdata = this.props.cityDataBySearch;
    const coldata = JSON.parse(sessionStorage.getItem(COLLEGE_DATA));
    let {isDisabled} = this.state;

    let colObj={},colArray=[{'value': '','label':'Search College'}] 
    , cityObj={} , cityArray=[{'value': '','label':'Search City'}] ;

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
      {'value' : 'GIRLS','label':'Girls'},
      {'value' : 'BOYS','label':'Boys'},
      {'value' : 'BOTH','label':'Boys & Girls'}]

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
      if(this.props.bannerImage){
        var bannerImageUrl=this.props.bannerImage.banners[0].image_url;
        }

    return (
    <Fragment>
      <section className="top-banner-wrap ">
        <div className="banner-inner parallax" data-parallax-bg-image="https://demo01.gethomey.io/wp-content/uploads/2018/10/01-3.jpg" style={{'position': 'relative', 'background': 'transparent', 'overflow': 'hidden', 'zIndex': '1',}}>
            {/* <div className="parallax-inner" style={{position: 'absolute', backgroundImage: 'url(https://demo01.gethomey.io/wp-content/uploads/2018/10/01-3.jpg;)' , backgroundPosition : 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '1903px', height: '848.75px', transform: 'translate3d(0px, -74.4375px, 0px)', transition: 'transform 100ms ease 0s', zIndex: '-1'}}></div> */}

            <div className="parallax-inner" style={{position: 'absolute', backgroundImage: `url(${bannerImageUrl})`, backgroundPosition : 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '1903px', height: '848.75px', transform: 'translate3d(0px, -74.4375px, 0px)', transition: 'transform 100ms ease 0s', zIndex: '-1'}}></div>
        </div> 
        <div className="banner-caption ">
            <h2 className="banner-title">Exciting, comfortable and secure</h2>
            <p className="banner-subtitle">world-class spaces for your student days</p> 
      <div className="search-wrap search-banner search-banner-desktop hidden-xs" style={{textAlign: 'left'}}>
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
                      defaultValue={defaultCollege}
                    />
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
            </div>             	
            {/* <div className="search-button">
              <button className="btn label-featured" onClick={this.clearFilter}>Clear</button> 
            </div> */}
      </div> 
        </div> 
      </section>
    <TrendingProperties/>
  </Fragment>);
  }
}

const mapStateToProps = state => {
  return {
    loggedIn : state.signin['loggedIn'],
    loggedInUsername : state.signin['userData']['name'],
    authenticated : state.signup['authenticated'],
    loading : state.signup['loading'], 
    cityDataBySearch : state['property']['cityDataBySearch'],
    collegeDataByCity : state['property']['collegeDataByCity'],
    bannerImage:state['header']['bannerImage'],
  }
}

const mapDispatchToProps = (dispatch) =>{
   return {
      getPropertiesDetailBySearch :(city,college,occupancy,sortKey,sortOrder,offset,isTrending) => dispatch(getPropertiesDetailBySearch(city,college,occupancy,sortKey,sortOrder,offset,isTrending)),
      getCitiesBySearch:(name) => dispatch(getCitiesBySearch(name)),
      getCollegesByCity:(cityId) => dispatch(getCollegesByCity(cityId)),
      getBannerImage:()=>dispatch(getBannerImage()),
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Banner);
