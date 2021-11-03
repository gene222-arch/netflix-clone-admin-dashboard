import React, { useState, useEffect } from 'react'
import { 
    Card, 
    CardContent, 
    makeStyles, 
    Button,
    Grid, 
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Link
} from '@material-ui/core'
import { AccessTime, Check, Face, RecentActors } from '@material-ui/icons'
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../../redux/modules/auth/selector';
import { connect, useDispatch } from 'react-redux';
import Colors from './../../../../constants/Colors';
import * as CONFIRM_ACTION from './../../../../redux/modules/confirm/actions'
import * as AUTH_ACTION from './../../../../redux/modules/auth/actions'

const currentSubscriptionUseStyles = makeStyles(theme => ({
    cancelBtn: {
        backgroundColor: Colors.netflixRed,
        '&:hover': {
            color: Colors.netflixRed,
            backgroundColor: Colors.white
        }
    },
    changeSubsText: {
        color: Colors.warning,
        fontSize: 14,
        marginLeft: '0.25rem'
    },
    container: {
    }
}));

const CurrentSubscripton = ({ AUTH }) => 
{
    const classes = currentSubscriptionUseStyles();
    const dispatch = useDispatch();

    const [ profileCount, setProfileCount ] = useState(2);
    const [ durationInMonth, setDurationInMonth ] = useState(1);
    const [ uniqueFeature, setUniqueFeature ] = useState('');
    const subscriptionDetails = [
        {
            content: `${ profileCount } profiles`,
            icon: RecentActors
        },
        {
            content: `${ durationInMonth } month(𝐬)`,
            icon: AccessTime
        },
        {
            content: uniqueFeature,
            icon: Check
        }
    ];

    const onLoadSetStates = () => 
    {
        const subscriptionType = AUTH.subscription_details.type;

        switch (subscriptionType) {
            case 'Standard':
                setProfileCount(4);
                setDurationInMonth(1);
                setUniqueFeature('');
                break;

            case 'Premium':
                setProfileCount(5);
                setDurationInMonth(6);
                setUniqueFeature('Customizable profile avatars')
                break;
        
            default:
                setProfileCount(2);
                setDurationInMonth(6);
                setUniqueFeature('');
                break;
        }
    }

    const handleClickConfirmation = () => {
        dispatch(CONFIRM_ACTION.showConfirmationDialog({
            mainHeader: `Cancel ${ AUTH.subscription_details.type } Subscription?`,
            subHeader: 'Once confirmed, your account subscription will successfully be cancelled and a refund is not possible.',
            confirmCallback: () => dispatch(AUTH_ACTION.cancelSubscriptionStart())
        }));
    }

    useEffect(() => 
    {
        onLoadSetStates();
        
        return () => {
            setProfileCount(2);
            setDurationInMonth(1);
            setUniqueFeature('');
        }
    }, []);

    return (
        <Grid container spacing={1}>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Card>
                    <CardContent>
                        <Grid container spacing={1} alignItems='center' justify='space-between'>
                            <Grid item>
                                <Typography variant="h5" color="initial">
                                    <strong>{ AUTH.subscription_details.type }</strong>
                                    <Link href='' className={ classes.changeSubsText }>Change</Link>
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary">
                                    ({ AUTH.subscription_details?.days_left } days left)
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" color="textSecondary">
                                    P{ AUTH.subscription_details.cost.toFixed(2) }
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Card className={ classes.container }>
                    <CardContent>
                        <Typography variant="h6" color="initial">
                            Subscription Details
                        </Typography>
                        <List>
                            {
                                subscriptionDetails.map(({ content, icon: Icon }, index) => (
                                    <ListItem key={ index }>
                                        <ListItemIcon>
                                            <Icon />
                                        </ListItemIcon>
                                        <ListItemText primary={
                                            <Typography variant="subtitle2" color="textSecondary">
                                                { content }
                                            </Typography>
                                        }/>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <div style={{ textAlign: 'right' }}>
                    <Button 
                        variant="outlined" 
                        className={ classes.cancelBtn }
                        onClick={ handleClickConfirmation }
                        disabled={ AUTH.isLoading }
                    >
                        Cancel Subscription
                    </Button>
                </div>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(CurrentSubscripton)
