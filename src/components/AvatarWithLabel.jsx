import React from 'react'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core'


const avatarWithLabelUseStyles = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(15),
        height: theme.spacing(15)
    },
    chip: {
        padding: theme.spacing(3),
        boxShadow: theme.shadows[2]
    },
    icon: {
        fontSize: theme.spacing(7.5),
        color: '#FFF'
    }
}));

const AvatarWithLabel = ({ label = 'Label', counter = 0, Icon, avatarStyle, counterStyle, labelStyle }) => 
{
    const classes = avatarWithLabelUseStyles();

    return (
        <Grid container spacing={1} direction='column' alignItems='center' >
            <Grid item>
                <Avatar 
                    alt="Remy Sharp" 
                    className={ classes.avatar }
                    style={ avatarStyle }
                >
                    <Icon fontSize='large' className={ classes.icon } />
                </Avatar>
            </Grid>
            <Grid item>
                <Chip 
                    label={
                        <Typography variant="h5" color="initial">
                            <strong>{ counter }</strong>
                        </Typography>
                    }
                    className={ classes.chip }
                    style={ counterStyle }
                />
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" color="initial" style={ labelStyle }>
                    { label }
                </Typography>
            </Grid>
        </Grid>
    )
}

export default AvatarWithLabel
