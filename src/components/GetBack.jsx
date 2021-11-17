import { IconButton, Typography, Grid } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import React from 'react'
import { useHistory } from 'react-router';

const GetBack = ({ onClick }) => 
{
    const history = useHistory();

    return (
        <Grid container spacing={1} alignItems='center'>
            <Grid item>
                <IconButton onClick={ () => typeof onClick === 'function' ? onClick() : history.goBack() }>
                    <ArrowBack />
                </IconButton>
            </Grid>
            <Grid item>
                <Typography variant="caption" color="initial">Go back</Typography>
            </Grid>
        </Grid>
    )
}

export default GetBack