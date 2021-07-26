import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion_ from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextContentLoader from './content-loader/TextContentLoader';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    details: {
        color: theme.palette.text.secondary
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        fontWeight: theme.typography.fontWeightRegular,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));


const ComingSoonMovieAccordion = ({ title, plot, casts, directors, authors, genres }) => 
{
    const classes = useStyles();

    const details = [
        {
            title: 'Title',
            subTitle: title,
            details: ``,
            hasSubtitle: true,
            hasDetails: false,
        },
        {
            title: 'Plot',
            details: plot,
            hasSubtitle: false,
            hasDetails: true,
        },
        {
            title: 'Casts',
            details: casts,
            hasSubtitle: false,
            hasDetails: true,
        },
        {
            title: 'Directors',
            details: directors,
            hasSubtitle: false,
            hasDetails: true,
        },
        {
            title: 'Authors',
            details: authors,
            hasSubtitle: false,
            hasDetails: true,
        },
        {
            title: 'Genres',
            details: genres,
            hasSubtitle: false,
            hasDetails: true,
        },
    ]

    return (
        <div className={classes.root}>
            {
                details.map(({ title, subTitle, details, hasSubtitle, hasDetails }, index) => (
                    <Accordion_ key={ index }>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>{ title }</Typography>
                            {
                                hasSubtitle && (
                                    <Typography className={classes.secondaryHeading}>
                                        { 
                                            !subTitle ? <TextContentLoader variant='subtitle1' /> : subTitle
                                        }
                                    </Typography>
                                )
                            }
                        </AccordionSummary>
                        {
                            hasDetails && (
                                <AccordionDetails>
                                    {
                                        !details 
                                            ? (
                                                <>
                                                    <TextContentLoader />
                                                    <TextContentLoader />
                                                    <TextContentLoader />
                                                </>
                                            )
                                            : <Typography className={ classes.details }>{ details }</Typography>
                                    }
                                </AccordionDetails>
                            )
                        }
                    </Accordion_>
                ))
            }
        </div>
    );
}

export default ComingSoonMovieAccordion