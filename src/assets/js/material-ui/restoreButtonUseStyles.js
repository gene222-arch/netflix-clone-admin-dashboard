import { makeStyles } from '@material-ui/core';
import Colors from './../../../constants/Colors';

const restoreButtonUseStyles = makeStyles(theme => ({
    restoreBtn: {
        backgroundColor: 'transparent',
        '&:hover': {
            color: theme.palette.info.main,
            backgroundColor: Colors.darkMode,
        }
    }
}));

export default restoreButtonUseStyles