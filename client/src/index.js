import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './utils/configureStore';
import setAuthToken from './utils/setAuthToken';
import App from './components/App';


if (localStorage.token) {
    setAuthToken(localStorage.token);
}


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
