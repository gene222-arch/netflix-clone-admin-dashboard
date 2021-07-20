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

    CREATE_AUTHOR: '/video-management/authors/create-new-author',
    UPDATE_AUTHOR: '/video-management/authors/:id/update-author',

    CREATE_CAST: '/video-management/casts/create-new-cast',
    UPDATE_CAST: '/video-management/casts/:id/update-cast',

    CREATE_DIRECTOR: '/video-management/directors/create-new-director',
    UPDATE_DIRECTOR: '/video-management/directors/:id/update-director',

    CREATE_GENRE: '/video-management/genres/create-new-genre',
    UPDATE_GENRE: '/video-management/genres/:id/update-genre',
};


export default PATH;