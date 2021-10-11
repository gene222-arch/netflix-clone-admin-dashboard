import React,{ useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Actions */
import * as EMPLOYEE_ACTION from './../../../redux/modules/employee/actions'; 
import { selectEmployee } from './../../../redux/modules/employee/selector';
import StyledNavLink from './../../../components/styled-components/StyledNavLink';
import PATH from './../../../routes/path';
import MaterialTable from './../../../components/styled-components/MaterialTable';
import MaterialTableActionButton from './../../../components/MaterialTableActionButton';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';

const avatarIndexUseStyles = makeStyles(theme => ({
    avatarImg: {
        objectFit: 'contain'
    }
}));

const Employee = ({ EMPLOYEE }) => 
{
    const classes = avatarIndexUseStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        // {
        //     title: 'Avatar', 
        //     field: 'avatar_path',
        //     render: ({ id, avatar_path }) => (
        //         <StyledNavLink 
        //             to={ PATH.UPDATE_EMPLOYEE.replace(':id', id) } 
        //             text={ <img className={ classes.avatarImg } src={ avatar_path } width='100' height='120' /> } 
        //         /> 
        //     )
        // },
        { 
            title: 'Birth Name', 
            field: 'birth_name',
            render: ({ id, first_name, last_name }) => (
                <StyledNavLink 
                    to={ PATH.UPDATE_EMPLOYEE.replace(':id', id) } 
                    text={ `${ first_name } ${ last_name }` } 
                />
            ) 
        },
        {
            title: 'Email address',
            field: 'email'
        },
        {
            title: 'Phone',
            field: 'phone'
        }
    ];

    const [ ids, setIds ] = useState([]);
    
    const handleClickDestroyEmployee = () => {
        setIds([]);
        dispatch(EMPLOYEE_ACTION.destroyEmployeesStart({ ids }));
    }

    useEffect(() => {
        dispatch(EMPLOYEE_ACTION.fetchAllEmployeesStart());

        return () => {
            setIds([]);
        }
    }, []);

    return (
        <Container maxWidth="lg">
            <MaterialTable 
                columns={ columns }      
                data={ EMPLOYEE.employees }  
                title={ 
                    <MaterialTableActionButton
                        ids={ ids } 
                        addButtonCallback = { () => history.push(PATH.CREATE_EMPLOYEE) }
                        destroyButtonCallback={ handleClickDestroyEmployee }
                    /> 
                }
                isLoading={ EMPLOYEE.isLoading }
                onSelectionChange={ rows => setIds(rows.map(({ id }) => id)) }
            />
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    EMPLOYEE: selectEmployee
});

export default connect(mapStateToProps)(Employee)