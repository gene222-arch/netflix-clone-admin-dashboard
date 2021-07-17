import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const addButtonUseStyles = makeStyles(theme => ({
    addBtn: {
        color: '#FFF',
        backgroundColor: 'transparent',
        '&:hover': {
            color: green[300],
        }
    }
}));

export default addButtonUseStyles