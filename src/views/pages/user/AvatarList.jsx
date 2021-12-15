import { makeStyles, Grid, Container } from '@material-ui/core';
import React from 'react'
import avatarUris from './../../../services/app-avatar-uris/avatar.uris';

const avatarListUseStyles = makeStyles(theme => ({
    avatar: {
        width: '100%',
        height: '100%',
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
    const classes = avatarListUseStyles();

    return (
        <Container maxWidth="md" className={ classes.container } style={{ height: '79.5vh' }}>
            <Grid container spacing={ 4 } justify='space-between' alignItems='center'>
            {
                avatarUris.map(avatar => (
                    <Grid key={ avatar } item xs={ 4 } sm={ 4 } md={ 4 } lg={ 4 }>
                        <div className={ classes.imgContainer }>
                            <img src={ avatar } className={ classes.avatar } onClick={ () => handleClickAvatar(avatar) } />
                        </div>
                    </Grid>
                ))
            }
            </Grid>
        </Container>
    )
}

export default AvatarList
