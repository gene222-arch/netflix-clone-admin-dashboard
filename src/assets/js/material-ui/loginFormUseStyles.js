import { makeStyles } from '@material-ui/core/styles';
import Colors from './../../../constants/Colors';

const loginFormUseStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: 'rgba(44, 44, 44, .9)',
        padding: '.5rem 1.5rem',
        borderRadius: 10,
        boxShadow: theme.shadows['10']
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column'
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
    },
    termsAndServices: {
        marginTop: '1.5rem',
        width: '100%',
        paddingBottom: '1rem'
    }
}));

export default loginFormUseStyles