import { makeStyles } from '@material-ui/core/styles';

const trailerCarouselUseStyles = makeStyles((theme) => ({
    header: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    title: {
        flex: 1
    },
    video: {
        width: '100%',
        backgroundSize: 'contain',
        borderBottomRightRadius: '.5rem',
        borderBottomLeftRadius: '.5rem'
    },
}));

export default trailerCarouselUseStyles
