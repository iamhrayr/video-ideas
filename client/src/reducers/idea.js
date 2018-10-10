import * as actionTypes from '../actions/types';

const initialState = {
    fetched: false,
    fetching: false,
    data: ''
}

export default function(state = initialState, action){
    switch (action.type) {
        case actionTypes.GET_SINGLE_IDEA_REQUEST:
            return {
                ...state,
                fetching: true
            }
        case actionTypes.GET_SINGLE_IDEA_SUCCESS:
            return {
                fetching: false,
                fetched: true,
                data: action.payload
            }
        case actionTypes.GET_SINGLE_IDEA_ERROR:
            return {
                fetching: false,
                fetched: false,
                data: ''
            }
        case actionTypes.POST_IDEA_COMMENT_SUCCESS:
            console.log(action.payload)
            return {
                // TODO: I'm not sure it's good solution
                ...state,
                data: {
                    ...state.data,
                    comments: [
                        ...state.data.comments,
                        action.payload
                    ]
                }
            }
        default: 
            return state;
    }
}