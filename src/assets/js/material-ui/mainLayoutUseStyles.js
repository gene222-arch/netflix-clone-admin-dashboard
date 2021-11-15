import { makeStyles } from '@material-ui/core/styles';
import Colors from './../../../constants/Colors';

const drawerWidth = 350;

const mainLayoutUseStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appLogo: {
        padding: '4rem'
    },
    avatar: {
        width: '25%',
        height: '4.5rem',
        objectFit: 'contain',
        boxShadow: theme.shadows['7'],
        marginBottom: '1rem'
    },
    avatarText: {
        color: Colors.white
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    authenticatedUserInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(0, 1, 0, 2),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    authenticatedUserName: {
        fontSize: '1rem',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    authenticatedUserRole: {
        fontSize: '.75rem',
        textAlign: 'center',
        color: theme.palette.text.disabled
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    collapseChildren: {
        marginLeft: theme.spacing(3)
    },
    menuButton: {
        marginRight: '.9rem',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        zIndex: 0,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    searchField: {
        backgroundColor: Colors.darkMode
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1, 0, 2),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    header: {
        marginRight: '2rem'
    },
    icon: {
        color: theme.palette.error.dark
    },
    userInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '1.5rem 0',
    }
}));

export default mainLayoutUseStyles