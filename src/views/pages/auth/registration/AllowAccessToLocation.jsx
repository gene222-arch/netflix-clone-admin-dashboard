import React from 'react'
import Container from '@material-ui/core/Container'
import AuthLayoutHeader from '../../../../components/app/AuthLayoutHeader'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Colors from '../../../../constants/Colors';
import { useHistory, useLocation } from 'react-router-dom'
import PATH from '../../../../routes/path'
import UploadAvatar from './UploadAvatar';

const useStyles = makeStyles(theme => ({
    btn: {
        backgroundColor: Colors.netflixRed,
        color: Colors.white,
        '&:hover': {
            backgroundColor: Colors.white,
            color: '#000000'
        }
    },
    subContainer: {
        marginTop: '8rem'
    },
    queryText: {
        textAlign: 'center'
    }
}));


const AllowAccessToLocation = () => 
{
    const classes = useStyles();
    const history = useHistory();
    const { state } = useLocation();
 
    const handleClickNo = () => {
        history.push(PATH.UPLOAD_AVATAR, {
            ...state,
            allow_access_to_location: false
        });
    }

    const handleClickContinue = () => {
        history.push(PATH.UPLOAD_AVATAR, {
            ...state,
            allow_access_to_location: true
        });
    }

    return (
        <Container maxWidth="xl">
            <AuthLayoutHeader />
            <Container maxWidth="md" className={ classes.subContainer }>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                        <Typography variant="subtitle2">Step 1 of 4</Typography>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                        <Typography variant="h4" color="initial" className={ classes.queryText }>
                            Allow Flicklify to access your location?
                        </Typography>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                        <Button 
                            variant="contained" 
                            color="default" 
                            fullWidth 
                            className={ classes.btn } 
                            onClick={ handleClickNo }
                        >
                            No
                        </Button>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                        <Button 
                            variant="contained" 
                            color="default" 
                            fullWidth 
                            className={ classes.btn } 
                            onClick={ handleClickContinue }
                        >
                            Continue
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}

export default AllowAccessToLocation
