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
        <Grid container spacing={2}>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    At Flicklify, accessible from 
                    <Link className={ classes.link } color='primary' href='https://flicklify.com'>https://flicklify.com</Link>
                    , one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by flicklify and how we use it.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    This Privacy Policy applies only to our online activities and is valid for visitors to our  website with regards to the information that they shared and/or collect in flicklify. This   policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the Free Privacy Policy Generator.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Introduction
