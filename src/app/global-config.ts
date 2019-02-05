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

export const CONTENT_CONFIG = {
    url: 'https://cdn.contentful.com/spaces/',
    //Authorization: 'Bearer 05300429693296150805e8fe5f4f93d6214159d7ee5c448a57e0e0b8029479a1',
    CntentType: 'application/json',
    space: 'c9x3vp5xw3hj',
    accessToken: 'cac67210ab3dcd35af8516e76d25f4288f057b4c12de71d1e40dc3d63704ed7e',

    PageBlockSectionFields: 'fields.mainHeader,fields.subHeader,fields.pageText,fields.pageImageUrl,fields.imageUrlCaption,fields.detailPageUrl',
    //PageBlockSectionFields: 'fields.mainHeader,fields.bodyTextHomePage,fields.homePageImageUrl,fields.homePageImageUrlCaption,fields.moreUrl',
    PageBlockSectionFieldsDetailsFields: 'fields.mainHeader,fields.subHeader,fields.detailText,fields.detailPageImageUrl,fields.detailPageImageCaption',

    publishQueryString: {'fields.publishOnThePage': true},
    //imageQueryString: {'fields.showField': true, 'fields.pageName':'HOME', 'fields.pageBlockName':'IMAGESECTION'},
    imageQueryString: {'fields.pageName':'HOME', 'fields.pageBlockName':'IMAGESECTION', 'fields.publishOnThePage':true},
    techNewsQueryString: {'fields.pageName':'HOME', 'fields.pageBlockName':'TECHNEWS', 'fields.publishOnThePage':true},
    advertiseQueryString: {'fields.pageName':'HOME', 'fields.pageBlockName':'ADVERTISE', 'fields.publishOnThePage':true},

    contentTypeIds: {
        PageBlockSection:'pageBlockSection'
      }

}

export const FIREBASE_CONFIG = {
    URL: '/PostJob',
    PostJob: 'PostJob',
    UserDetails: 'UserDetails',
    UserProfile: 'UserProfile',
    UploadResume: 'UploadResume',
    Country: 'Country',
    State: 'State',
    OrderByPostJob: 'JobTitle',
    AddedSucessfully: 'Added Successfully',
    UpdatedSucessfully: 'Updated Successfully',
    DeletedSucessfully: 'Deleted Successfully',
    PostJobId: 'id',
    NewUpdatePostJob: '/newupdatePostJob',
    UploadPath: '/uploads',
    TotalFile: '10000000',
    EmployerPostJob: 'EmployerPostJob',
    EmployerResumeSearch: 'EmployerResumeSearch',
    EmployerPowerUser: 'EmployerPowerUser'
}

export const SEARCH_CONFIG = {
    Keyword: 'keyword',
    Location: 'location',
    ALGOLIA_APP_ID: '8I5VGLVBT1',
    ALGOLIA_API_KEY: '378eba06830cc91d1dad1550dd4a5244',
    INDEX_NAME: 'PostJob',
    INDEX_NAME_PROFILE: 'UserProfile',
    PROTOCOLS:'https:',
    ALGOLIA_FUNCTION_URL: 'https://us-central1-jobsite-c8333.cloudfunctions.net/addFirestorePostJobDataToAlgolia',
    LIST_JOB_DESC_WIDTH: 500,
    PAGE_SIZE: 5,
    CURRENT_PAGE: 1
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
