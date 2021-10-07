import ACTION_TYPES from './action.types';

const { SHOW, HIDE } = ACTION_TYPES;

const initialState = {
    isOpen: false,
    status: '',
    message: '',
    autoHideDuration: 3000,
    vertical: 'bottom',
    horizontal: 'right'
};

export default (state = initialState, { type, payload }) =>
{
    const {
        autoHideDuration,
        vertical,
        horizontal
    } = state;

    switch (type) 
    {
        case SHOW:
            return {
                isOpen: true,
                status: payload.status,
                message: payload.message,
                autoHideDuration: payload.autoHideDuration ?? autoHideDuration,
                vertical: payload.vertical ?? vertical,
                horizontal: payload.horizontal ?? horizontal
            };

        case HIDE:
            return initialState;

        default:
            return state;
    }
}
