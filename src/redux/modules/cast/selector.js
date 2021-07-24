import { createSelector } from 'reselect';

const getCast = state => state.cast;
const getCastList = state => state.cast.casts;
const getErrorMessages = state => state.cast.error;

export const selectCast = createSelector(getCast, cast => cast);  

export const selectCastNames = createSelector(getCastList, castList => {
    return castList.map(({ id, birth_name }) => ({ value: id, label: birth_name }))
 });  

export const selectCastErrorMessages = createSelector(getErrorMessages, error => error);  

export const selectCastHasErrorMessages = createSelector(getErrorMessages, error => 
{
    let hasErrorMessages = {};

    const errors = Object
        .entries(error)
        .map(([ key, value ]) => ({ 
            [key]: Boolean(value) 
        }));

    return errors.reduce((obj, item) => ({ ...obj, ...item }), hasErrorMessages);
});  