import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Link } from '@material-ui/core'
import PATH from './../../../../routes/path';


const ReservationOfRights = () => 
{
    return (
        <Grid container spacing={1} direction='column'>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Typography variant="h6" color="initial"><strong>Reservation of Rights</strong></Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default ReservationOfRights
