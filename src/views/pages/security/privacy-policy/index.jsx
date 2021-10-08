import React from 'react'
import Container from '@material-ui/core/Container'
import { Card, CardContent, Avatar, CardHeader, IconButton, Typography, Divider, Grid } from '@material-ui/core'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core';
import Introduction from './Introduction';
import Consent from './Consent';
import InformationWeCollect from './InformationWeCollect';
import HowWeUseInformation from './HowWeUseInformation';
import CookiesAndWebBeacons from './CookiesAndWebBeacons';
import AdvertisingPartnersPolicy from './AdvertisingPartnersPolicy';
import ThirdPartyPrivacyPolicy from './ThirdPartyPrivacyPolicy';
import CCPAPrivacyRights from './CCPAPrivacyRights';
import GDPRDataProtectionRights from './GDPRDataProtectionRights';
import ChildrenInformation from './ChildrenInformation';

const privacyPolicyUseStyles = makeStyles(theme => ({
    container: {
        padding: '3rem'
    }
}));


const content = [
    Introduction,
    Consent,
    InformationWeCollect,
    HowWeUseInformation,
    CookiesAndWebBeacons,
    AdvertisingPartnersPolicy,
    ThirdPartyPrivacyPolicy,
    CCPAPrivacyRights,
    GDPRDataProtectionRights,
    ChildrenInformation,
];

const PrivacyPolicy = () => 
{
    const classes = privacyPolicyUseStyles();

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" color="initial" gutterBottom>
                Privacy Policy Statement
            </Typography>
            <Grid container spacing={1}>
                {
                    content.map((ContentComponent, index) => (
                        <Grid key={ index } item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                            <ContentComponent />
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}

export default PrivacyPolicy
