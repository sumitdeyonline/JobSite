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

    CntentType: 'application/json',
    space: '',
    accessToken: '',

    PageBlockSectionFields: 'fields.mainHeader,fields.subHeader,fields.pageText,fields.pageImageUrl,fields.imageUrlCaption,fields.detailPageUrl',
    //PageBlockSectionFields: 'fields.mainHeader,fields.bodyTextHomePage,fields.homePageImageUrl,fields.homePageImageUrlCaption,fields.moreUrl',
    PageBlockSectionFieldsDetailsFields: 'fields.mainHeader,fields.subHeader,fields.detailText,fields.detailPageImageUrl,fields.detailPageImageCaption',

    publishQueryString: {'fields.publishOnThePage': true},
    //imageQueryString: {'fields.showField': true, 'fields.pageName':'HOME', 'fields.pageBlockName':'IMAGESECTION'},
    imageQueryString: {'fields.pageName':'HOME', 'fields.pageBlockName':'IMAGESECTION', 'fields.publishOnThePage':true},
    techNewsQueryString: {'fields.pageName':'HOME', 'fields.pageBlockName':'TECHNEWS', 'fields.publishOnThePage':true},
    advertiseQueryString: {'fields.pageName':'HOME', 'fields.pageBlockName':'ADVERTISE', 'fields.publishOnThePage':true},
    aboutQueryString: {'fields.pageName':'ABOUT', 'fields.pageBlockName':'ABOUTUS', 'fields.publishOnThePage':true},
    recruitersQueryString: {'fields.pageName':'RECRUITERS', 'fields.pageBlockName':'SOLUTION', 'fields.publishOnThePage':true},
    recruiterFollowingsQueryString: {'fields.pageName':'RECRUITERS', 'fields.pageBlockName':'FOLLOWINGS', 'fields.publishOnThePage':true},
    resumeserviceQueryString: {'fields.pageName':'SERVICE', 'fields.pageBlockName':'RESUME', 'fields.publishOnThePage':true},
    salaryPredictorQueryString: {'fields.pageName':'SERVICE', 'fields.pageBlockName':'SALARYPREDICTOR', 'fields.publishOnThePage':true},

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
    ApplyJob: 'ApplyJob',
    Country: 'Country',
    State: 'State',
    UserRoles: 'UserRole',
    OrderByPostJob: 'JobTitle',
    AddedSucessfully: 'Added Successfully',
    UpdatedSucessfully: 'Updated Successfully',
    DeletedSucessfully: 'Deleted Successfully',
    PostJobId: 'id',
    NewUpdatePostJob: '/newupdatePostJob',
    UploadPath: '/uploads',
    TempResume: '/TempResume',
    TotalFile: '10000000',
    EmployerPostJob: 'EmployerPostJob',
    EmployerResumeSearch: 'EmployerResumeSearch',
    EmployerPowerUser: 'EmployerPowerUser',
    UserRole: 'User',
    AdminRole: 'Admin',
    ApplyJobSucess: 'Job has been sucessfully Applied.',
    CountryCreate: 'Country has been sucessfully created/updated',
    StateCreate: 'State has been sucessfully created/updated'
}

export const SEARCH_CONFIG = {
    Keyword: 'keyword',
    Location: 'location',
    ALGOLIA_APP_ID: '8I5VGLVBT1',
    ALGOLIA_API_KEY: '',
    INDEX_NAME: 'PostJob',
    INDEX_NAME_PROFILE: 'UserProfile',
    PROTOCOLS:'https:',
    ALGOLIA_FUNCTION_URL: '',
    LIST_JOB_DESC_WIDTH: 120,
    LIST_JOB_DESC_STATUS: 400,
    PAGE_SIZE: 5,
    CURRENT_PAGE: 1
}

export const AUTH_CONFIG: AuthConfiguration = {
    clientID: '',
    domain: '',

    //clientID: '6I0zQ4RDSfcIx1u6jQSpviVcuxkfr5DP',
    //domain: 'sumitdey.auth0.com',

    // You may need to change this!
    //callbackURL: 'http://macgain.com/dist/callback',  // production
    //callbackURL: 'https://career.macgain.com/callback',  // production
    callbackURL: '',

    audience: '',


    //redirectUri: 'http://macgain.com/dist/',       // production
    //redirectUri: 'https://career.macgain.com/',       // production
    redirectUri: 'http://localhost:4200/',


    responseType: 'token id_token',
    //scope: 'openid profile',
    scope: 'openid profile read:messages write:messages',
    connection: 'Username-Password-Authentication' ,
    sighupURL: 'https://macgain.auth0.com/dbconnections/signup',
    forgetPasswordURL: ''
};
