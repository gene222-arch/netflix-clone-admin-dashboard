import React from 'react'

/** Material UI */
import { List, ListItem, ListItemText } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';


const PostList = ({ posts = [], handleClickDestroy }) => 
{
    return posts.length > 0 && (
        <>
            <List component="nav">
            {
                posts.map((post, index) => (
                    <div key={index}>
                        <Divider />
                        <ListItem>
                            <ListItemText 
                                primary={`# ${ post.id }`} 
                                secondary={ post.title }
                            />
                            <ListItemText 
                                primary={`${ post.body }`} 
                                secondary='Description'
                            />
                        </ListItem>
                    
                        <ListItem 
                            button
                            onClick={() => handleClickDestroy(post.id)}
                        >
                            <ListItemText primary='Delete' />
                        </ListItem>
                    </div>
                ))
            }
            </List>
        </>
    )
}

export default PostList
