import ACTION_TYPES from './action.types';
import { timeStamp } from './../../../utils/date';


const { CREATE, MARK_AS_RESOLVED, DESTROY } = ACTION_TYPES;

const initialState = [];


export default (state = initialState, { type, payload }) => 
{
    switch (type) 
    {
        case CREATE:
            return [
                ...state,
                {
                    id: timeStamp(),
                    description: payload.description,
                    resolved: false
                }
            ];  
    
        case MARK_AS_RESOLVED:

            const newState = state.map(bug => 
                bug.id !== payload.id
                    ? bug
                    : {
                        ...bug,
                        resolved: !bug.resolved
                    }
            );

            return newState;

        case DESTROY:
            return state.filter(bug => bug.id !== payload.id);
    
        default:
            return state;
    }
}
