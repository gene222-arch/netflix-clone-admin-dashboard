import React,{ useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Actions */
import * as AUTHOR_ACTION from './../../../../redux/modules/author/actions'; 
import { selectAuthor } from './../../../../redux/modules/author/selector';
import Typography from '@material-ui/core/Typography'
import StyledNavLink from './../../../../components/styled-components/StyledNavLink';
import PATH from './../../../../routes/path';
import MaterialTable from './../../../../components/styled-components/MaterialTable';
import MaterialTableActionButton from './../../../../components/MaterialTableActionButton';
import { useHistory } from 'react-router-dom';


const columns = [
    { title: 'id', field: 'id', hidden: true },
    { 
        title: 'Birth Name', 
        field: 'birth_name',
        render: ({ id, birth_name }) => <StyledNavLink to={ PATH.UPDATE_AUTHOR.replace(':id', id) } text={ birth_name } /> 
    },
    { title: 'Pseudonym', field: 'pseudonym' },
];

const Author = ({ AUTHOR }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const [ ids, setIDs ] = useState([]);

    
    const handleClickDeleteAuthor = () => {
        dispatch(AUTHOR_ACTION.deleteAuthorsStart({ ids }));
    }

    useEffect(() => {
        if (!AUTHOR.authors.length) {
            dispatch(AUTHOR_ACTION.fetchAllAuthorsStart());
        }
    }, []);


    return (
        <>
            <Typography variant="h4" color="initial">
                Authors Page
            </Typography>
            <MaterialTable 
                columns={ columns }      
                data={ AUTHOR.authors }  
                title={ 
                    <MaterialTableActionButton
                        ids={ ids } 
                        addButtonCallback = { () => history.push(PATH.CREATE_AUTHOR) }
                        deleteButtonCallback={ handleClickDeleteAuthor }
                    /> 
                }
                isLoading={ AUTHOR.isLoading }
                onSelectionChange={ rows => setIDs(rows.map(({ id }) => id)) }
            />
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTHOR: selectAuthor
});

export default connect(mapStateToProps)(Author)