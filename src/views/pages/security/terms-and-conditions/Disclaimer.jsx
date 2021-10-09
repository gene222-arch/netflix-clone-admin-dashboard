import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemIcon } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const nots = [
    'limit or exclude our or your liability for death or personal injury;',
    'limit or exclude our or your liability for fraud or fraudulent misrepresentation;',
    'limit any of our or your liabilities in any way that is not permitted under applicable law; or',
    'exclude any of our or your liabilities that may not be excluded under applicable law.'
];


const Disclaimer = () => 
{
    return (
        <Grid container spacing={1} direction='column'>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Typography variant="h6" color="initial"><strong>Disclaimer</strong></Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    The following organizations may link to our Website without prior written approval:
                </Typography>
                <List>
                    {
                        nots.map((not, index) => (
                            <ListItem key={ index }>
                                <ListItemIcon>
                                    <CloseIcon />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant="body2" color="textSecondary">{ not }</Typography>
                                }/>
                            </ListItem>
                        ))
                    }
                </List>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Disclaimer
