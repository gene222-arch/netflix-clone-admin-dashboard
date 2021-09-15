import React, { useState, useEffect, useMemo } from 'react'
import * as ACCESS_RIGHT_ACTION from './../../../redux/modules/access-rights/actions'
import * as ACCESS_RIGHT_API from './../../../services/access-rights/access.rights'
import * as USER_API from './../../../services/users/user'
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
import ImageContentLoader from './../../../components/content-loader/ImageContentLoader';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PATH from './../../../routes/path';


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
    user_ids: [] 
};


const AssignAccessRight = ({ ACCESS_RIGHT }) => 
{
    const classes = assignAccessRightUseStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const userIds = useMemo(() => 
    {
        console.log('USER IDS RENDER');
        const ids = ACCESS_RIGHT
                        .accessRights
                        .find(({ id: accessRightId }) => accessRightId === parseInt(id))
                        .users
                        .map(({ id }) => id);
        
        return ids;
    }, []);

    const [ isFetching, setIsFetching ] = useState(true);
    const [ toAssign, setToAssign ] = useState({ role_id: id, user_ids: userIds });
    const [ accessRight, setAccessRight ] = useState(ACCESS_RIGHT.accessRight);
    const [ users, setUsers ] = useState([]);

    const handeClickAssignRole = () => dispatch(ACCESS_RIGHT_ACTION.assignRoleStart(toAssign));

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

    const onLoadApiRequests = async () => 
    {
        await onLoadFetchUsers();
        await onLoadFetchAccessRightById();
        setIsFetching(false);
    }

    useEffect(() => 
    {
        onLoadApiRequests();

        return () => {
            setAccessRight(ACCESS_RIGHT.accessRight);
            setToAssign(TO_ASSIGN_PROPS);
            setUsers([]);
            setIsFetching(false);
        }
    }, []);

    if (isFetching) {
        return (
            <Container maxWidth="lg">
                <ImageContentLoader width={ '100%' } height={ 200 } />
                <ImageContentLoader width={ '100%' } height={ 300 } />
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
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Users
                                    </ListSubheader>
                                }
                                className={classes.root}
                            >
                                <Grid container spacing={1}>
                                {
                                    users.map(({ id, first_name, last_name, email }, index) => (
                                        <Grid key={ index } item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                                            <ListItem>
                                                <FormControlLabel
                                                    className={ classes.checkBoxContainer }
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
