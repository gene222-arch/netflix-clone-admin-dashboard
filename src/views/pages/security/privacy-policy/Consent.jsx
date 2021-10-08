import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'


const Consent = () => 
{
    return (
        <Grid container spacing={1}>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Typography variant="h6" color="initial">Consent</Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Consent
