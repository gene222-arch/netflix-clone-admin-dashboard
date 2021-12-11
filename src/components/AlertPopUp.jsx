import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from './MuiAlert'
import { createStructuredSelector } from 'reselect';
import { selectAlert } from '../redux/modules/alert/selector';
import * as ALERT_ACTION from '../redux/modules/alert/actions';
import { connect, useDispatch } from 'react-redux';
import Colors from './../constants/Colors';

const useStyles = makeStyles((theme) => 
({
    success: {
        backgroundColor: Colors.darkGrey
    },
    root: {
        width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
    },
}));

const AlertPopUp = ({  ALERT }) => 
{
    const classes = useStyles();
    const dispatch = useDispatch();

    const DEFAULT_STATUS = 'success';

    const handleClickCloseAlert = () => dispatch(ALERT_ACTION.hideAlert());

    return (
        <div className={classes.root}>
			<Snackbar 
                open={ ALERT.isOpen } 
                autoHideDuration={ ALERT.autoHideDuration } 
                onClose={ handleClickCloseAlert }
                anchorOrigin={{ 
                    vertical: ALERT.vertical, 
                    horizontal: ALERT.horizontal 
                }}
            >
				{
                    ALERT.status === 'success'
                        ? (
                            <MuiAlert onClose={ handleClickCloseAlert } className={ classes.success }>
                                { ALERT.message }
                            </MuiAlert>
                        ) : (
                            <MuiAlert onClose={ handleClickCloseAlert } severity={ ALERT.status || DEFAULT_STATUS }>
                                { ALERT.message }
                            </MuiAlert>
                        )
                }
			</Snackbar>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    ALERT: selectAlert
});

export default connect(mapStateToProps)(AlertPopUp);
