import React from 'react';

/** Material UI Components */
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

/** Components */
import MuiAlert from './MuiAlert'

const useStyles = makeStyles((theme) => 
({
    root: {
		width: '100%',
			'& > * + *': {
				marginTop: theme.spacing(2),
			},
		},
}));

const AlertPopUp = ({ 
    status, 
    message, 
    autoHideDuration = 2000, 
    vertical='bottom',
    horizontal='left',
    open = false, 
    handleClickCloseAlert}) => 
{
    const classes = useStyles();
    const DEFAULT_STATUS = 'success';

    return (
        <div className={classes.root}>
			<Snackbar 
                open={ open } 
                autoHideDuration={ autoHideDuration } 
                onClose={ handleClickCloseAlert }
                anchorOrigin={{ vertical, horizontal }}
            >
				<MuiAlert onClose={ handleClickCloseAlert } severity={ status || DEFAULT_STATUS }>
					{ message }
				</MuiAlert>
			</Snackbar>
        </div>
    );
}

export default AlertPopUp;
