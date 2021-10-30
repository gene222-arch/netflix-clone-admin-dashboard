import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { useHistory, useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import Colors from '../../../../constants/Colors';
import PATH from './../../../../routes/path';
import PlanTypeList from './PlanTypeList';
import PaymentMethod from './PaymentMethod';

const MESSAGES = [
    'Watch all you want',
    'Recommendations just for you',
    'Stream more. Search less'
];

const selectPlanUseStyles = makeStyles(theme => ({
    checkIcon: {
        color: Colors.netflixRed
    }
}));

const SelectPlan = () => 
{
    const classes = selectPlanUseStyles();
    const history = useHistory();
    const { state } = useLocation();

    const [ cardIndex, setCardIndex ] = useState(0);
    const [ amount, setAmount ] = useState(0);
    const [ planType, setPlanType ] = useState('Basic');
    const [ isPlanTypeSet, setIsPlanTypeSet ] = useState(false);

    const handleClickContinue = () => setIsPlanTypeSet(true);

    const handleClickCardPlan = (index, type, cost) => {
        setCardIndex(index);
        setPlanType(type);
        setAmount(cost);
    }

    useEffect(() => {
        return () => {
            setPlanType('Basic');
            setIsPlanTypeSet(false);
            setCardIndex(0);
            setAmount(0);
        }
    }, []);

    if (isPlanTypeSet) 
    {
        return (
            <PaymentMethod amount={ amount } setIsPlanTypeSet={ setIsPlanTypeSet } />
        )
    }

    return (
        <Container maxWidth="xl">
            <Container maxWidth="md">
                <Grid container spacing={1}>
                    <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                        <Typography variant="subtitle2" gutterBottom>Step 3 of 4</Typography>
                        <Typography variant="h5" gutterBottom>Choose the plan the fits your needs</Typography>
                        {
                            MESSAGES.map((message, index) => 
                            (
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
                    <PlanTypeList 
                        cardIndex={ cardIndex }
                        handleClickCardPlan={ handleClickCardPlan } 
                        handleClickContinue={ handleClickContinue } 
                    />
                </Grid>
            </Container>
        </Container>
    )
}


export default SelectPlan
