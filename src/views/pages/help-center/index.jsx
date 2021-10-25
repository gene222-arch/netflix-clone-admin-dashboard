import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { Grid, Card, CardContent, CardHeader, List, ListItem, ListItemText, makeStyles, Link } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import PATH from './../../../routes/path';


const helpCenterUseStyles = makeStyles(theme => ({
    card: {
        height: '30vh'
    },
    content: {
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline'
        }
    }
}));

const frequentProblems = [
    {
        title: 'Manage My Account',
        list: [
            {
                title: 'Plans and Pricing',
                path: PATH.PLANS_AND_PRICING
            },
            {
                title: 'How to change your plan',
                path: ''
            },
        ]
    },
    {
        title: 'Billing Questions',
        list: [
            {
                title: 'Billing and Payments',
                path: PATH.BILLING_AND_PAYMENTS
            },
        ]
    },
    {
        title: 'Watching Flicklify',
        list: [
            {
                title: 'How to create and edit profiles',
                path: PATH.HOW_TO_CREATE_A_PROFILE
            },
        ]
    },
    {
        title: 'Quick Links',
        list: [
            {
                title: 'Update email',
                path: PATH.UPDATE_EMAIL
            },
            {
                title: 'Update password',
                path: PATH.UPDATE_PASSWORD
            },
            {
                title: 'Cancel account',
                path: ''
            },
        ]
    }
];

const HelpCenter = () => 
{
    const classes = helpCenterUseStyles();
    const history = useHistory();

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" color="initial" gutterBottom><strong>Help Center</strong></Typography>
            <Grid container spacing={ 2 }>
                {
                    frequentProblems.map(({ title, list }, index) => (
                        <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 }>
                            <Card className={ classes.card }>
                                <CardHeader 
                                    title={ <Typography variant="h5" color="initial">{ title }</Typography> }
                                />
                                <CardContent>
                                    <List>
                                        {
                                            list.map(({ title, path }, index) => 
                                            (
                                                <ListItem key={ index } onClick={ () => history.push(path) }>
                                                    <ListItemText primary={ 
                                                        <Typography 
                                                            variant="subtitle1" 
                                                            color="textSecondary"
                                                            className={ classes.content }
                                                        >
                                                            { title }
                                                        </Typography>
                                                    }/>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}

export default HelpCenter
