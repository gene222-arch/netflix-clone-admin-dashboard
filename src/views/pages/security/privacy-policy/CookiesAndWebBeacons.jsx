import React from 'react'
import { Grid, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Colors from './../../../../constants/Colors';

const cookiesAndWebBeaconsUseStyles = makeStyles(theme => ({
    link: {
        color: Colors.white,
        marginLeft: 6
    }
}));

const CookiesAndWebBeacons = () => 
{
    const classes = cookiesAndWebBeaconsUseStyles();

    return (
        <Grid container spacing={2}>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Typography variant="h6" color="initial">Cookies and Web Beacons</Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    Like any other website, flicklify uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    For more general information on cookies, please read
                    <Link 
                        className={ classes.link } 
                        href={ 'https://www.generateprivacypolicy.com/#cookies' } 
                        target='__blank'
                    >
                        "Cookies" article from the Privacy Policy Generator. 
                    </Link>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default CookiesAndWebBeacons
