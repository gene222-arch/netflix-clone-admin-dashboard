import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Colors from '../../../constants/Colors';

const authLayoutHeaderUseStyles = makeStyles((theme) => ({
    container: {
        height: '10vh',
    },
    link: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    linkText: {
        fontSize: '1rem',
        color: Colors.white,
        backgroundColor: Colors.netflixRed,
        padding: theme.spacing(.8, 2),
        borderRadius: 4
    },
    logo: {
        width: '3rem',
        height: 'auto',
        marginTop: '2rem'
    }
}));

export default authLayoutHeaderUseStyles