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
import { selectMainLayout } from '../../../redux/modules/main-layout/selector';
import TextContentLoader from '../../../components/content-loader/TextContentLoader';
import APP_LOGO from './../../../assets/images/app/iconflicklify.ico'
import { CardContent, Card, Divider } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const Avatar = ({ AUTH, MAIN_LAYOUT }) => 
{
    const theme = useTheme();
    const classes = mainLayoutUseStyles();
    const dispatch = useDispatch();
    
    const handleToggleDrawer = () => dispatch(MAIN_LAYOUT_ACTION.toggleDrawer());

    return (
        <>
            <div className={ classes.toolbar }>
                <img src={ APP_LOGO } alt="" width={ 50 } height={ 50 } />
                <IconButton onClick={ handleToggleDrawer } onMouseOver={ handleToggleDrawer }>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <CancelIcon />}
                </IconButton>
            </div>
            {
                MAIN_LAYOUT.drawer && <div className={ classes.authenticatedUserInfo }>
                    {
                        !AUTH.user
                            ? (
                                <>
                                    <TextContentLoader variant='subtitle1' />
                                    <TextContentLoader variant='subtitle2' height={ 10 } />
                                </>
                            )
                            : (
                                <>
                                    <Card className={ classes.userInfoContainer }>
                                    <Divider />
                                        <CardContent>
                                            <AccountCircleIcon className={ classes.accountCircleIcon } />
                                            <Typography variant='subtitle1' color="initial" className={ classes.authenticatedUserName }>
                                                { `${ AUTH.user.first_name } ${ AUTH.user.last_name }` }
                                            </Typography>
                                            <Typography variant='subtitle2' color="initial" className={ classes.authenticatedUserRole } >
                                                { AUTH.role }
                                            </Typography>
                                        </CardContent>
                                    </Card>
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
