import React from 'react'
import { Grid, Typography } from '@material-ui/core';

const InformationWeCollect = () => 
{
    return (
        <Grid container spacing={2}>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Typography variant="h6" color="initial">Information we collect</Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default InformationWeCollect
