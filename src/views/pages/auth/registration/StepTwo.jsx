import React from 'react'
import Container from '@material-ui/core/Container'
import Header from '../../../../components/app/Header'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Colors from '../../../../constants/Colors';

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


const StepTwo = ({ setAllowAccessToLocation, setStepIndex }) => 
{
    const classes = useStyles();

    const handleClickNo = () => {
        setAllowAccessToLocation(false);
        setStepIndex(2);
    }

    const handleClickContinue = () => {
        setAllowAccessToLocation(true);
        setStepIndex(2);
    }

    return (
        <Container maxWidth="xl">
            <Header />
            <Container maxWidth="md" className={ classes.subContainer }>
                <Grid container spacing={2} alignItems='center'>
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

export default StepTwo
