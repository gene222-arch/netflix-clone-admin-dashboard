import { makeStyles } from '@material-ui/core/styles';
import Colors from './../../../constants/Colors';

const registrationFormUseStlyes = makeStyles((theme) => ({
    container: {
        height: '110vh',
        [theme.breakpoints.up('sm')]: {
            height: '81.5vh'
        }
    },
    headerLabel: {
        marginBottom: '2rem'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        [theme.breakpoints.up('sm')]: {
            width: '30rem'
        }
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    progress: {
        marginRight: 10,
        color: Colors.white
    },
    submit: {
        display: 'flex',
        alignItems: 'center'
    },
}));

export default registrationFormUseStlyes
