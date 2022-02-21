import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Grid, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check';

const warrantAndPresents = [
    'You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;',
    'The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;',
    'The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy',
    'The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.',
];

const License = () => 
{
    return (
        <Grid container spacing={1} direction='column'>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Typography variant="h6" color="initial"><strong>License</strong></Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6" color="error">
                    Flicklify Organization does not own the intellectual property rights for all material on Flicklify.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    This Agreement shall begin on the date hereof.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Flicklify Organization does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Flicklify Organization,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Flicklify Organization shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    Flicklify Organization reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    You warrant and represent that:
                </Typography>
            </Grid>
            <Grid item>
                <List>
                    {
                        warrantAndPresents.map((warrantAndPresent, index) => (
                            <ListItem key={ index }>
                                <ListItemIcon>
                                    <CheckIcon />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant="body2" color="textSecondary">{ warrantAndPresent }</Typography>
                                }/>
                            </ListItem>
                        ))
                    }
                </List>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    You hereby grant Flicklify Organization a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default License
