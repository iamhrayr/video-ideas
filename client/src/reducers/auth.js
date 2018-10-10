import * as actionTypes from '../actions/types';

const initialState = {
    user: null,
    isAuthenticated: false
}

export default function(state = initialState, action){
    switch (action.type) {
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                isAuthenticated: true,
                user: action.payload
            }
        case actionTypes.LOGIN_ERROR:
            return {
                isAuthenticated: false,
                user: null
            }
        case actionTypes.LOGOUT:
            return {
                isAuthenticated: false,
                user: null
            }
        default: 
            return state;
    }
}