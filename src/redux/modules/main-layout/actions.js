import ACTION_TYPES from './action.types';


const { 
    TOGGLE_DRAWER, 
    TOGGLE_VIDEO_MANAGEMENT, 
    SELECT_VIDEO_MANAGEMENT_AUTHORS,
    SELECT_VIDEO_MANAGEMENT_CASTS,
    SELECT_VIDEO_MANAGEMENT_DIRECTORS,
    SELECT_VIDEO_MANAGEMENT_GENRES, 
    SELECT_VIDEO_MANAGEMENT_VIDEOS,
    TOGGLE_SECOND_LIST_ITEM,
    SELECT_DASHBOARD } = ACTION_TYPES;


export const toggleDrawer = () => ({
    type: TOGGLE_DRAWER
});

/**
 * Video Management
 */
export const toggleVideoManagement = () => ({
    type: TOGGLE_VIDEO_MANAGEMENT
});

export const selectVideoManagementAuthors = () => ({
    type: SELECT_VIDEO_MANAGEMENT_AUTHORS
});

export const selectVideoManagementCasts = () => ({
    type: SELECT_VIDEO_MANAGEMENT_CASTS
});

export const selectVideoManagementDirectors = () => ({
    type: SELECT_VIDEO_MANAGEMENT_DIRECTORS
});

export const selectVideoManagementGenres = () => ({
    type: SELECT_VIDEO_MANAGEMENT_GENRES
});

export const selectVideoManagementVideos = () => ({
    type: SELECT_VIDEO_MANAGEMENT_VIDEOS
});


/**
 * 
 */
export const toggleSecondListItem = () => ({
    type: TOGGLE_SECOND_LIST_ITEM
});

export const selectDashboard = () => ({
    type: SELECT_DASHBOARD
});