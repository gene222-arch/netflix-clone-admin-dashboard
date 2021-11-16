import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { Card, CardContent, makeStyles, Typography, Grid } from '@material-ui/core';
import Colors from './../../../constants/Colors';
import AvatarList from './AvatarList';
import UploadAvatar from './UploadAvatar';


const avatarOptionsUseStyles = makeStyles(theme => ({
    card: {
        width: '100%',
        '&:hover': {
            cursor: 'pointer',
            opacity: 0.8,
            boxShadow: `inset 0 0 5px ${ Colors.netflixRed }`
        }
    },
    cardGridContainer: {
    },
    container: {
        height: '91vh'
    },
    headerTitle: {
        margin: '3rem 0 2rem'
    }
}));


const AvatarOptions = ({ profile, setProfile, toggleAvatarList }) => 
{
    const classes = avatarOptionsUseStyles();

    const [ selectedOption, setSelectedOption ] = useState('');

    const handleClickAvatar = (selectedAvatar) => {
        setProfile({ ...profile, avatar: selectedAvatar });
        toggleAvatarList();
    }

    const handleUpload = (uri) => {
        setProfile({ ...profile, avatar: uri });
        toggleAvatarList();
    }

    const options = 
    [
        {
            title: 'Avatars',
            actionName: 'avatar'
        },
        {
            title: 'Upload Image',
            actionName: 'upload'
        },
        {
            title: 'Use Camera',
            actionName: 'camera'
        }
    ];

    useEffect(() => 
    {
        return () => {
            setSelectedOption('');
        }
    }, []);

    if (selectedOption === 'avatar') return <AvatarList handleClickAvatar={ handleClickAvatar } />

    if (selectedOption === 'upload') return <UploadAvatar handleUpload={ handleUpload } />

    return (
        <Container maxWidth="sm" className={ classes.container }>
            <Typography variant="h4" color="initial" className={ classes.headerTitle }>Avatar Options</Typography>
            <Grid container spacing={ 3 } alignItems='center' className={ classes.cardGridContainer }>
            {
                options.map(({ title, actionName }, index) => (
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } key={ index }>
                        <Card className={ classes.card } onClick={ () => setSelectedOption(actionName) }>
                            <CardContent>
                                <Typography variant="h6" color="initial">
                                    { title }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
            </Grid>
        </Container>
    )
}

export default AvatarOptions
