import React from 'react'
import { Grid, Card, CardHeader, CardContent, Button, makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Colors from '../../../../constants/Colors';

const PLAN_TYPES = 
[
    {
        type: 'Basic',
        cost: 100.00,
        servicesOffered: [
            '1 (One) month',
        ]
    },
    {
        type: 'Standard',
        cost: 200.00,
        servicesOffered: [
            '2 (Two) months',
            ''
        ]
    },
    {
        type: 'Premium',
        cost: 600.00,
        servicesOffered: [
            '6 (Six) months',
            ''
        ]
    },
];

const plantTypeListUseStyles = makeStyles(theme => ({
    card: {
        marginBottom: theme.spacing(2),
        height: '26.8vh',
        cursor: 'pointer'
    },
    gridContainer: {
        marginBottom: theme.spacing(2)
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

const PlanTypeList = ({ cardIndex, handleClickCardPlan, handleClickContinue }) => 
{
    const classes = plantTypeListUseStyles();

    return (
        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
            <Grid 
                container 
                justify='space-evenly' 
                className={ classes.planListContainer }
                spacing={ 2 }
            >
            {
                PLAN_TYPES.map(({ type, cost, servicesOffered }, index) => (
                    <Grid 
                        item
                        key={ index } 
                        xs={ 12 } sm={ 10 } md={ 5 } lg={ 5 } 
                        className={ classes.gridContainer }
                        onClick={ () => handleClickCardPlan(index, type, cost) }
                    >
                        <Card 
                            className={ 
                                    `${ classes.card } 
                                    ${ cardIndex === index ? classes.selectedCardContainer : classes.unSelectedCardContainer }` 
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
                                        <Typography variant="h5" color="initial" align='center'><strong>P { cost }</strong></Typography>
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
                                disabled={ index !== cardIndex }
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
    )
}

export default PlanTypeList
