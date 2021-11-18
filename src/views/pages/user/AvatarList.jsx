import { makeStyles, Grid, Container } from '@material-ui/core';
import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const DEFAULT_AVATAR_URL = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png';

const avatarListUseStyles = makeStyles(theme => ({
    avatar: {
        width: 140,
        height: 140,
        '&:hover': {
            cursor: 'pointer',
            opacity: 0.8,
            border: '5px solid #FFF',
            borderRadius: 5
        }
    },
    imgContainer: {
        textAlign: 'center'
    }
}));

const AvatarList = ({ handleClickAvatar }) => 
{
    const theme = useTheme();
    const classes = avatarListUseStyles();
    const isBelowMd = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container maxWidth="md" className={ classes.container } style={{ height: isBelowMd ? 'auto' : '91.5vh' }}>
            <Grid container spacing={ 4 } justify='space-between' alignItems='center'>
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map(avatar => (
                    <Grid item xs={ 4 } sm={ 4 } md={ 4 } lg={ 4 }>
                        <div className={ classes.imgContainer }>
                            <img src={ DEFAULT_AVATAR_URL } className={ classes.avatar } onClick={ () => handleClickAvatar(DEFAULT_AVATAR_URL) } />
                        </div>
                    </Grid>
                ))
            }
            </Grid>
        </Container>
    )
}

export default AvatarList
