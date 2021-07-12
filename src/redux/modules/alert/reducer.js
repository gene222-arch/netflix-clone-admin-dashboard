import ACTION_TYPES from './action.types';

const { SHOW, HIDE } = ACTION_TYPES;

const initialState = {
    isOpen: false,
    status: '',
    message: '',
};

export default (state = initialState, { type, payload }) =>
{
    switch (type) 
    {
        case SHOW:
            return {
                isOpen: true,
                status: payload.status,
                message: payload.message
            };

        case HIDE:
            return {
                isOpen: false,
                status: '',
                message: ''
            };

        default:
            return state;
    }
}
