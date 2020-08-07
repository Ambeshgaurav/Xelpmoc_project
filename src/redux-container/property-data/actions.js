import {toastr} from 'react-redux-toastr'
import {FETCH_USER_DETAILS , FETCH_USER_FAILURE , FETCH_USER_SUCCESS , FETCH_PROPERTY_OBJ , 
  GET_CITY_DATA_BY_SEARCH , GET_COLLEGE_DATA_BY_CITY,SHARING_TYPE,DURATION_LIST,BOOKING_PRICE} from './types'
import {adminApiCall,webApiCall} from '../ajax' 
import {GET_TRENDING_PROPERTIES ,GET_PROPERTY_DETAILS_BY_PROPERTY_ID ,
  GET_PROPERTIES_BY_SEARCH , SCHEDULE_VISIT , 
  GET_CITIES_BY_SEARCH , GET_COLLEGES_BY_CITY,GET_SHARING_TYPE,GET_DURATION,GET_PRICING,BOOKING_ROOM} from '../constants/constantUrl';
import {toggleModal} from '../../redux-container';
import { history } from './../store';
import {PROPERTY_OBJ , PROPERTY_ARRAY , PROPERTY_DATA_BY_SEARCH , COLLEGE_DATA , ACCESS_TOKEN, TRENDING_PROPERTY} from '../constants/constantSessionKey';

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

const fetchPropertyObj = (data)=> {
  return {
    type : FETCH_PROPERTY_OBJ,
    payload : data,
  }
}

const fetchUserError = (data)=> {
  return {
    type : FETCH_USER_FAILURE,
    payload : data,
  }
}

const getCityDataBySearch = (data)=> {
  return {
    type : GET_CITY_DATA_BY_SEARCH,
    payload : data,
  }
}

const getCollegeDataByCity = (data)=> {
  return {
    type : GET_COLLEGE_DATA_BY_CITY,
    payload : data,
  }
}

export const getTopTrendingProperty = () => {
  console.log("login app starts **** ");
    return async (dispatch) =>{
   // dispatch(fetchUserDetails());
     await adminApiCall.get(GET_TRENDING_PROPERTIES)
          .then(response => {
            console.log(response);
            if(response){
              if(response['status'] === 200){ 
                console.log("*****************");
                console.log(response); 
                let propertyData = response.data['result']['properties'];
                sessionStorage.setItem(PROPERTY_ARRAY , JSON.stringify(propertyData))
                dispatch(fetchUserSuccess(propertyData)); 
              }
            }
          })
          .catch(error => {
            if(error.response){
              if(error.response.data.status === 400){  
                toastr.error(error.response.data['message']);  
                dispatch(fetchUserError("error")); 
              }
            } 
          })
    }
}


export const getPropertyById= (id,userId) => {
  console.log("login app starts **** ");
  let url="";
  if(userId){
    url= GET_PROPERTY_DETAILS_BY_PROPERTY_ID+id+'/getProperty?userId='+userId;
  }else{
    url= GET_PROPERTY_DETAILS_BY_PROPERTY_ID+id+'/getProperty?userId=';
  }
    return async (dispatch) =>{
   // dispatch(fetchUserDetails());
     await webApiCall.get(url)
          .then(response => {
            console.log(response);
            if(response){
              if(response['status'] === 200){ 
                let propertyData = response['data']['result'];
                sessionStorage.setItem(PROPERTY_OBJ , JSON.stringify(response['data']['result']))
                //console.log(propertyData);
                //dispatch(fetchPropertyObj(propertyData)); 
                history.push('/property');
              }
            }
          })
          .catch(error => {
            if(error.response){
              if(error.response.data.status === 400){  
                toastr.error(error.response.data['message']);  
                //dispatch(fetchUserError("error")); 
              }else{
                //dispatch(fetchUserError("error")); 
              }
            } 
          })
    }
}


export const getScheduleVisit= (data , type) => {
  return async (dispatch) =>{
      await webApiCall.post(SCHEDULE_VISIT,data)
           .then(response => {
             console.log(response);
             if(response){
               if(response['status'] === 200){ 
                toastr.success(response.data['message']); 
                if(type !== 'PD'){
                  dispatch(toggleModal('schedulevisit'));
                }
               }
             }
           })
           .catch(error => {
             if(error.response){
               if(error.response.data.status === 400){  
                 toastr.error(error.response.data['message']);  
                 dispatch(fetchUserError("error")); 
               }else{
                 toastr.error(error.response.data['message']); 
                 dispatch(fetchUserError("error")); 
               }
             } 
           })
     }
}


export const getPropertiesDetailBySearch = (cityId,collegeId,occType,sortKey,sortOrder,offset,isTrending) => {
    let url = GET_PROPERTIES_BY_SEARCH+"?size=6&offset="+offset;
    let token = sessionStorage.getItem(ACCESS_TOKEN);

    console.log("city id ="+cityId);
    if(cityId){
      sessionStorage.setItem('CITY_ID',cityId);
    }
    // else{
    //   sessionStorage.removeItem('CITY_ID');
    //   sessionStorage.removeItem('SELECTED_CITY');
    // }
    if(collegeId){
      sessionStorage.setItem('COLLEGE_ID',collegeId);
    }
    // else{
    //   sessionStorage.removeItem('COLLEGE_ID');
    //   sessionStorage.removeItem('SELECTED_COLLEGE');
    // }
    if(occType){
      sessionStorage.setItem('OCCUPANCY_TYPE',occType);
    }
    // else{
    //   sessionStorage.removeItem('OCCUPANCY_TYPE');
    //   sessionStorage.removeItem('SELECTED_OCCUPANCY');
    // }
   
    if(!isTrending){
      if(!sortKey){
        if(cityId && collegeId && occType){
          url = url+"&cityIds="+cityId+"&collegeId="+collegeId+"&occupationType="+occType;
        }
        else if(cityId && collegeId){
          url = url+"&cityIds="+cityId+"&collegeId="+collegeId;
        }
        else if(cityId && occType){
          url = url+"&cityIds="+cityId+"&occupationType="+occType;
        }
        else if(cityId){
          url = url+"&cityIds="+cityId;
        }
        else if(occType){
          url = url+"&occupationType="+occType;
        }
      }else if(sortKey){
        if(cityId && collegeId && occType){
          url = url+"&cityIds="+cityId+"&collegeId="+collegeId+"&occupationType="+occType+"&sortKey="+sortKey+"&sortOrder="+sortOrder;
        }
        else if(cityId && collegeId){
          url = url+"&cityIds="+cityId+"&collegeId="+collegeId+"&sortKey="+sortKey+"&sortOrder="+sortOrder;
        }
        else if(cityId && occType){
          url = url+"&cityIds="+cityId+"&occupationType="+occType+"&sortKey="+sortKey+"&sortOrder="+sortOrder;
        }
        else if(cityId){
          url = url+"&cityIds="+cityId+"&sortKey="+sortKey+"&sortOrder="+sortOrder;
        }
        else if(occType){
          url = url+"&occupationType="+occType+"&sortKey="+sortKey+"&sortOrder="+sortOrder;
        }else {
          url = url+"&sortKey="+sortKey+"&sortOrder="+sortOrder;
        }
      } 
    }else{
      url = url+"&isTrending="+isTrending;
    }

   return async (dispatch) =>{
        await webApiCall.get(url)
        .then(response => {
          console.log(response);
          if(response){
            if(response['status'] === 200){ 
               let propertyData = response.data['result'];
               if(!isTrending){
                sessionStorage.setItem(PROPERTY_DATA_BY_SEARCH , JSON.stringify(propertyData));
                 history.push("/search");
               }else if(isTrending && !token){
                sessionStorage.setItem(TRENDING_PROPERTY, JSON.stringify(propertyData));
                dispatch(fetchUserSuccess(propertyData));
                // history.push("/login");
               }else if(isTrending && token){
                sessionStorage.setItem(TRENDING_PROPERTY , JSON.stringify(propertyData));
                dispatch(fetchUserSuccess(propertyData));
                 //history.push("/home");
              }
            }
          }
        })
        .catch(error => {
          if(error.response){
            if(error.response.data.status === 400){  
              toastr.error(error.response.data['message']);  
              dispatch(fetchUserError("error")); 
            }else{
              toastr.error(error.response.data['message']); 
              dispatch(fetchUserError("error")); 
            }
          } 
        })
   } 
}

export const getCitiesBySearch = (name) => {
    return async (dispatch) =>{
      if(name.length > 2){
        let url = GET_CITIES_BY_SEARCH+"?name="+name;
        await webApiCall.get(url)
            .then(response => {
              console.log(response);
              if(response){
                if(response['status'] === 200){ 
                  let cityData = response['data']['result']; 
                  dispatch(getCityDataBySearch(cityData));
                }
              }
            })
            .catch(error => {
              if(error.response){
                if(error.response.data.status === 400){  
                  toastr.error(error.response.data['message']);  
                }else{
                  toastr.error(error.response.data['message']); 
                }
              } 
            })
      }else{
        let cityData = [];
        dispatch(getCityDataBySearch(cityData));
      }
    }  
}

export const getCollegesByCity = (cityId) => {
  let url = GET_COLLEGES_BY_CITY+"?cityId="+cityId;
  return async (dispatch) =>{
      await webApiCall.get(url)
           .then(response => {
             console.log(response);
             if(response){
               if(response['status'] === 200){ 
                 let collegeData = response['data']['result']; 
                 sessionStorage.setItem(COLLEGE_DATA , JSON.stringify(collegeData));
                 dispatch(getCollegeDataByCity(collegeData));
               }
             }
           })
           .catch(error => {
             if(error.response){
               if(error.response.data.status === 400){  
                 toastr.error(error.response.data['message']);  
               }else{
                 toastr.error(error.response.data['message']); 
               }
             } 
           })
     }
}
export const getSharingType = () => {
  let url = GET_SHARING_TYPE;
  return async (dispatch) =>{
      await webApiCall.get(url)
           .then(response => {
             console.log(response);
             if(response){
               if(response['status'] === 200){ 
                 let data = response['data']['result']; 
                 dispatch({type:SHARING_TYPE,payload:data});
               }
             }
           })
           .catch(error => {
             if(error.response){
               if(error.response.data.status === 400){  
                 toastr.error(error.response.data['message']);  
               }else{
                 toastr.error(error.response.data['message']); 
               }
             } 
           })
     }
    }

export const getDurationList = () => {
  let url = GET_DURATION;
  return async (dispatch) =>{
      await webApiCall.get(url)
           .then(response => {
             console.log(response);
             if(response){
               if(response['status'] === 200){ 
                let data = response['data']['result']; 
                 dispatch({type:DURATION_LIST,payload:data});
               }
             }
           })
           .catch(error => {
             if(error.response){
               if(error.response.data.status === 400){  
                 toastr.error(error.response.data['message']);  
               }else{
                 toastr.error(error.response.data['message']); 
               }
             } 
           })
     }
}

export const getPrice = (occId,durId,propId) => {
  let url = GET_PRICING;
  return async (dispatch) =>{
      await webApiCall.get(url+"?occupancyId="+occId+"&propertyId="+propId+"&durationId="+durId)
           .then(response => {
             console.log(response);
             if(response){
               if(response['status'] === 200){ 
                let data = response['data']['result']['booking_amount']; 
                 dispatch({type:BOOKING_PRICE,payload:data});
               }
             }
           })
           .catch(error => {
             if(error.response){
               if(error.response.data.status === 400){  
                 toastr.error(error.response.data['message']);  
               }else{
                 toastr.error(error.response.data['message']); 
               }
             } 
           })
     }
}

export const bookRoom = (data) => {
  return async (dispatch) =>{
      await webApiCall.post(BOOKING_ROOM , data)
           .then(response => {
             console.log(response);
             if(response){
               if(response['status'] === 200){ 
                toastr.success(response.data['message']); 
                dispatch({type:BOOKING_PRICE,payload:''});
                dispatch(toggleModal('bookingroom'));
               }
             }
           })
           .catch(error => {
             if(error.response){
               if(error.response.data.status === 400){  
                 toastr.error(error.response.data['message']);  
               }else{
                 toastr.error(error.response.data['message']); 
               }
             } 
           })
     }
}


