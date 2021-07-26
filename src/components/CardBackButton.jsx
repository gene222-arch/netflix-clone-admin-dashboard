import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useHistory } from 'react-router-dom';
import MoreVert from '@material-ui/icons/MoreVert';
import { IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const CardBackButton = ({ actionName = '', title }) => 
{
    const history = useHistory();

    return (
        <Grid container spacing={1} alignItems='center' justify='space-between'>
            <Grid item>
                <Grid container spacing={1} alignItems='center'>
                    <Grid item>
                        <IconButton aria-label='' onClick={ () => history.goBack() }>
                            <ArrowBackIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant='h5'>{ title }</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                {
                    actionName && (
                        <Typography variant="h6" color="initial">{ actionName }</Typography>
                    )
                }
            </Grid>
        </Grid>
    )
}

export default CardBackButton
