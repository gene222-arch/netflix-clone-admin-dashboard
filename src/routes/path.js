const PATH = 
{
    DASHBOARD: '/',
    FORGOT_PASSWORD: '/auth/forgot-password/email',
    LOGIN: '/auth/sign-in',
    LOGOUT: '/logout',
    REGISTER: '/auth/create-an-account',
    RESET_PASSWORD: '/auth/forgot-password/reset',

    VIDEO_MANAGEMENT_AUTHOR: '/video-management/authors',
    VIDEO_MANAGEMENT_CAST: '/video-management/casts',
    VIDEO_MANAGEMENT_DIRECTOR: '/video-management/directors',
    VIDEO_MANAGEMENT_GENRE: '/video-management/genres',
    VIDEO_MANAGEMENT_VIDEO: '/video-management/videos',

    CREATE_AUTHOR: '/authors/create-new-author',
    UPDATE_AUTHOR: '/authors/:id/update-author',

    CREATE_CAST: '/casts/create-new-cast',
    UPDATE_CAST: '/casts/:id/update-cast',
};


export default PATH;