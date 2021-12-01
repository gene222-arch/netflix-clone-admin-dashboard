import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { Card, CardContent, makeStyles, Typography, Grid } from '@material-ui/core';
import Colors from './../../../constants/Colors';
import AvatarList from './AvatarList';
import UploadAvatar from './UploadAvatar';
import UploadByCamera from './UploadByCamera';
import GetBack from './../../../components/GetBack';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../redux/modules/auth/selector';
import { connect } from 'react-redux';
import * as DEVICE from './../../../constants/Device'

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


const AvatarOptions = ({ AUTH, profile, setProfile, toggleAvatarList }) => 
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
            actionName: 'avatar',
            isAvailable: [ 'Basic', 'Standard', 'Premium' ].includes(AUTH.subscription_details.type),
            visible: true
        },
        {   
            title: 'Upload Image',
            actionName: 'upload',
            isAvailable: AUTH.subscription_details.type === 'Premium',
            visible: true
        },
        {
            title: 'Use Camera',
            actionName: 'camera',
            isAvailable: AUTH.subscription_details.type === 'Premium',
            visible: !DEVICE.isMobile()
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

    if (selectedOption === 'camera') return <UploadByCamera handleUpload={ handleUpload } />

    return (
        <Container maxWidth="sm" className={ classes.container }>
            <Typography variant="h4" color="initial" className={ classes.headerTitle }>Avatar Options</Typography>
            <Grid container spacing={ 3 } alignItems='center' className={ classes.cardGridContainer }>
            {
                options.map(({ title, actionName, isAvailable, visible }, index) => (isAvailable && visible) && (
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

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(AvatarOptions)
