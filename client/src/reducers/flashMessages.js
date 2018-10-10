import * as actionTypes from '../actions/types';
import shortid from 'shortid';
import _ from 'lodash';

const initialState = [];

export default (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_FLASH_MESSAGE:
            return [
                ...state,
                {
                    id: shortid.generate(),
                    type: action.payload.type,   
                    text: action.payload.text   
                }
            ];
        case actionTypes.REMOVE_FLASH_MESSAGE:
            const index = _.findIndex(state, {id: action.id});
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    ...state.slice(index+1)
                ];
            }
            return state;
        default:
            return state;
    }
}