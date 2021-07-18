import { makeStyles } from '@material-ui/core';
import Colors from './../../../constants/Colors';

const deleteButtonUseStyles = makeStyles(theme => ({
    deleteBtn: {
        backgroundColor: 'transparent',
        '&:hover': {
            color: theme.palette.error.main,
            backgroundColor: Colors.darkMode,
        }
    }
}));

export default deleteButtonUseStyles