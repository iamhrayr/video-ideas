import axios from 'axios';
import {history} from '../components/App';
import * as actionTypes from './types';


export const getPublicIdeas = () => {
    return dispatch => {
        dispatch(request());
        return axios.get('/api/ideas')
            .then(res => {
                dispatch(success(res.data));
                return Promise.resolve(res.data)
            })
            .catch(err => {
                dispatch(success(err.response.data));
                return Promise.reject(err.response.data)
            })
    }

    function success(ideas){
        return {
            type: actionTypes.GET_PUBLIC_IDEAS_SUCCESS,
            payload: ideas
        }
    }
    function error(err){
        return {
            type: actionTypes.GET_PUBLIC_IDEAS_ERROR,
            payload: err
        }
    }
    function request(ideas){
        return {
            type: actionTypes.GET_PUBLIC_IDEAS_REQUEST
        }
    }
}


export const getPersonalIdeas = () => {
    return dispatch => {
        dispatch(request());
        return axios.get('/api/ideas/personal')
            .then(res => {
                dispatch(success(res.data));
                return Promise.resolve(res.data);
            })
            .catch(err => {
                dispatch(error(err));
                return Promise.reject(err.response.data);
            })

        function request(){
            return {
                type: actionTypes.GET_PERSONAL_IDEAS_REQUEST
            }
        }
        function success(ideas){
            return {
                type: actionTypes.GET_PERSONAL_IDEAS_SUCCESS,
                payload: ideas
            }
        }
        function error(err){
            return {
                type: actionTypes.GET_PERSONAL_IDEAS_ERROR,
                payload: err
            }
        }
    }
}


export const addIdea = (idea) => {
    return dispatch => {
        dispatch(request());
        axios.post('api/ideas', idea)
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(error(err.response.data))
            });

        function request(){
            return {
                type: actionTypes.ADD_IDEA_REQUEST
            }
        }
        function success(idea){
            return {
                type: actionTypes.ADD_IDEA_SUCCESS,
                payload: idea
            }
        }
        function error(err){
            return {
                type: actionTypes.ADD_IDEA_ERROR,
                payload: err
            }
        }
    }
}

export const getSingleIdea = (id) => {
    return dispatch => {
        dispatch(request());
        return axios.get(`/api/ideas/${id}`)
            .then(res => {
                dispatch(success(res.data));
                return Promise.resolve(res.data);
            })
            .catch(err => {
                dispatch(error(err.response.data));
                return Promise.reject(err.response.data);
            })
    }

    function request(){
        return {
            type: actionTypes.GET_SINGLE_IDEA_REQUEST
        }
    }
    function success(idea){
        return {
            type: actionTypes.GET_SINGLE_IDEA_SUCCESS,
            payload: idea
        }
    }
    function error(err){
        return {
            type: actionTypes.GET_SINGLE_IDEA_ERROR,
            payload: err
        }
    }
}

export const editIdea = (idea, id) => {
    return dispatch => {
        dispatch(request());
        axios.patch(`/api/ideas/${id}`, idea)
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(error(err.response.data));
            })
    }

    function request(){
        return {
            type: actionTypes.EDIT_IDEA_REQUEST
        }
    }
    function success(idea){
        return {
            type: actionTypes.EDIT_IDEA_SUCCESS,
            payload: idea
        }
    }
    function error(err){
        return {
            type: actionTypes.EDIT_IDEA_ERROR,
            payload: err
        }
    }
}


export const postIdeaComment = (data, id) => {
    return dispatch => {
        dispatch(request());
        axios.post(`/api/ideas/${id}/comments`, data)
            .then(res => {
                dispatch(success(res.data));
            })
            .catch(err => {
                dispatch(error(err.response.data));
            })
    }

    function success(res){
        return {
            type: actionTypes.POST_IDEA_COMMENT_SUCCESS,
            payload: res
        }
    }
    function request(){
        return {
            type: actionTypes.POST_IDEA_COMMENT_REQUEST
        }
    }
    function error(err){
        return {
            type: actionTypes.POST_IDEA_COMMENT_ERROR,
            payload: err
        }
    }
}