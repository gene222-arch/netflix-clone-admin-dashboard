import { makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const styledNavLinkUseStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: '#FFFFFF',
        '&:hover': {
            color: blue[500]
        }
    }
}));

export default styledNavLinkUseStyles