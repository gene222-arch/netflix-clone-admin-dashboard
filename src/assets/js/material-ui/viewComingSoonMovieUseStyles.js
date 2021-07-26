import { makeStyles } from '@material-ui/core';

const viewComingSoonMovieUseStyles = () => makeStyles((theme) => ({
    container: {
        background: `url(${ wallpaperURI })`,
        backgroundSize: 'cover',
        width: '100%',
    },
    titleLogoImg: {
        width: '50%',
        height: '10vh'
    }
}));

export default viewComingSoonMovieUseStyles