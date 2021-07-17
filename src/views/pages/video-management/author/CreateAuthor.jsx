import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import * as AUTHOR_ACTION from './../../../../redux/modules/author/actions'; 
import { selectAuthor } from './../../../../redux/modules/author/selector';
import Button from '@material-ui/core/Button'


const CreateAuthor = ({ AUTHOR }) => 
{
    const dispatch = useDispatch();

    const [ author, setAuthor ] = useState(AUTHOR.author);

    const handleClickCreateAuthor = () => {
        dispatch(AUTHOR_ACTION.createAuthorStart({
            pseudonym: 'None',
            birth_name: 'YEPS',
            gender: 'Male',
            height_in_cm: 159.5,
            biographical_information: 'Bio not applicable',
            date_of_birth: '1998-12-22',
            enabled: false,
        }));
    }

    useEffect(() => {
        return () => {
            setAuthor(AUTHOR.author);
        }
    }, []);

    return (
        <>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={ handleClickCreateAuthor }
                disabled={ AUTHOR.isLoading }
            >
                Save
            </Button>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    AUTHOR: selectAuthor
});

export default connect(mapStateToProps)(CreateAuthor)
