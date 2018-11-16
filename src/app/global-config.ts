interface AuthConfiguration {
    clientID: string,
    domain: string,
    callbackURL: string,
    audience: string,
    redirectUri: string,
    responseType : string,
    scope: string,
    connection: string,
    sighupURL: string,
    forgetPasswordURL: string
}


export const FIREBASE_CONFIG = {
    URL: '/PostJob',
    PostJob: 'PostJob',
    UserDetails: 'UserDetails',
    UserProfile: 'UserProfile',
    OrderByPostJob: 'JobTitle',
    AddedSucessfully: 'Added Successfully',
    UpdatedSucessfully: 'Updated Successfully',
    DeletedSucessfully: 'Deleted Successfully',
    PostJobId: 'id',
    NewUpdatePostJob: '/newupdatePostJob',
    UploadPath: '/uploads',
    TotalFile: '100000000'
}

export const SEARCH_CONFIG = {
    Keyword: 'keyword',
    Location: 'location',
    ALGOLIA_APP_ID: '8I5VGLVBT1',
    ALGOLIA_API_KEY: '378eba06830cc91d1dad1550dd4a5244',
    INDEX_NAME: 'PostJob',
    PROTOCOLS:'https:',
    ALGOLIA_FUNCTION_URL: 'https://us-central1-jobsite-c8333.cloudfunctions.net/addFirestoreDataToAlgolia'
}

export const AUTH_CONFIG: AuthConfiguration = {
    clientID: '3IAu4y82T3H0pG2B1vVgHcQsLqTJgsix',
    domain: 'macgain.auth0.com',

    //clientID: '6I0zQ4RDSfcIx1u6jQSpviVcuxkfr5DP',
    //domain: 'sumitdey.auth0.com',

    // You may need to change this!
    //callbackURL: 'http://macgain.com/dist/callback',  // production
    callbackURL: 'http://localhost:4200/callback',

    audience: 'https://macgain.auth0.com/userinfo',


    //redirectUri: 'http://macgain.com/dist/',       // production
    redirectUri: 'http://localhost:4200/',


    responseType: 'token id_token',
    //scope: 'openid profile',
    scope: 'openid profile read:messages write:messages',
    connection: 'Username-Password-Authentication' ,
    sighupURL: 'https://macgain.auth0.com/dbconnections/signup',
    forgetPasswordURL: 'https://macgain.auth0.com/dbconnections/change_password'
};
