import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import * as AUTHOR_ACTION from '../../../../redux/modules/author/actions'; 
import { selectAuthor } from '../../../../redux/modules/author/selector';
import Button from '@material-ui/core/Button'


const UpdateAuthor = ({ AUTHOR, match }) => 
{
    const { id } = match.params; 
    const dispatch = useDispatch();

    const [ author, setAuthor ] = useState(AUTHOR.author);

    const handleClickUpdateAuthor = () => {
        dispatch(AUTHOR_ACTION.updateAuthorStart({
            pseudonym: 'None',
            birth_name: 'Birth name',
            gender: 'Male',
            height_in_cm: 100.5,
            biographical_information: 'Bio not applicable',
            date_of_birth: '2021-12-22',
            enabled: false,
        }));
    }

    const fetchAuthorByID = () => {
        const findAuthor = AUTHOR.authors.find(author => author.id === id);
        setAuthor(findAuthor);
    }

    useEffect(() => {
        fetchAuthorByID();
        return () => {
            setAuthor(AUTHOR.author);
        }
    }, []);

    return (
        <>
            <Button variant="text" color="default" onClick={ handleClickUpdateAuthor }>
                Save
            </Button>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTHOR: selectAuthor
});

export default connect(mapStateToProps)(UpdateAuthor)
