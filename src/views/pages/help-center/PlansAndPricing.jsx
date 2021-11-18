import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core';

const plansAndPricingUseStyles = makeStyles(theme => ({
    arrowBackLabel: {
        paddingLeft: '0.5rem',
        fontSize: '0.85rem'
    }
}));

const createData = (name, basic, standard, premium) => ({ name, basic, standard, premium })

const rows = [
  createData('Monthly cost (Philippine Peso)', 100, 200, 600),
  createData('Unlimited movies and TV shows', true, true, true),
  createData('Number of Profiles', 2, 4, 5),
  createData('Customizable Profile Avatar', false, false, true)
];

const PlansAndPricing = () => 
{
    const classes = plansAndPricingUseStyles();
    const history = useHistory();

    return (
        <Container maxWidth="lg">
            <IconButton onClick={ () => history.goBack() }>
                <ArrowBack />
            </IconButton>
            <small className={ classes.arrowBackLabel }>Go back</small>
            <Grid container spacing={1}>
                <Grid item xs={ 10 } sm={ 10 } md={ 10 } lg={ 10 }>
                    <Typography variant="h3" color="initial" gutterBottom>Plans And Pricing</Typography>
                    <Typography variant="body1" color="initial" gutterBottom>
                        Flicklify offers a variety of plans to meet your needs. The plan you choose will determine the amazing featues that will satisfy your streaming needs.
                    </Typography>
                    <Typography variant="body1" color="initial" gutterBottom>
                        With all of our plans, you can watch unlimited movies and TV shows.
                    </Typography>
                </Grid>
                <Grid item xs={ 10 } sm={ 10 } md={ 10 } lg={ 10 }>
                    <TableContainer component={ Paper }>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Features</TableCell>
                                <TableCell>Basic</TableCell>
                                <TableCell>Standard</TableCell>
                                <TableCell>Premium</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(({ name, basic, standard, premium }) => (
                                    <TableRow
                                        key={name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        
                                    >
                                        <TableCell component="th" scope="row">{name}</TableCell>
                                        {
                                            typeof basic === 'number' 
                                                ? (
                                                    <>
                                                        <TableCell component="th" scope="row">{ basic }</TableCell>
                                                        <TableCell component="th" scope="row">{ standard }</TableCell>
                                                        <TableCell component="th" scope="row">{ premium }</TableCell>
                                                    </>
                                                )
                                                : (
                                                    <>
                                                        <TableCell component="th" scope="row">{ basic && <CheckIcon /> }</TableCell>
                                                        <TableCell component="th" scope="row">{ standard && <CheckIcon /> }</TableCell>
                                                        <TableCell component="th" scope="row">{ premium && <CheckIcon /> }</TableCell>
                                                    </>
                                                )
                                        }
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
}

export default PlansAndPricing
