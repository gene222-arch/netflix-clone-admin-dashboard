import React, { useState, useEffect } from 'react'
import Header from '../../../../components/app/Header';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
    }
}));

const RegistrationForm = () => 
{
    console.log('REG RENDER')
    const [ email, setEmail ] = useState('');
    const [ allowAccessToLocation, setAllowAccessToLocation ] = useState(false);
    const [ stepIndex, setStepIndex ] = useState(0);

    useEffect(() => {
        return () => {
            setStepIndex(0);
            setEmail('');
        }
    }, []);

    if (! stepIndex) return (
        <StepOne 
            setStepIndex={ setStepIndex } 
            email={ email } 
            setEmail={ setEmail } 
        />
    )

    if (stepIndex === 1) return (
        <StepTwo 
            setStepIndex={ setStepIndex } 
            setAllowAccessToLocation={ setAllowAccessToLocation }
        />
    )

    if (stepIndex === 2) return (
        <StepThree 
            email={ email } 
            allowAccessToLocation={ allowAccessToLocation }
            setStepIndex={ setStepIndex } 
        />
    )
}

export default RegistrationForm
