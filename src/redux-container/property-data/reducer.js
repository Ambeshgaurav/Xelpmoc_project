import {FETCH_USER_DETAILS , FETCH_USER_SUCCESS ,FETCH_USER_FAILURE ,FETCH_PROPERTY_OBJ ,GET_CITY_DATA_BY_SEARCH
,GET_COLLEGE_DATA_BY_CITY,SHARING_TYPE,DURATION_LIST,BOOKING_PRICE} from './types'

const initialPropertyState = {
    loading:false,
    propertyData : [],
    propertyObj : {},
    cityDataBySearch : [],
    collegeDataByCity : [],
    sharingList : [],
    durationList : [],
    bookingPrice : "",

}

const propertyReducer = (state = initialPropertyState , action) =>{
    switch(action.type){
        case FETCH_USER_DETAILS : return {
          ...state , 
          loading : true,
          propertyData : [],
          propertyObj : {}
        } 
        case FETCH_USER_SUCCESS : return {
            loading  : false ,    
            propertyData : action.payload,
            propertyObj : {}

        }
        case FETCH_USER_FAILURE : return {
            loading : false,
            propertyData : [],
            propertyObj : {}
        }
        case FETCH_PROPERTY_OBJ : return {
            loading : false,
            propertyObj : action.payload,
            propertyData : [],
            
        }
        case GET_CITY_DATA_BY_SEARCH : return{
            loading : false,
            cityDataBySearch : action.payload
        }
        case GET_COLLEGE_DATA_BY_CITY : return{
            loading : false,
            collegeDataByCity : action.payload
        }
        case SHARING_TYPE : return{
            ...state , 
            loading : false,
            sharingList : action.payload
        }
        case DURATION_LIST:return{
            ...state , 
            loading : false,
            durationList : action.payload
        }
        case BOOKING_PRICE : return {
            ...state , 
            loading : false,
            bookingPrice : action.payload
        }
        default : return state;
    }  
}

export default propertyReducer;