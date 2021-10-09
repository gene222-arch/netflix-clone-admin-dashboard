import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Link } from '@material-ui/core'
import PATH from './../../../../routes/path';


const RemovalLinks = () => 
{
    return (
        <Grid container spacing={1} direction='column'>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Typography variant="h6" color="initial"><strong>Reservation of Rights</strong></Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default RemovalLinks
