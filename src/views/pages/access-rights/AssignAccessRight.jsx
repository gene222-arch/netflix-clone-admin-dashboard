import React, { useState, useEffect, useMemo } from 'react'
import * as ACCESS_RIGHT_ACTION from './../../../redux/modules/access-rights/actions'
import * as ACCESS_RIGHT_API from './../../../services/access-rights/access.rights'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { IconButton, Card, CardContent, CardHeader, Typography, Checkbox, ListSubheader, List, ListItem, ListItemText, Button } from '@material-ui/core'
import { createStructuredSelector } from 'reselect';
import { selectAccessRight } from './../../../redux/modules/access-rights/selector';
import { connect, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BoxContentLoader from './../../../components/content-loader/BoxContentLoader';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PATH from './../../../routes/path';
import { selectEmployee } from './../../../redux/modules/employee/selector';
import * as EMPLOYEE_ACTION from './../../../redux/modules/employee/actions';

const assignAccessRightUseStyles = makeStyles(theme => ({
    checkBoxContainer: {
        width: '100%'
    },
    checkCircleIcon: {
        marginRight: '0.5rem',
        fontSize: '0.9rem',
        color: green[400]
    },
    permissionsContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.5rem'
    }
}));

const TO_ASSIGN_PROPS = { 
    role_id: '', 
    ids: [] 
};


const AssignAccessRight = ({ ACCESS_RIGHT, EMPLOYEE }) => 
{
    const classes = assignAccessRightUseStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();


    const hasEmployeesWithNoRoles = useMemo(() => {
            const result = EMPLOYEE.employees.filter(employee => !employee.roles_count).length;
            return Boolean(result);
    }, [EMPLOYEE.employees])

    const currentAccessRight = ACCESS_RIGHT.accessRights.find(({ id: accessRightId }) => accessRightId === parseInt(id));

    const employeeIds = useMemo(() => currentAccessRight.employees.map(({ id }) => id), []);

    const [ isFetching, setIsFetching ] = useState(true);
    const [ toAssign, setToAssign ] = useState({ role_id: id, ids: employeeIds });
    const [ accessRight, setAccessRight ] = useState(ACCESS_RIGHT.accessRight);

    const handeClickAssignRole = () => dispatch(ACCESS_RIGHT_ACTION.assignRoleStart(toAssign));

    const handleChange = (e) =>
    {
        const { value } = e.target;
        const employeeId = parseInt(value);

        const isEmployeeSelected = toAssign.ids.find(id => id === employeeId);

        !isEmployeeSelected
            ? setToAssign({ ...toAssign, ids: [ ...toAssign.ids, employeeId ] })
            : setToAssign({ ...toAssign, ids: toAssign.ids.filter(id => id !== employeeId) });
    }
 
    const onLoadFetchAccessRightById = async () => 
    {
        try {
            const { status, data } = await ACCESS_RIGHT_API.findByIDAsync(id);

            if (status === 'success') {
                setAccessRight(data);
            }

        } catch ({ message }) {}
    }

    const onLoadApiRequests = async () => 
    {
        try {
            dispatch(EMPLOYEE_ACTION.fetchAllEmployeesStart());
            await onLoadFetchAccessRightById();
        } catch ({ message }) {
            console.log(message);
        }

        setIsFetching(false);
    }

    useEffect(() => 
    {
        onLoadApiRequests();

        return () => {
            setAccessRight(ACCESS_RIGHT.accessRight);
            setToAssign(TO_ASSIGN_PROPS);
            setIsFetching(false);
        }
    }, []);

    if (isFetching) {
        return (
            <Container maxWidth="lg">
                <BoxContentLoader width={ '100%' } height={ 200 } />
                <BoxContentLoader width={ '100%' } height={ 300 } />
            </Container>
        )
    }

    return (
       <Container maxWidth="lg">
           <Grid container spacing={1}>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Card>
                        <CardHeader 
                            title={
                                <IconButton onClick={ () => history.push(PATH.ACCESS_RIGHT) }>
                                    <ArrowBackIcon />
                                </IconButton>
                            } 
                            action={
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={ handeClickAssignRole }
                                    disabled={ ACCESS_RIGHT.isLoading }
                                >
                                    Assign
                                </Button>
                            }
                        />
                        <CardHeader title={
                            <Typography variant="h4" color="initial" align='center'>
                                { accessRight.role }
                            </Typography>
                        } />
                        <CardContent>
                            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                Permissions
                            </Typography>
                            {
                                accessRight.permissions.map(({ name }, index) => (
                                    <div key={ index } className={ classes.permissionsContainer }>
                                        <CheckCircleIcon className={ classes.checkCircleIcon } />
                                        <Typography variant="subtitle1" color="initial">
                                            { name }
                                        </Typography>
                                    </div>
                                ))
                            }
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Card>
                        <CardContent>
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    !hasEmployeesWithNoRoles
                                        ? (
                                            <Typography 
                                                variant="h6" 
                                                color="textSecondary"
                                                align='center'
                                            >
                                                All employee`s had already given a role
                                            </Typography>
                                        )
                                        : <ListSubheader component="div" id="nested-list-subheader">Employees</ListSubheader>
                                }
                                className={classes.root}
                            >
                                <Grid container spacing={1}>
                                {
                                    EMPLOYEE.employees.map(({ id, first_name, last_name, email, roles, roles_count }, index) => 
                                    {
                                        return (roles[0]?.name === currentAccessRight.name || !roles_count) && (
                                            <Grid key={ index } item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                                                <ListItem>
                                                    <FormControlLabel
                                                        className={ classes.checkBoxContainer }
                                                        control={ 
                                                            <Checkbox 
                                                                name='ids' 
                                                                checked={ toAssign.ids.includes(id) } 
                                                                onChange={ handleChange } 
                                                                value={ id } 
                                                            /> 
                                                        }
                                                        label={ 
                                                            <ListItemText 
                                                                primary={ `${ first_name } ${ last_name }` } 
                                                                secondary={ email } 
                                                            /> 
                                                        }
                                                    />
                                                </ListItem>
                                            </Grid>
                                        )
                                    })
                                }
                                </Grid>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
           </Grid>
       </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    ACCESS_RIGHT: selectAccessRight,
    EMPLOYEE: selectEmployee
});

export default connect(mapStateToProps)(AssignAccessRight)
