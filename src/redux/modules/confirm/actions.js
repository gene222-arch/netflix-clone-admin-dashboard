import ACTION_TYPES from './action.types';

const { 
    SHOW_CONFIRMATION_DIALOG, 
    HIDE_CONFIRMATION_DIALOG 
} = ACTION_TYPES;


export const showConfirmationDialog = (payload) => ({
    type: SHOW_CONFIRMATION_DIALOG,
    payload
});


export const hideConfirmationDialog = (payload) => ({
    type: HIDE_CONFIRMATION_DIALOG,
    payload
});


