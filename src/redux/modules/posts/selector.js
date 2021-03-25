import { createSelector } from 'reselect';

const getPosts = state => state.post.posts;

export const selectPosts = createSelector(
    [getPosts],
    posts => posts
);