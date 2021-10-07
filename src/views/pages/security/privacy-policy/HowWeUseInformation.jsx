import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemIcon } from '@material-ui/core';
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined';



const ways = [
    "Provide, operate, and maintain our website",
    "Improve, personalize, and expand our website",
    "Understand and analyze how you use our website",
    "Develop new products, services, features, and functionality",

    "Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes",
    "Send you emails",
    "Find and prevent fraud"
];

const HowWeUseInformation = () => 
{
    return (
        <Grid container spacing={1}>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Typography variant="h6" color="initial">How we use your information</Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    We use the information we collect in various ways, including to:
                </Typography>
                <List>
                    {
                        ways.map((way, index) => (
                            <ListItem key={ index }>
                                <ListItemIcon>
                                    <BeenhereOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant="body2" color="textSecondary">{ way }</Typography>
                                }/>
                            </ListItem>
                        ))
                    }
                </List>
            </Grid>
        </Grid>
    )
}

export default HowWeUseInformation
