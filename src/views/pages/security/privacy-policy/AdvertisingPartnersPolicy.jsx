import React from 'react'
import { Grid, Typography } from '@material-ui/core';

const AdvertisingPartnersPolicy = () => 
{
    return (
        <Grid container spacing={2}>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Typography variant="h6" color="initial">
                    Advertising Partners Privacy Policies
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    You may consult this list to find the Privacy Policy for each of the advertising partners of flicklify.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on flicklify, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Note that flicklify has no access to or control over these cookies that are used by third-party advertisers.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default AdvertisingPartnersPolicy
