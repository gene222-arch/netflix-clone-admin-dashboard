import { makeStyles } from '@material-ui/core/styles';

const registrationFormUseStlyes = makeStyles((theme) => ({
    description: {
        width: '30rem',
    },
    headerLabel: {
        marginBottom: '2rem'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '30rem',
        margin: 'auto'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        
    },
}));

export default registrationFormUseStlyes
