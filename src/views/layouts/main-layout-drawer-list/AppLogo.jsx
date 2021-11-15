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
import CloseIcon from '@material-ui/icons/Close';
import { selectMainLayout } from '../../../redux/modules/main-layout/selector';
import TextContentLoader from '../../../components/content-loader/TextContentLoader';
import MUIAvatar from '@material-ui/core/Avatar';


const Avatar = ({ AUTH, MAIN_LAYOUT }) => 
{
    const theme = useTheme();
    const classes = mainLayoutUseStyles();
    const dispatch = useDispatch();
    
    const handleToggleDrawer = () => dispatch(MAIN_LAYOUT_ACTION.toggleDrawer());

    return (
        <>
            <div className={ classes.toolbar }>
                <IconButton onClick={ handleToggleDrawer }>
                    { theme.direction === 'rtl' ? <ChevronRightIcon /> : <CloseIcon /> }
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
                                <div className={ classes.userInfoContainer }>
                                    <MUIAvatar className={ classes.avatar }>
                                        <Typography variant="h5" className={ classes.avatarText }>
                                            { AUTH.user.first_name.substring(0, 1) }
                                        </Typography>
                                    </MUIAvatar>
                                    <Typography variant='h5' color="initial" className={ classes.authenticatedUserName }>
                                        { `${ AUTH.user.first_name } ${ AUTH.user.last_name }` }
                                    </Typography>
                                    <Typography component='small' variant='caption' color="initial" className={ classes.authenticatedUserRole } >
                                        { AUTH.role }
                                    </Typography>
                                </div>
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
