import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router'

// css 
// import '@fortawesome/fontawesome-free/css/all.min.css'; 
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './assets/css/main.css'; 
import './assets/css/styling-options.css'; 
import './index.css';
import './assets/css/style.css'; 
import './assets/css/js-composer.css'

import {Provider} from 'react-redux'
import store , { history } from './redux-container/store';
import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Provider store= {store}> <ConnectedRouter history={history}><App/></ConnectedRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
