import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Introduction from './Introduction';
import Cookies from './Cookies';
import License from './License';
import HyperLinkingToOurContent from './HyperLinkingToOurContent';
import IFrames from './IFrames';
import ContentLiability from './ContentLiability';
import YourPrivacy from './YourPrivacy';
import ReservationOfRights from './ReservationOfRights';
import RemovalLinks from './RemovalLinks';
import Disclaimer from './Disclaimer';

const termsAndConditions = [
    Introduction,
    Cookies,
    License,
    HyperLinkingToOurContent,
    IFrames,
    ContentLiability,
    YourPrivacy,
    ReservationOfRights,
    RemovalLinks,
    Disclaimer
];

const TermsAndConditions = () => 
{
    return (
        <Container maxWidth="lg">
            <Grid container spacing={1}>
            {
                termsAndConditions.map((Component, index) => (
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                        <Component />
                    </Grid>
                ))
            }
            </Grid>
        </Container>
    )
}

export default TermsAndConditions
