import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router'
import { Link, makeStyles, IconButton } from '@material-ui/core'
import Colors from './../../../constants/Colors';
import ArrowBack from '@material-ui/icons/ArrowBack'
import PATH from './../../../routes/path';

const howToChangeYourPlanUseStyles = makeStyles(theme => ({
    arrowBackLabel: {
        paddingLeft: '0.5rem',
        fontSize: '0.85rem'
    },
    explanation: {
        marginTop: '2rem'
    },
    headerTitle: {
        marginBottom: '2rem'
    },
    instructions: {
        marginBottom: '1rem'
    },
    link: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    steps: {
        color: Colors.grey,
        paddingLeft: '0.5rem'
    }
}));

const HowToChangeYourPlan = () => 
{
    const classes = howToChangeYourPlanUseStyles();
    const history = useHistory();

    return (
        <Container maxWidth="lg">
            <IconButton onClick={ () => history.goBack() }>
                <ArrowBack />
            </IconButton>
            <small className={ classes.arrowBackLabel }>Go back</small>
            <Typography variant="h4" color="initial" className={ classes.headerTitle }>
                <strong>How to update or change your plan?</strong>
            </Typography>
            <Typography variant="subtitle1" color="initial" gutterBottom className={ classes.instructions }>
                By following these easy steps, you can change your Flicklify plan at anytime, whenever:
            </Typography>
            <Typography variant="subtitle1" color="initial" gutterBottom className={ classes.steps }>
                1. Sign in to your <Link href={ PATH.LOGIN } color='error' className={ classes.link }>Flicklify account</Link>.
            </Typography>
            <Typography variant="subtitle1" color="initial" gutterBottom className={ classes.steps }>
                2. Under <strong>Account</strong> select <strong>Manage Plan</strong>.
            </Typography>
            <Typography variant="subtitle1" color="initial" gutterBottom className={ classes.steps }>
                3. Click <strong>change</strong>.
            </Typography>
            <Typography variant="subtitle1" color="initial" gutterBottom className={ classes.steps }>
                4. Select your <strong>Plan Type</strong>.
            </Typography>
            <Typography variant="subtitle1" color="initial" gutterBottom className={ classes.steps }>
                5. Select <strong>Payment Method</strong> of your choice.
            </Typography>
            <div className={ classes.explanation }>
                <Typography variant="body1" color="initial" gutterBottom>
                    A <strong>Plan Upgrade</strong> takes effect immediately so you can enjoy all of the added features.
                </Typography>
                <Typography variant="body1" color="initial" gutterBottom>
                    A <strong>Plan Downgrade</strong> also takes effect immediately and the features you've enjoyed so far won't be available. The latest profiles will be disabled or unusable depending on the plan downgrade.
                </Typography>
            </div>
        </Container>
    )
}

export default HowToChangeYourPlan
