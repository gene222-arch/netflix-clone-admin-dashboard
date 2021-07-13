import ACTION_TYPES from './action.types';


const { 
    TOGGLE_DRAWER, 

    TOGGLE_VIDEO_MANAGEMENT, 
    SELECT_VIDEO_MANAGEMENT_GENRES,
    SELECT_VIDEO_MANAGEMENT_CASTS,
    SELECT_VIDEO_MANAGEMENT_VIDEOS,
    TOGGLE_SECOND_LIST_ITEM,
    SELECT_DASHBOARD
} = ACTION_TYPES;

const DEFAULT_STATE = {
    dashboard: false,
    drawer: true,
    videoManagement: false,
    videoManagementGenres: false,
    videoManagementCasts: false,
    videoManagementVideos: false,
    secondListItem: false,
};

const initialState = {
    dashboard: false,
    drawer: false,
    videoManagement: false,
    videoManagementGenres: false,
    videoManagementCasts: false,
    videoManagementVideos: false,
    secondListItem: false,

    currentSelectedItem: 'Dashboard',
    currentSelectedDropdown: '',
    currentSelectedDropdownItem: '',
};

export default (state = initialState, { type, payload }) => 
{
    const { 
        currentSelectedItem, 
        currentSelectedDropdown, 
        currentSelectedDropdownItem, 
        dashboard,
        drawer, 
        videoManagement, 
        videoManagementGenres,
        videoManagementCasts, 
        videoManagementVideos,
        secondListItem } = state;

    switch (type) 
    {
        case TOGGLE_DRAWER:
            return { 
                ...state,
                ...DEFAULT_STATE, 
                drawer: !drawer,
                /** History */
                [currentSelectedDropdown]: !drawer,
                [currentSelectedDropdownItem]: !drawer,
            };

        case TOGGLE_VIDEO_MANAGEMENT: 
            return { 
                ...DEFAULT_STATE,
                videoManagement: !videoManagement,
                /** History */
                [currentSelectedDropdownItem]: !videoManagement,
                currentSelectedItem,  
                currentSelectedDropdownItem,
                currentSelectedDropdown: 'videoManagement'
            };

        case SELECT_VIDEO_MANAGEMENT_GENRES: 
            return { 
                ...DEFAULT_STATE, 
                videoManagement: true,
                videoManagementGenres: !videoManagementGenres, 
                /** History */
                currentSelectedItem: 'Genres',
                currentSelectedDropdownItem: 'videoManagementGenres',
                currentSelectedDropdown: 'videoManagement',
            };

        case SELECT_VIDEO_MANAGEMENT_CASTS: 
            return { 
                ...DEFAULT_STATE, 
                videoManagement: true,
                videoManagementCasts: !videoManagementCasts, 
                /** History */
                currentSelectedItem: 'Casts',
                currentSelectedDropdownItem: 'videoManagementCasts',
                currentSelectedDropdown: 'videoManagement',
            };

        case SELECT_VIDEO_MANAGEMENT_VIDEOS: 
            return { 
                ...DEFAULT_STATE, 
                videoManagement: true,
                videoManagementVideos: !videoManagementVideos, 
                /** History */
                currentSelectedItem: 'Videos',
                currentSelectedDropdownItem: 'videoManagementVideos',
                currentSelectedDropdown: 'videoManagement',
            };

        case TOGGLE_SECOND_LIST_ITEM: 
            return { 
                ...DEFAULT_STATE, 
                secondListItem: !secondListItem,
                /** History */
                currentSelectedItem,
                currentSelectedDropdown: 'secondListItem'
            };
        
        case SELECT_DASHBOARD: 
            return {
                ...DEFAULT_STATE, 
                dashboard: true,
                currentSelectedItem: 'Dashboard',
            }

        default:
            return state;
    }
}
