import { combineReducers } from 'redux';
import signinReducer from './signin/reducer';
import signupReducer from './signup/reducer';
import headerReducer from './header/reducer';
import propertyReducer from './property-data/reducer';
import {reducer as toastrReducer} from 'react-redux-toastr';
import { connectRouter } from 'connected-react-router'


const createRootReducer = (history) => combineReducers({
    signin : signinReducer,
    signup : signupReducer,
    header : headerReducer,
    property : propertyReducer,
    toastr: toastrReducer, // <- Mounted at toastr.
    router: connectRouter(history),// <- for routing.
})

export default createRootReducer
// export default combineReducers({
//     signin : signinReducer,
//     signup : signupReducer,
//     header : headerReducer,
//     toastr: toastrReducer, // <- Mounted at toastr.
// })