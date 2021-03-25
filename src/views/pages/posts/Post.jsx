import React, { useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Material UI */
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

/** Posts */
import { selectPosts } from './../../../redux/modules/posts/selector';
import * as POST from './../../../redux/modules/posts/actions'

/** Posts Components */
import PostList from './PostList';


const POST_DEFAULT_PROPS = 
{
    title: '',
    body: ''
};


const Post = ({ posts }) => 
{
    const dispatch = useDispatch();

	const [post, setPost] = useState(POST_DEFAULT_PROPS);

    // State
	const handleChangePost = (e) => setPost({...post, [e.target.name]: e.target.value});

    // Server
    const handleClickDestroy = async (id) => dispatch(POST.destroy({ id }));

	const handleClickCreatePost = () =>  dispatch(POST.create(post));

    useEffect(() => {
        dispatch(POST.index());
    }, []);


	return (
		<>
			<Typography variant="h2" color="initial">
				Posts
			</Typography>
            
            <Grid container spacing={1} direction='column' alignItems='center'>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                        name='title'
                        label='Title'
                        fullWidth
                        value={post.title} 
                        onChange={handleChangePost}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                        name='body'
                        label='Body'
                        fullWidth
                        value={post.body} 
                        onChange={handleChangePost}
                    />
                </Grid>
                <Button 
                    variant="contained" 
                    color="default"
                    onClick={handleClickCreatePost}
                >
                    +
                </Button>
            </Grid>
        
            <PostList 
                posts={posts}
                handleClickDestroy={handleClickDestroy}
            />
        </>
	)
}

const mapStateToProps = createStructuredSelector({
    posts: selectPosts 
});


export default connect(mapStateToProps, null)(Post);
