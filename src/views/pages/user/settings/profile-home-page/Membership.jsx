import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import StyledNavLink from './../../../../../components/styled-components/StyledNavLink';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../../../redux/modules/auth/selector';
import { connect } from 'react-redux';
import PATH from './../../../../../routes/path';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';


const membershipUseStyles = makeStyles(theme => ({
    container: {
        padding: '2rem 0'
    },
    gridContainer: {
        padding: '1.5rem 0'
    },
}));


const Membership = ({ AUTH, id }) => 
{
    const classes = membershipUseStyles();

    const memberShipActionButtons = 
    [
        {
            id: 'email',
            icon: MailOutlineIcon,
            primaryText: AUTH.user.email,
            actionText: 'Change account email',
            actionPath: PATH.UPDATE_EMAIL,
            isTextSecondary: false
        },
        {
            id: 'password',
            icon: LockOpenIcon,
            primaryText: 'Password: ***********',
            actionText: 'Change account password',
            actionPath: PATH.UPDATE_PASSWORD,
            isTextSecondary: true
        },
    ];


    return (
        <Grid container spacing={1} className={ classes.gridContainer } >
            <Grid item xs={ 12 } sm={ 3 } md={ 3 } lg={ 3 }>
                <Typography variant="subtitle1" color="initial">MEMBERSHIP</Typography>
            </Grid>
            <Grid item xs={ 12 } sm={ 8 } md={ 8 } lg={ 8 }>
                <List>
                    {
                        memberShipActionButtons.map(({ id, icon: Icon, primaryText, actionText, actionPath, isTextSecondary }) => (
                            <ListItem key={ id }>
                                <ListItemAvatar>
                                    <Icon color={ isTextSecondary ? 'disabled' : 'action' } />
                                </ListItemAvatar>
                                <ListItemText primary={ 
                                    <Typography variant="subtitle1" color={ isTextSecondary ? 'textSecondary' : 'inherit' }>
                                        { primaryText }
                                    </Typography>
                                } />
                                <ListItemSecondaryAction>
                                    <StyledNavLink 
                                        to={ actionPath }
                                        text={ actionText }
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                    }
                </List>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(Membership)
