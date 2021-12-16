import { makeStyles } from '@material-ui/core';
import Colors from '../../../constants/Colors';

const authLayoutHeaderUseStyles = makeStyles((theme) => ({
    container: {
        height: '10vh',
        marginBottom: '3.5rem'
    },
    link: {
        textDecoration: 'none'
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