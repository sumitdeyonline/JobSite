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
    OrderByPostJob: 'JobTitle',
    AddedSucessfully: 'Added Successfully',
    UpdatedSucessfully: 'Updated Successfully',
    DeletedSucessfully: 'Deleted Successfully',
    PostJobId: 'id',
    NewUpdatePostJob: '/newupdatePostJob'
}

export const SEARCH_CONFIG = {
    Keyword: 'keyword',
    Location: 'location'
}

export const AUTH_CONFIG: AuthConfiguration = {
    clientID: '3IAu4y82T3H0pG2B1vVgHcQsLqTJgsix',
    domain: 'macgain.auth0.com',
    
    //clientID: '6I0zQ4RDSfcIx1u6jQSpviVcuxkfr5DP',
    //domain: 'sumitdey.auth0.com',
    
    // You may need to change this!
    //callbackURL: 'https://mentalhealthmatter.com/dist/callback',  // production
    callbackURL: 'http://localhost:4200/callback',

    audience: 'https://macgain.auth0.com/userinfo',


    //redirectUri: 'https://mentalhealthmatter.com/dist/',       // production
    redirectUri: 'http://localhost:4200/',
    

    responseType: 'token id_token',
    //scope: 'openid profile',
    scope: 'openid profile read:messages write:messages',
    connection: 'Username-Password-Authentication' ,
    sighupURL: 'https://macgain.auth0.com/dbconnections/signup',
    forgetPasswordURL: 'https://macgain.auth0.com/dbconnections/change_password'
};