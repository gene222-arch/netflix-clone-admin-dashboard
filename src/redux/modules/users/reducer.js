import ACTION_TYPES from './action.types';


const { INDEX } = ACTION_TYPES;

const initialState = {
    users: []
};


export default (state = initialState, { type, payload }) => 
{
    switch (type) 
    {
        case INDEX:
            return state.users;

        default:
            return state;
    }
}
