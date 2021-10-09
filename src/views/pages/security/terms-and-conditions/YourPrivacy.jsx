import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Link } from '@material-ui/core'
import PATH from './../../../../routes/path';


const YourPrivacy = () => 
{
    return (
        <Grid container spacing={1} direction='column'>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Typography variant="h6" color="initial"><strong>Your Privacy</strong></Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Please read <Link href={ PATH.PRIVACY_POLICY } color='textSecondary'>Privacy Policy</Link>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default YourPrivacy
