import {
    ACTION_SELECT_ORDER,
    ACTION_SET_ADDITIONAL_COMMENTS, ACTION_SET_CHECKED_SERVICES, ACTION_SET_DISPLAY_SERVICES, ACTION_SET_EXTRA_SERVICE,
    ACTION_SET_LOCKBOX_PWD,
    ACTION_SET_POSTAL_CODE,
    ACTION_SET_PROPERTY_REGION,
    ACTION_SET_PROPERTY_SERVICE, ACTION_SET_PROPERTY_SERVICES,
    ACTION_SET_PROPERTY_SIZE,
    ACTION_SET_PROPERTY_TYPE,
    ACTION_SET_PROVINCE, ACTION_SET_SERVICE_DATE_TIME,
    ACTION_SET_STREET_NAME,
    ACTION_SET_STREET_NUMBER,
    ACTION_SET_UNIT_NUMBER, ACTION_SET_VACANT, LOG_IN, LOG_OUT, SESSION_ORDER, SESSION_USER
} from "../common/constants";

export const bookNowReducer = (state, action) => {
    switch (action.type) {
        case ACTION_SET_PROPERTY_SIZE: {
            return {...state,
                selectPropertySize: parseInt(action.value)
            };
        }
        case ACTION_SET_PROPERTY_SERVICE: {
            return {...state,
                selectPropertyService: parseInt(action.value)
            };
        }
        case ACTION_SET_PROPERTY_TYPE: {
            return {...state,
                selectPropertyType: parseInt(action.value)
            };
        }
        case ACTION_SET_PROPERTY_REGION: {
            return {...state,
                selectPropertyRegion: parseInt(action.value)
            };
        }
        case ACTION_SET_UNIT_NUMBER: {
            return {...state,
                unitNumber: action.value
            };
        }
        case ACTION_SET_STREET_NUMBER: {
            return {...state,
                streetNumber: action.value
            };
        }
        case ACTION_SET_STREET_NAME: {
            return {...state,
                streetName: action.value
            };
        }
        case ACTION_SET_POSTAL_CODE: {
            return {...state,
                postalCode: action.value
            };
        }
        case ACTION_SET_PROVINCE: {
            return {...state,
                province: action.value
            };
        }
        case ACTION_SET_LOCKBOX_PWD: {
            return {...state,
                lockBoxPwd: action.value
            };
        }
        case ACTION_SET_VACANT: {
            return {...state,
                vacant: action.value
            };
        }
        case ACTION_SET_ADDITIONAL_COMMENTS: {
            return {
                ...state,
                additionalComments: action.value
            };
        }
        case ACTION_SET_SERVICE_DATE_TIME: {
            return {...state,
                serviceDatetime: action.value
            };
        }
        case ACTION_SET_PROPERTY_SERVICES: {
            return {...state,
                propertyServices: action.value
            };
        }
        case ACTION_SET_EXTRA_SERVICE: {
            return {...state,
                extraService: action.value
            };
        }
        case ACTION_SET_CHECKED_SERVICES: {
            return {...state,
                checkedService: action.value
            };
        }
        case ACTION_SET_DISPLAY_SERVICES: {
            return {...state,
                displayCheckService: action.value
            };
        }

    }
    throw Error('Unknown action: ' + action.type);
};

export const userReducer = (state, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
                isLoggedIn: true,
                userName: action.user.firstName + ' ' + action.user.lastName,
                email: action.user.email,
                phone: action.user.phone,
                accountType: action.user.accountTypeId,
                sessionToken: action.user.sessionToken,
                userId: action.user.userId,
                dateOfBirth: action.user.dateOfBirth,
                accountStatus: action.user.status,
                initial: action.user.initial
            };
        }
        case LOG_OUT: {
            sessionStorage.removeItem(SESSION_USER);
            sessionStorage.removeItem(SESSION_ORDER);
            return;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
};

export const orderReducer = (state, action) => {
    switch (action.type) {
        case ACTION_SELECT_ORDER:
            console.log('ACTION_SELECT_ORDER', action.order)
            return {
                orderId: action.order.orderId,
                orderDate: action.order.created,
                products: action.order.products,
                address: action.order.address,
                payment: action.order.payment

            }
        default:
            throw Error('Unknown action: ' + action.type);
    }
}