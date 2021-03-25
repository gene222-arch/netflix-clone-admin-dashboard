import ACTION_TYPES from './action.types';

const { 
    INDEX, 
    INDEX_SUCCESS, 
    INDEX_FAILED, 

    CREATE, 
    CREATE_POST_SUCCESS, 
    CREATE_POST_FAILED, 
    
    DESTROY,
    DESTROY_POST_SUCCESS, 
    DESTROY_POST_FAILED, 
} = ACTION_TYPES;

const initialState = {
    errors: [],
    isLoading: false,
    posts: []
}


export default (state = initialState, { type, payload }) => 
{
    switch (type) 
    {
        case INDEX:
            return {
                ...state,
                isLoading: true
            };

        case INDEX_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                posts: payload.data
            };

        case INDEX_FAILED: 
            return {
                ...state,
                isLoading: false,
                errors: payload.messages
            };

        case CREATE: 
            return {
                ...state,
                isLoading: true,
            };

        case CREATE_POST_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                posts: [...state.posts, payload.post]
            };

        case CREATE_POST_FAILED: 
            return {
                ...state,
                isLoading: false,
                errors: payload.messages
            };

        case DESTROY:
            return {
                ...state,
                isLoading: true
            };

        case DESTROY_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                posts: state.posts.filter(post => post.id !== payload.id)
            };

        case DESTROY_POST_FAILED:
            return {
                ...state,
                isLoading: false,
                errors: payload.messages
            };
        default:
            return state;
    }
}
