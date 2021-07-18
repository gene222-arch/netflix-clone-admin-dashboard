import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const SaveCancelButtons = ({ 
    saveButtonTitle = 'Save', 
    cancelButtonTitle = 'Cancel', 
    saveButtonCallback, 
    cancelButtonCallback,
    isLoading = false
}) => 
{
    return (
        <Grid container spacing={1}>
            <Grid item>
                <Button 
                    variant='contained' 
                    color='primary' 
                    onClick={ saveButtonCallback }
                    disabled={ isLoading }
                >
                    { saveButtonTitle }
                </Button>
            </Grid>
            <Grid item>
                <Button 
                    variant='contained' 
                    color='primary' 
                    onClick={ cancelButtonCallback }
                    disabled={ isLoading }
                >
                    { cancelButtonTitle }
                </Button>
            </Grid>
        </Grid>
    )
}

export default SaveCancelButtons
