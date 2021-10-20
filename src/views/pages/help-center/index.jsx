import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { Grid, Card, CardContent, CardHeader, List, ListItem, ListItemText, makeStyles, Link } from '@material-ui/core'
import { useHistory } from 'react-router-dom';


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
                path: ''
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
                path: ''
            },
        ]
    },
    {
        title: 'Watching Netflix',
        list: [
            {
                title: 'How to create and edit profiles',
                path: ''
            },
        ]
    },
    {
        title: 'Quick Links',
        list: [
            {
                title: 'Update email',
                path: ''
            },
            {
                title: 'Update password',
                path: ''
            },
            {
                title: 'Cancel account',
                path: ''
            },
            {
                title: 'Review payment history',
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
            <Typography variant="h4" color="initial" gutterBottom>Help Center</Typography>
            <Grid container spacing={1}>
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
