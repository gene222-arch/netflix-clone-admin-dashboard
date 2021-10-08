import React from 'react'
import { Grid, Typography } from '@material-ui/core';

const GDPRDataProtectionRights = () => 
{
    return (
        <Grid container spacing={2}>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Typography variant="h6" color="initial">
                    <strong>GDPR Data Protection Rights</strong>
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    The right to erasure – You have the right to request that we erase your personal data, under certain conditions.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.
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

export default GDPRDataProtectionRights
