import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import AuthLayoutHeader from '../../../../components/app/AuthLayoutHeader'
import { useHistory, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { makeStyles, Typography, Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import Colors from '../../../../constants/Colors';
import * as AUTH_ACTION from './../../../../redux/modules/auth/actions'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAuth } from './../../../../redux/modules/auth/selector';

const PLAN_TYPES = [
    {
        type: 'Basic',
        cost: 'P 100.00',
        servicesOffered: [
            '1 (One) month',
        ]
    },
    {
        type: 'Standard',
        cost: 'P 200.00',
        servicesOffered: [
            '2 (Two) months',
            ''
        ]
    },
    {
        type: 'Premium',
        cost: 'P 600.00',
        servicesOffered: [
            '6 (Six) months',
            ''
        ]
    },
];

const MESSAGES = [
    'Watch all you want',
    'Recommendations just for you',
    'Stream more. Search less'
];

const selectPlanUseStyles = makeStyles(theme => ({
    card: {
        marginBottom: theme.spacing(2),
        height: '26.8vh',
        cursor: 'pointer'
    },
    cardContainer: {

    },
    continueButton: {
        width: '100%',
        height: '2.65rem'
    },
    selectedCardContainer: {
        boxShadow: '0 0 2px 2px rgba(255, 255, 255, 1)'
    },
    unSelectedCardContainer: {
        opacity: 0.6
    },
    selectedPlanTypeText: {
        color: Colors.netflixRed,
        fontWeight: 'bold'
    },
    checkIcon: {
        color: Colors.netflixRed
    },
    planListContainer: {
        marginTop: theme.spacing(5)
    }
}));

const SelectPlan = ({ AUTH }) => 
{
    const classes = selectPlanUseStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { state } = useLocation();

    const [ cardIndex, setCardIndex ] = useState(0);
    const [ plantType, setPlanType ] = useState('Basic');

    const handleClickContinue = () => {
        dispatch(AUTH_ACTION.register({
            ...state?.credentials,
            plan_type: plantType
        }));
    }

    const handleClickCardPlan = (index, type) => {
        setCardIndex(index);
        setPlanType(type);
    }

    useEffect(() => {
        return () => {
            setPlanType('Basic');
        }
    }, []);

    return (
        <Container maxWidth="xl">
            <AuthLayoutHeader />
            <Container maxWidth="md">
                <Grid container spacing={1}>
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                        <Typography variant="subtitle2" gutterBottom>Step 4 of 4</Typography>
                        <Typography variant="h5" gutterBottom>Choose the plan the fits your needs</Typography>
                        {
                            MESSAGES.map((message, index) => (
                                <Grid key={ index } container spacing={1} alignItems='center'>
                                    <Grid item>
                                        <CheckIcon className={ classes.checkIcon } />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2" gutterBottom>{ message }</Typography>
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                        <Grid 
                            container 
                            justify='space-evenly' 
                            className={ classes.planListContainer }
                        >
                        {
                            PLAN_TYPES.map(({ type, cost, servicesOffered }, index) => (
                                <Grid 
                                    item
                                    key={ index } 
                                    xs={ 12 } sm={ 6 } md={ 5 } lg={ 5 } 
                                    className={ classes.cardContainer }
                                    onClick={ () => handleClickCardPlan(index, type) }
                                >
                                    <Card 
                                        className={ 
                                                `${ classes.card } 
                                                ${ cardIndex === index 
                                                    ? classes.selectedCardContainer 
                                                    : classes.unSelectedCardContainer 
                                                }` 
                                        }
                                    >
                                        <CardHeader
                                            title={ 
                                                <> 
                                                    <Typography 
                                                        variant="h6" 
                                                        color="textSecondary" 
                                                        align='center' 
                                                        gutterBottom
                                                        className={ cardIndex === index ? classes.selectedPlanTypeText : '' }
                                                    >
                                                        { type }
                                                    </Typography>
                                                    <Typography variant="h5" color="initial" align='center'><strong>{ cost }</strong></Typography>
                                                </> 
                                            }
                                        />
                                        <CardContent>
                                            {
                                                servicesOffered.map((service, index) => (
                                                    <Typography key={ index } variant="subtitle1" color="textSecondary" align='center'>{ service }</Typography>
                                                ))
                                            }
                                        </CardContent>
                                        <Button 
                                                variant='contained' 
                                                color='default' 
                                                className={ classes.continueButton }
                                                disabled={ index !== cardIndex || AUTH.isLoading }
                                                onClick={ handleClickContinue }
                                            >
                                                Get Started
                                            </Button>
                                    </Card>
                                </Grid>
                            ))
                        }
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTH: selectAuth
});

export default connect(mapStateToProps)(SelectPlan)
