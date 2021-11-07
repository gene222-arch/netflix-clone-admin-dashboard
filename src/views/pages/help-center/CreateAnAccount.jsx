import React, { useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core'
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { Typography, Link } from '@material-ui/core';
import PATH from './../../../routes/path';
import Colors from './../../../constants/Colors';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => 
({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const createAnAccountUseStyles = makeStyles(theme => ({
    container: {
        marginTop: '2rem'
    },
    manageProfileLink: {
        color: Colors.info,
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));

const CreateAnAccount = () => 
{
    const classes = createAnAccountUseStyles();
    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => setExpanded(newExpanded ? panel : false);

    useEffect(() => {
        return () => {
            setExpanded('');
        }
    }, []);

    return (
        <div className={ classes.container }>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>How to create a <strong>Profile</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='subtitle1' color='textSecondary'>
                        1. Go to your <Link href={ PATH.USER_PROFILE } className={ classes.manageProfileLink }>Manage Profiles</Link> page.
                    </Typography>
                </AccordionDetails>
                <AccordionDetails>
                    <Typography variant='subtitle1' color='textSecondary'>2. Choose the profile you want to change.</Typography>
                </AccordionDetails>
                <AccordionDetails>
                    <Typography variant='subtitle1' color='textSecondary'>3. Change the name, maturity, and image on the profile.</Typography>
                </AccordionDetails>
                <AccordionDetails>
                    <Typography variant='subtitle1' color='textSecondary'>4. Save your changes.</Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>How to delete a <strong>Profile</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='subtitle1' color='textSecondary'>
                        1. Go to your <Link href={ PATH.USER_PROFILE } className={ classes.manageProfileLink }>Manage Profiles</Link> page.
                    </Typography>
                </AccordionDetails>
                <AccordionDetails>
                    <Typography variant='subtitle1' color='textSecondary'>2. Choose the profile you want to delete.</Typography>
                </AccordionDetails>
                <AccordionDetails>
                    <Typography variant='subtitle1' color='textSecondary'>3. Click the delete button.</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default CreateAnAccount