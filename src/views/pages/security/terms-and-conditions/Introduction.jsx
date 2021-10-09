import React from 'react'
import { Grid, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const introductionUseStyles = makeStyles(theme => ({
    link: {
        color: 'rgba(255, 255, 255, .7)',
        marginLeft: 6
    }
}));

const Introduction = () =>
{
    const classes = introductionUseStyles();

    return (
        <Grid container spacing={2} direction='column'>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    Welcome to flicklify!
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    These terms and conditions outline the rules and regulations for the use of Flicklify Organization's Website, located at <Link className={ classes.link } color='primary' href='https://flicklify.com'>https://flicklify.com</Link>.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    By accessing this website we assume you accept these terms and conditions. Do not continue to use flicklify if you do not agree to take all of the terms and conditions stated on this page.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Introduction
