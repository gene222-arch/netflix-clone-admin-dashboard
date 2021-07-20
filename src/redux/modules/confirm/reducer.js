import ACTION_TYPES from './action.types';

const { SHOW_CONFIRMATION_DIALOG, HIDE_CONFIRMATION_DIALOG } = ACTION_TYPES;

const initialState = {
    isOpen: false,
    mainHeader: '',
    subHeader: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    shouldNavigate: true,
    confirmCallback: () => {},
    cancelCallback: () => {}
};

export default (state = initialState, { type, payload }) =>
{
    const {
        subHeader,
        confirmText,
        cancelText,
        shouldNavigate,
        confirmCallback,
        cancelCallback,
    } = state;

    switch (type) 
    {
        case SHOW_CONFIRMATION_DIALOG:
            return {
                isOpen: true,
                mainHeader: payload.mainHeader,
                subHeader: payload.subHeader ?? subHeader,
                confirmText: payload.confirmText ?? confirmText,
                cancelText: payload.cancelText ?? cancelText,
                shouldNavigate,
                confirmCallback: payload.confirmCallback ?? confirmCallback,
                cancelCallback: payload.cancelCallback ?? cancelCallback
            };

        case HIDE_CONFIRMATION_DIALOG:
            return {
                ...initialState,
                shouldNavigate: false
            };

        default:
            return state;
    }
}
