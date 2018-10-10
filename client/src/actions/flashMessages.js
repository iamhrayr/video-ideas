import * as actionTypes from './types';

export const addFlashMessage = (msg) => {
    return {
        type: actionTypes.ADD_FLASH_MESSAGE,
        payload: msg
    }
}

export const removeFlashMessage = (id) => {
    return {
        type: actionTypes.REMOVE_FLASH_MESSAGE,
        id
    }
}