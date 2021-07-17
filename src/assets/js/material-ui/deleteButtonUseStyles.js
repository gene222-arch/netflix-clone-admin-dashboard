import { makeStyles } from '@material-ui/core';

const deleteButtonUseStyles = makeStyles(theme => ({
    deleteBtn: {
        '&:hover': {
            color: theme.palette.error.main,
        }
    }
}));

export default deleteButtonUseStyles