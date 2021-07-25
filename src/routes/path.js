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
    VIDEO_MANAGEMENT_MOVIES: '/video-management/movies',
    VIDEO_MANAGEMENT_COMING_SOON_MOVIES: '/video-management/coming-soon-movies',

    CREATE_AUTHOR: '/video-management/authors/create-new-author',
    UPDATE_AUTHOR: '/video-management/authors/:id/update-author',

    CREATE_CAST: '/video-management/casts/create-new-cast',
    UPDATE_CAST: '/video-management/casts/:id/update-cast',

    CREATE_DIRECTOR: '/video-management/directors/create-new-director',
    UPDATE_DIRECTOR: '/video-management/directors/:id/update-director',

    CREATE_GENRE: '/video-management/genres/create-new-genre',
    UPDATE_GENRE: '/video-management/genres/:id/update-genre',

    CREATE_MOVIE: '/video-management/movies/create-new-movie',
    UPDATE_MOVIE: '/video-management/movies/:id/update-movie',

    CREATE_COMING_SOON_MOVIE: '/video-management/coming-soon-movies/create-new-movie',
    UPDATE_COMING_SOON_MOVIE: '/video-management/coming-soon-movies/:id/update-movie',
};


export default PATH;