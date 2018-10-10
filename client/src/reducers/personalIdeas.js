import * as actionTypes from '../actions/types';

const initialState = {
    fetched: false,
    fetching: false,
    data: []
}

export default function(state = initialState, action){
    switch (action.type) {
        case actionTypes.GET_PERSONAL_IDEAS_REQUEST:
            return {
                ...state,
                fetching: true
            }
        case actionTypes.GET_PERSONAL_IDEAS_SUCCESS:
            return {
                fetching: false,
                fetched: true,
                data: action.payload
            }
        case actionTypes.GET_PERSONAL_IDEAS_ERROR:
            return {
                fetching: false,
                fetched: false,
                data: []
            }
        case actionTypes.ADD_IDEA_SUCCESS:
            return {
                ...state
            }
        default: 
            return state;
    }
}