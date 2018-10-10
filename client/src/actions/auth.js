import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {history} from '../components/App';
import * as actionTypes from './types';
import {addFlashMessage} from '../actions/flashMessages';


export const login = (data) => {
    return dispatch => {
        dispatch(request())
        return axios.post('api/auth/login', data)
            .then(res => {
                dispatch(success(res.data))
                const token = res.data.token;
                localStorage.setItem('token', token);
                setAuthToken(token);
                history.push('/profile');
                return Promise.resolve(res);
            }).catch(err => {
                dispatch(error(err.response.data));
                return Promise.reject(err.response.data);
            })
    }

    function request(){
        return {
            type: actionTypes.LOGIN_REQUEST
        }
    }
    function success(user){
        return {
            type: actionTypes.LOGIN_SUCCESS,
            payload: user
        }
    }
    function error(err){
        return {
            type: actionTypes.LOGIN_ERROR,
            payload: err
        }
    }
}

export const signup = (data) => {
    return dispatch => {
        return axios.post('/api/auth/register', data)
            .then(res => {
                dispatch(success(res.data));
                history.push('/login');
                dispatch(addFlashMessage({
                    type: 'success',
                    text: res.data.message
                }));
                return Promise.resolve(res.data);
            });
    }

    function success(res){
        return {
            type: actionTypes.SIGNUP_SUCCESS, 
            payload: res
        }
    }
}

export const logout = () => {
    return dispatch => {
        dispatch({type: actionTypes.LOGOUT});
        setAuthToken(null);
        localStorage.removeItem('token');
        history.push('/login')
    }
}


export const setCurrentUser = (token) => {
    return dispatch => {
        axios.get('/api/current_user')
            .then(res => {
                dispatch({type: actionTypes.SET_CURRENT_USER, payload: res.data});
            })
            .catch(err => {
                dispatch({type: actionTypes.LOGOUT});
            })
    }
}

export const editProfile = (data) => {
    return dispatch => {
        dispatch(request());
        axios.patch(`/api/current_user`, data)
            .then(res => {
                dispatch(success(res.data));
                dispatch(addFlashMessage({
                    status: 'success',
                    text: res.data.message
                }))
            })
            .catch(err => {
                dispatch(error(err.response.data));
            })
    }
    
    function request(){
        return {
            type: actionTypes.EDIT_PROFILE_REQUEST
        }
    }
    function success(res){
        return {
            type: actionTypes.EDIT_PROFILE_SUCCESS,
            payload: res
        }
    }
    function error(err){
        return {
            type: actionTypes.EDIT_PROFILE_ERROR,
            payload: err
        }
    }


}