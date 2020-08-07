export const SIGN_IN = "/sh/web/login";
export const SIGN_UP = "/sh/web/sign-up";
export const GET_OTP = "/sh/web/send-otp"; // for register process 
//?modeType=MOBILE&sendTo=919873368030";
export const CHECK_LINK_GET_OTP = "/sh/web/validate-link-account" // for linking process
//?modeType=MOBILE&userId=919873368030&userType=PARENT
export const VERIFY_OTP = "/sh/web/validate-otp";
export const GET_USER_DATA = "/user/me";
export const UPDATE_USER_TYPE = "/update/user-type";
export const GET_TERMS_AND_CONDITIONS = "/sh/web/termsCondition";
export const GET_FAQ_INFO = "/sh/web/faq/get"
export const USER_DETAILS = "/sh/web/userDetails";
export const GET_TESTIMONIALS_INFO = "/sh/web/testimonial/getAll?page=0&size=4";
export const SEND_REFERRAL_CODE = "/sh/web/sendReferralCode";

//************** Property URLS ***************/
export const GET_TRENDING_PROPERTIES = "/student-housing/properties/all?page=0&size=7";
export const GET_PROPERTY_DETAILS_BY_PROPERTY_ID = "sh/web/"
// "/student-housing/properties/";

export const SCHEDULE_VISIT = "/sh/web/site-visit/request";
export const GET_PROPERTIES_BY_SEARCH = "/sh/web/search";
export const GET_CITIES_BY_SEARCH = "/sh/web/cities";
export const GET_COLLEGES_BY_CITY = "/sh/web/colleges";


//************** For google and facebook signin & signup *********
const API_URL = 'http://localhost:8080';
const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
export const GOOGLE_AUTH_URL = API_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;


//************Book Room API*************** */
export const GET_SHARING_TYPE = '/sh/web/occupancy/getAll';
export const GET_DURATION = '/sh/web/duration/getAll';
export const GET_PRICING = '/sh/web/price/occupancy';
export const BOOKING_ROOM='/sh/web/bookRoom';
export const GET_BANNER_IMAGE='/sh/web/banner/getAll?page=0&size=1';

