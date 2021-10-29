import { createSelector } from 'reselect';

const getPaymongoWebhook = state => state.paymongoWebhook;

export const selectPaymongoWebhook = createSelector(getPaymongoWebhook, paymongoWebhook => paymongoWebhook);  
