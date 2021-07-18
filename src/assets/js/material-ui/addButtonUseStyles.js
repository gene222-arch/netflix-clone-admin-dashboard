import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Colors from './../../../constants/Colors';

const addButtonUseStyles = makeStyles(theme => ({
    addBtn: {
        color: '#FFF',
        backgroundColor: 'transparent',
        '&:hover': {
            color: Colors.darkMode,
            backgroundColor: '#FFF',
        }
    }
}));

export default addButtonUseStyles