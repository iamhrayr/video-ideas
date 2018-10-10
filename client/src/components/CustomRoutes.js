import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

export const GuestRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !localStorage.token 
            ? <Component {...props}/>
            : <Redirect to={{pathname: '/profile'}} />
    )}/>
);
GuestRoute.propTypes = {
    component: PropTypes.func.isRequired
}

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !!localStorage.token 
            ? <Component {...props}/>
            : <Redirect to={{pathname: '/login'}} />
    )}/>
);
ProtectedRoute.propTypes = {
    component: PropTypes.func.isRequired
}