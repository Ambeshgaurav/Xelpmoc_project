import axios from 'axios';
import {ACCESS_TOKEN} from './constants/constantSessionKey';


export const webApiCall = axios.create({
    baseURL: 'http://116.203.131.171:8081/' ,
})

// Add a request interceptor
webApiCall.interceptors.request.use(function (config) {
    if(sessionStorage.getItem(ACCESS_TOKEN)) {
        config.headers.Authorization = 'Bearer ' + sessionStorage.getItem(ACCESS_TOKEN);
     }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


export const adminApiCall = axios.create({
    baseURL: 'http://116.203.131.171:8080/' ,
})

// Add a request interceptor
adminApiCall.interceptors.request.use(function (config) {
    if(sessionStorage.getItem(ACCESS_TOKEN)) {
        config.headers.Authorization = 'Bearer ' + sessionStorage.getItem(ACCESS_TOKEN);
     }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

//export default instance;