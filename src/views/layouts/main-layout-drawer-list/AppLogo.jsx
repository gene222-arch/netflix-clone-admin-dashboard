import React from 'react'
import { useTheme } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../redux/modules/auth/selector';
import * as MAIN_LAYOUT_ACTION from './../../../redux/modules/main-layout/actions';
import { connect, useDispatch } from 'react-redux';
import mainLayoutUseStyles from './../../../assets/js/material-ui/mainLayoutUseStyles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CancelIcon from '@material-ui/icons/Cancel';
import { Skeleton } from '@material-ui/lab';
import { selectMainLayout } from '../../../redux/modules/main-layout/selector';


const Avatar = ({ AUTH, MAIN_LAYOUT }) => 
{
    const theme = useTheme();
    const classes = mainLayoutUseStyles();
    const dispatch = useDispatch();
    
    const handleToggleDrawer = () => dispatch(MAIN_LAYOUT_ACTION.toggleDrawer());

    return (
        <>
            <div className={ classes.toolbar }>
                <Typography variant="h5" color="initial">
                    Netflix Dash
                </Typography>
                <IconButton onClick={ handleToggleDrawer }>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <CancelIcon />}
                </IconButton>
            </div>
            {
                MAIN_LAYOUT.drawer && <div className={ classes.authenticatedUserInfo }>
                    {
                        !AUTH.user
                            ? (
                                <>
                                    <Typography variant='subtitle1'><Skeleton /></Typography>
                                    <Typography variant='subtitle2'><Skeleton /></Typography>
                                </>
                            )
                            : (
                                <>
                                    <Typography variant='subtitle1' color="initial" className={ classes.authenticatedUserName }>
                                        { `${ AUTH.user.first_name } ${ AUTH.user.last_name }` }
                                    </Typography>
                                    <Typography variant='subtitle2' color="initial" className={ classes.authenticatedUserEmail } >
                                        { AUTH.user.email }
                                    </Typography>
                                </>
                            )
                    }
                </div>
            }
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth,
    MAIN_LAYOUT: selectMainLayout
});

export default connect(mapStateToProps)(Avatar)
