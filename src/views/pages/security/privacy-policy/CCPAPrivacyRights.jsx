import React from 'react'
import { Grid, Typography } from '@material-ui/core';

const CCPAPrivacyRights = () => 
{
    return (
        <Grid container spacing={2}>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Typography variant="h6" color="initial">
                    <strong>CCPA Privacy Rights (Do Not Sell My Personal Information)</strong>
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    Under the CCPA, among other rights, California consumers have the right to:
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    Request that a business delete any personal data about the consumer that a business has collected.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    Request that a business that sells a consumer's personal data, not sell the consumer's personal data.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default CCPAPrivacyRights
