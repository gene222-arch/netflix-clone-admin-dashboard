import { makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import Colors from './../../../constants/Colors';

const styledNavLinkUseStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: '#FFFFFF',
        '&:hover': {
            color: Colors.netflixRed
        }
    }
}));

export default styledNavLinkUseStyles