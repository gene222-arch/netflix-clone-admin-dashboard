import React, { useState, useEffect } from 'react'
import * as ACCESS_RIGHT_API from './../../../services/access-rights/access.rights'
import * as USER_API from './../../../services/users/user'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Card, CardContent, CardHeader, Typography, Checkbox, ListSubheader, List, ListItem, ListItemText, Button } from '@material-ui/core'
import { createStructuredSelector } from 'reselect';
import { selectAccessRight } from './../../../redux/modules/access-rights/selector';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Colors from './../../../constants/Colors';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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


const AssignAccessRight = ({ ACCESS_RIGHT }) => 
{
    const classes = assignAccessRightUseStyles();
    const { id } = useParams();

    const [ toAssign, setToAssign ] = useState({ role_id: id, user_ids: [] });
    const [ accessRight, setAccessRight ] = useState(ACCESS_RIGHT.accessRight);
    const [ users, setUsers ] = useState([]);

    const handleChange = (e) =>
    {
        const { value } = e.target;
        const userId = parseInt(value);

        const isUserChecked = toAssign.user_ids.find(id => id === userId);

        !isUserChecked
            ? setToAssign({ ...toAssign, user_ids: [ ...toAssign.user_ids, userId ] })
            : setToAssign({ ...toAssign, user_ids: toAssign.user_ids.filter(id => id !== userId) });
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

    const onLoadFetchUsers = async () => 
    {
        try {
            const { data } = await USER_API.fetchAllAsync();
            setUsers(data);
        } catch ({ message }) {}
    }

    const onLoadApiRequests = () => {
        onLoadFetchUsers();
        onLoadFetchAccessRightById();
    }

    useEffect(() => 
    {
        onLoadApiRequests();

        return () => {
            setAccessRight(ACCESS_RIGHT.accessRight);
        }
    }, [])

    return (
       <Container maxWidth="lg">
           <Grid container spacing={1}>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Card>
                        <CardHeader 
                            title={ accessRight.role } 
                            action={
                                <Button variant="contained" color="primary">
                                    Assign
                                </Button>
                            }
                        />
                        <CardContent>
                            {
                                accessRight.permissions.map(({ name }, index) => (
                                    <div className={ classes.permissionsContainer }>
                                        <CheckCircleIcon className={ classes.checkCircleIcon } />
                                        <Typography key={ index } variant="subtitle1" color="initial">
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
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Users
                                    </ListSubheader>
                                }
                                className={classes.root}
                            >
                                <Grid container spacing={1}>
                                {
                                    users.map(({ id, first_name, last_name, email }, index) => (
                                        <Grid item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                                            <ListItem>
                                                <FormControlLabel
                                                    className={ classes.checkBoxContainer }
                                                    key={ index }
                                                    control={ 
                                                        <Checkbox 
                                                            name='user_ids' 
                                                            checked={ toAssign.user_ids.includes(id) } 
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
                                    ))
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
    ACCESS_RIGHT: selectAccessRight
});

export default connect(mapStateToProps)(AssignAccessRight)
