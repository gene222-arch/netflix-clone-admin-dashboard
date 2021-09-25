import { createSelector } from 'reselect';

const getActivityLog = state => state.activityLog;
const getErrorMessages = state => state.activityLog.error;

export const selectActivityLog = createSelector(getActivityLog, activityLog => activityLog);  

export const selectActivityLogErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectActivityLogHasErrorMessages = createSelector(getErrorMessages, error => 
{
    let hasErrorMessages = {};

    for (const key in error) {
        hasErrorMessages = {
            ...hasErrorMessages,
            [key]: Boolean(error[key])
        };
    }

    return hasErrorMessages;
});  