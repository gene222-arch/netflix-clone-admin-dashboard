const PATH = 
{
    ACCESS_RIGHT: '/access-rights',
    CREATE_ACCESS_RIGHT: '/access-rights/create',
    UPDATE_ACCESS_RIGHT: '/access-rights/:id/update',
    ASSIGN_ACCESS_RIGHT: '/access-rights/:id/assign',
    DASHBOARD: '/',
    FORGOT_PASSWORD: '/auth/forgot-password/email',
    LOGIN: '/auth/sign-in',
    LOGOUT: '/logout',
    GET_STARTED: '/auth/get-started',
    ALLOW_ACCESS_TO_LOCATION: '/auth/allow-access-to-location',
    REGISTER: '/auth/create-an-account',
    RESET_PASSWORD: '/auth/forgot-password/reset',
    VERIFIY_EMAIL: '/auth/email/verify-email/:id/:hash',

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
    VIEW_COMING_SOON_MOVIE: '/video-management/coming-soon-movies/:id',
    CREATE_TRAILER: '/video-management/coming-soon-movies/:id/create-trailer',
    UPDATE_TRAILER: '/video-management/coming-soon-movies/:id/trailers/:trailerID',

    USER_PROFILE: '/profiles',
    PROFILE_HOME_PAGE: '/'
};


export default PATH;