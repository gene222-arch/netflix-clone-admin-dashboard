import { makeStyles } from '@material-ui/core/styles';
import Colors from './../../../constants/Colors';

const comingSoonMovieUseStyles = makeStyles((theme) => ({
    status: {

    },
    statusRelease: {
        backgroundColor: Colors.tomato
    },
    statusComingSoon: {
        backgroundColor: Colors.darkMode 
    }
}));

export default comingSoonMovieUseStyles