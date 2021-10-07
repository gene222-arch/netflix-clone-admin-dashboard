import React from 'react'
import Container from '@material-ui/core/Container'
import { Card, CardContent, Avatar, CardHeader, IconButton, Typography, Divider, Grid } from '@material-ui/core'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core';
import Introduction from './Introduction';
import Consent from './Consent';
import InformationWeCollect from './InformationWeCollect';
import HowWeUseInformation from './HowWeUseInformation';

const privacyPolicyUseStyles = makeStyles(theme => ({
    container: {
        padding: '3rem'
    }
}));

const PrivacyPolicy = () => 
{
    const classes = privacyPolicyUseStyles();

    return (
        <Container maxWidth="md">
            <Card>
                <CardHeader
                    title={ <Typography variant="h3" color="textPrimary">Privacy Policy</Typography> }
                    subheader=""
                />
                <Divider />
                <CardContent className={ classes.container }>
                    <Grid container spacing={1}>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <Introduction />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <Consent />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <InformationWeCollect />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <HowWeUseInformation />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    )
}

export default PrivacyPolicy
