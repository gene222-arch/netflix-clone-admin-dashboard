import { makeStyles } from '@material-ui/core/styles';
import Colors from './../../../constants/Colors';

const loginFormUseStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: 'rgba(44, 44, 44, .9)',
        padding: '.5rem 1.5rem',
        borderRadius: 10,
        boxShadow: theme.shadows['10']
    },
    lockIcon: {
        fontSize: '2.5rem'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: Colors.netflixRed,
        alignSelf: 'center',
        width: '5rem',
        height: '5rem'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: Colors.netflixRed,
        '&:hover': {
            backgroundColor: Colors.white,
            color: Colors.netflixRed,
            fontWeight: 'bold'
        }
    },
    rememberMe: {
        alignSelf: 'flex-start'
    }
}));

export default loginFormUseStyles