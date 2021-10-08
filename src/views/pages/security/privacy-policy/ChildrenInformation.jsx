import React from 'react'
import { Grid, Typography } from '@material-ui/core';

const ChildrenInformation = () => 
{
    return (
        <Grid container spacing={2}>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Typography variant="h6" color="initial">
                    Children's Information
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    Flicklify does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default ChildrenInformation
