import React from 'react'
import * as MAIN_LAYOUT_ACTION from './../../../redux/modules/main-layout/actions'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMainLayout } from '../../../redux/modules/main-layout/selector';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import StyledNavLink from '../../../components/styled-components/StyledNavLink';
import PATH from './../../../routes/path';
import ToolTipComponent from '../../../components/ToolTipComponent';
import { makeStyles } from '@material-ui/core';
import SubscriptionIcon from '@material-ui/icons/Subscriptions';
import { selectAuth } from './../../../redux/modules/auth/selector';

const subscriptionsUseStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.success.light
    }
}));

const Subscriptions = ({ AUTH, MAIN_LAYOUT }) => 
{
    const classes = subscriptionsUseStyles();
    const dispatch = useDispatch();

    const handleClickSubscriptions = () => dispatch(MAIN_LAYOUT_ACTION.selectSubscriptions());

    return AUTH.permissions.includes('Manage Subscriptions') && (
        <StyledNavLink 
            to={ PATH.SUBSCRIPTIONS }
            text={
                <ToolTipComponent 
                    withToolTip={ !MAIN_LAYOUT.drawer }
                    title='Subscriptions'
                    component={ 
                        <ListItem 
                            button 
                            onClick={ handleClickSubscriptions }
                            selected={ MAIN_LAYOUT.subscriptions }
                        >
                            <ListItemIcon>
                                <SubscriptionIcon className={ classes.icon } />
                            </ListItemIcon>
                            <ListItemText primary='Subscriptions' />
                        </ListItem>
                    }
                />
            }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    MAIN_LAYOUT: selectMainLayout
});

export default connect(mapStateToProps)(Subscriptions)
