import ACTION_TYPES from './action.types';

const { SHOW, HIDE } = ACTION_TYPES;


export const showAlert = (payload) => ({
    type: SHOW,
    payload
});


export const hideAlert = (payload) => ({
    type: HIDE,
    payload
});
