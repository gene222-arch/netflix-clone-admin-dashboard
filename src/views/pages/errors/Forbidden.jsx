import React from 'react'
import { Card, Container, CardContent, Grid, Typography, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const forbiddenUseStyles = makeStyles(theme => ({
    container: {
        height: 'auto',
        marginTop: '10vh'
    }
}));

const Forbidden = () => 
{
    const classes = forbiddenUseStyles();
    const history = useHistory();

    return (
        <Container maxWidth="lg">
            <Grid container spacing={1} alignItems='center' justify='center' className={ classes.container }>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Typography variant="h4" color="initial" align='center' gutterBottom>YOU SHALL NOT PASS</Typography>
                    <Typography 
                        variant="h1" 
                        color='error' 
                        align='center' 
                        gutterBottom
                    >
                        <strong>403</strong>
                    </Typography>
                    <Typography variant="h5" color="initial" align='center' gutterBottom>
                        We are sorry, but you do not have access to this page or resource.
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="default" 
                        onClick={ () => history.goBack() }
                        fullWidth
                    >
                        Go Back
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Forbidden
