export const NAVIGATION = [
    { name: "Home", href: "/", current: false },
    { name: "Services", href: "/services", current: false },
    { name: "Booknow", href: "/booknow", current: false },
    { name: "Contact", href: "/contact", current: false },
];
export const ACCOUNT_TYPE_ADMIN = 1;
export const ACCOUNT_TYPE_AGENT = 2;
export const ACCOUNT_TYPE_STAFF = 3;
export const USER_ROLES = [
    {
        id: 1,
        role: 'Admin'
    },
    {
        id: 2,
        role: 'Agent'
    },
    {
        id: 1,
        role: 'Photographer'
    }
]
export const ORDER_HISTORY_HEADER = ['order #','Order Date','Schedule Time','Destination','Property Information','Services','Comments','Status',''];
export const SERVICES_HEADER = ['ID','Property Size','Product Name','Price','Status',''];
export const USERS_HEADER = ['Name','Email','Account Type','Phone','Status',''];
export const initialState = {
    isLoggedIn: false, userName: "", email: "", phone: "", accountType: "", sessionToken: "", initial: ""
};
export const initialStateOrder = {
    orderNumber: '',
    payment: '',
    products: '',
    address: ''
};
export const initialStateBookNow = {
    selectPropertySize: '',
    selectPropertyService: '',
    selectPropertyType: '',
    selectPropertyRegion: '',
    unitNumber: '',
    streetNumber: '',
    streetName: '',
    postalCode: '',
    province: 'ON',
    lockBoxPwd: '',
    vacant: true,
    additionalComments: '',
    serviceDatetime: new Date(),
    propertyServices: [],
    extraService: [],
    checkedService: [],
    displayCheckService: []
};
export const STEPPER_INFO = [
    {id: 1, name: "Property Info"},
    {id: 2, name: "Contact Info"},
    {id: 3, name: "Confirmation"}
]

export const HTTP_HEADER = {
    "Content-Type": "application/json",
    "Accept": "application/json"
};

export const SERVICE_TYPE_PHOTO_TITLE = "Photo";
export const SERVICE_TYPE_VIDEO_TITLE = "Video";
export const SERVICE_TYPE_PHOTO_BODY = "High Dynamic Range (HDR) real estate photos are created by combining\n" +
    "                        varying light exposures and taking the best parts of each one to\n" +
    "                        create the perfect interior photo. Here at Odyssey3D, our team of\n" +
    "                        Highly Trained Professional Photographers capture unlimited HDR\n" +
    "                        photos of every listing’s virtual tour. Our photos make your listing\n" +
    "                        stand out on Realtor.ca, allowing you to get more offers on your\n" +
    "                        listing! We truly understand the importance of excellent real estate\n" +
    "                        virtual tours and we ensure consistent results every-time!";
export const SERVICE_TYPE_VIDEO_BODY = "High Dynamic Range (HDR) real estate photos are created by combining\n" +
    "                        varying light exposures and taking the best parts of each one to\n" +
    "                        create the perfect interior photo. Here at Odyssey3D, our team of\n" +
    "                        Highly Trained Professional Photographers capture unlimited HDR\n" +
    "                        photos of every listing’s virtual tour. Our photos make your listing\n" +
    "                        stand out on Realtor.ca, allowing you to get more offers on your\n" +
    "                        listing! We truly understand the importance of excellent real estate\n" +
    "                        virtual tours and we ensure consistent results every-time!";
export const SERVICE_TYPE_PHOTO_IMAGE = "https://repro.nyc3.digitaloceanspaces.com/photos/order/160622-4680-0001/1655433999959-IMG_20190219_195302.jpg";
export const SERVICE_TYPE_VIDEO_IMAGE = "https://repro.nyc3.digitaloceanspaces.com/photos/order/160622-4680-0001/1655433999959-IMG_20190219_195302.jpg";
export const HTTP_TIMEOUT = 30000;
export const WAIT_EXECUTE = 5000;
export const LOG_IN ='LOG_IN';
export const LOG_OUT ='LOG_OUT';
export const SESSION_USER = 'SESSION_USER';
export const SESSION_ORDER = 'SESSION_ORDER';
export const CACHE_SERVICES = 'CACHE_SERVICES';
export const CACHE_PROPERTY_TYPE = 'CACHE_PROPERTY_TYPE';
export const CACHE_PROPERTY_REGION = 'CACHE_PROPERTY_REGION';
export const ACTION_SET_PROPERTY_SIZE = 'ACTION_SET_PROPERTY_SIZE';
export const ACTION_SET_PROPERTY_REGION = 'ACTION_SET_PROPERTY_REGION';
export const ACTION_SET_PROPERTY_TYPE = 'ACTION_SET_PROPERTY_TYPE';
export const ACTION_SET_PROPERTY_SERVICE = 'ACTION_SET_PROPERTY_SERVICE';
export const ACTION_SET_UNIT_NUMBER = 'ACTION_SET_UNIT_NUMBER';
export const ACTION_SET_STREET_NUMBER = 'ACTION_SET_STREET_NUMBER';
export const ACTION_SET_STREET_NAME = 'ACTION_SET_STREET_NAME';
export const ACTION_SET_POSTAL_CODE = 'ACTION_SET_POSTAL_CODE';
export const ACTION_SET_PROVINCE = 'ACTION_SET_PROVINCE';
export const ACTION_SET_LOCKBOX_PWD = 'ACTION_SET_LOCKBOX_PWD';
export const ACTION_SET_VACANT = 'ACTION_SET_VACANT';
export const ACTION_SELECT_ORDER = 'ACTION_SELECT_ORDER';
export const ACTION_SET_ADDITIONAL_COMMENTS = 'ACTION_SET_ADDITIONAL_COMMENTS';
export const ACTION_SET_PROPERTY_SERVICES = 'ACTION_SET_PROPERTY_SERVICES';
export const ACTION_SET_SERVICE_DATE_TIME = 'ACTION_SET_SERVICE_DATE_TIME';

export const ACTION_SET_EXTRA_SERVICE = 'ACTION_SET_EXTRA_SERVICE';
export const ACTION_SET_DISPLAY_SERVICES = 'ACTION_SET_DISPLAY_SERVICES';
export const ACTION_SET_CHECKED_SERVICES = 'ACTION_SET_CHECKED_SERVICES';

export const MESSAGE_SUCCESS_FORGOT_PWD = 'Password reset Email has send to your mail box';
export const MESSAGE_SUCCESS_CREATE_ORDER = 'Order was created successful, please check your email for invoice and we will contact you as soon as possible';
export const MESSAGE_SUCCESS_REGISTER= 'Account was created, please check email to activate account';
export const MESSAGE_SUCCESS_UPDATE_PRODUCT= 'Product Service Updated Successfully';
export const MESSAGE_SUCCESS_UPDATE_USER= 'User  Updated Successfully';
export const MESSAGE_SERVER_ERROR= 'We are experiencing technical difficulties, please try again later';
export const MESSAGE_UNAUTHORIZED= 'You are unauthorized or login expired, please try and login';

export const MESSAGE_SUCCESS_CONTACT_US = 'We have recieved your message, will get back to you as soon as possible';
export const STEP_PROPERTY_INFO = 1;
export const STEP_CONTACT_INFO = 2;
export const STEP_CONFIRMATION = 3;
export const TABLE_RECORD_PER_PAGE = 5;
export const PAGE_ORDER_HISTORY = '/orderhistory';
export const PAGE_BOOK_NOW = '/booknow';
export const PAGE_REGISTRATION = '/registration';
export const PAGE_LOG_IN = '/login';
export const PAGE_ORDER_DETAIL = '/orderdetail';
export const PAGE_ORDER_DASHBOARD = '/admindashboard';
export const PAGE_ORDER_PROFILE = '/profile';
export const PAGE_PAYMENT = '/payment';
export const TABLE_INI_PAGE_NUM = 1;
export const STATUS_ACTIVE = 1;
export const UNAUTHORIZED_CODE = 401;