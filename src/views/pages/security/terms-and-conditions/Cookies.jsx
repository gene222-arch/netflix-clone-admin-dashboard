import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'


const Cookies = () => 
{
    return (
        <Grid container spacing={1} direction='column' key='cookies'>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Typography variant="h6" color="initial"><strong>Cookies</strong></Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    We employ the use of cookies. By accessing flicklify, you agreed to use cookies in agreement with the Flicklify Organization's Privacy Policy.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Cookies
