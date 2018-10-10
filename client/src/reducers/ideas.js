import * as actionTypes from '../actions/types';

const initialState = {
    fetched: false,
    fetching: false,
    data: []
}

export default function(state = initialState, action){
    switch (action.type) {
        case actionTypes.GET_PUBLIC_IDEAS_REQUEST:
            return {
                ...state,
                fetching: true
            }
        case actionTypes.GET_PUBLIC_IDEAS_SUCCESS:
            return {
                fetching: false,
                fetched: true,
                data: action.payload
            }
        case actionTypes.GET_PUBLIC_IDEAS_ERROR:
            return {
                fetching: false,
                fetched: false,
                data: []
            }
        default: 
            return state;
    }
}