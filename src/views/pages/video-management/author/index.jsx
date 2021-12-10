import React,{ useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Actions */
import * as AUTHOR_ACTION from './../../../../redux/modules/author/actions'; 
import { selectAuthor } from './../../../../redux/modules/author/selector';
import StyledNavLink from './../../../../components/styled-components/StyledNavLink';
import PATH from './../../../../routes/path';
import MaterialTable from './../../../../components/styled-components/MaterialTable';
import MaterialTableActionButton from './../../../../components/MaterialTableActionButton';
import { useHistory } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import ToggleTrashedButton from './../../../../components/styled-components/ToggleTrashedButton';

const avatarIndexUseStyles = makeStyles(theme => ({
    avatarImg: {
        objectFit: 'contain'
    },
    toggleTrashedContainer: {
        textAlign: 'right',
        padding: '1rem'
    }
}));

const Author = ({ AUTHOR }) => 
{
    const classes = avatarIndexUseStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    const columns = [
        { title: 'id', field: 'id', hidden: true },
        {
            title: 'Avatar', 
            field: 'avatar_path',
            render: ({ id, avatar_path }) => (
                <StyledNavLink 
                    to={ PATH.UPDATE_AUTHOR.replace(':id', id) } 
                    text={ <img className={ classes.avatarImg } src={ avatar_path } width='100' height='120' /> } 
                /> 
            )
        },
        { 
            title: 'Birth Name', 
            field: 'birth_name',
            render: ({ id, birth_name }) => <StyledNavLink to={ PATH.UPDATE_AUTHOR.replace(':id', id) } text={ birth_name } /> 
        },
        { title: 'Pseudonym', field: 'pseudonym' },
        {
            title: 'Enabled',
            field: 'enabled',
            render: ({ id, enabled }) => (
                <Switch checked={ Boolean(enabled) } onChange={ () => handleClickEnabled(id) } name='enabled' />
            )
        }
    ];

    const [ ids, setIDs ] = useState([]);
    const [ areDataTrashed, setAreDataTrashed ] = useState(false);

    const handleClickToggleFilterButton = (trashedOnly) => {
        setAreDataTrashed(! trashedOnly);
        dispatch(AUTHOR_ACTION.fetchAllAuthorsStart({ trashedOnly: !trashedOnly }));
    }
    
    const handleClickDeleteAuthor = () => {
        dispatch(AUTHOR_ACTION.deleteAuthorsStart({ ids }));
        setIDs([]);
    }

    const handleClickRestoreAuthors = () => {
        dispatch(AUTHOR_ACTION.restoreAuthorsStart(ids));
        setIDs([]);
    }

    const handleClickEnabled = (id) => {
        dispatch(AUTHOR_ACTION.toggleAuthorEnabledStart({ id }));
    }

    useEffect(() => {
        dispatch(AUTHOR_ACTION.fetchAllAuthorsStart({ trashedOnly: areDataTrashed }));

        return () => {
            setIDs([]);
            setAreDataTrashed(false);
        }
    }, []);

    return (
        <Container maxWidth="lg">
            <ToggleTrashedButton onClick={ handleClickToggleFilterButton } />
            <MaterialTable 
                columns={ columns }      
                data={ AUTHOR.authors }  
                title={ 
                    <MaterialTableActionButton
                        ids={ ids } 
                        areDataTrashed={ areDataTrashed }
                        addButtonCallback = { () => history.push(PATH.CREATE_AUTHOR) }
                        deleteButtonCallback={ handleClickDeleteAuthor }
                        restoreButtonCallback={ handleClickRestoreAuthors }
                    /> 
                }
                isLoading={ AUTHOR.isLoading }
                onSelectionChange={ rows => setIDs(rows.map(({ id }) => id)) }
            />
        </Container>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTHOR: selectAuthor
});

export default connect(mapStateToProps)(Author)