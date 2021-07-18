import { makeStyles } from '@material-ui/core';
import Colors from './../../../constants/Colors';

const styledNavLinkUseStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: '#FFFFFF',
        '&:hover': {
            color: Colors.tomato
        }
    }
}));

export default styledNavLinkUseStyles