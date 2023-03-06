import {
    ACTION_EDIT_DISPATCH,
    ACTION_RESET,
    ACTION_SELECT_ORDER,
    ACTION_SET_ADDITIONAL_COMMENTS, ACTION_SET_CHECKED_SERVICES, ACTION_SET_DISPLAY_SERVICES, ACTION_SET_EXTRA_SERVICE,
    ACTION_SET_POSTAL_CODE,
    ACTION_SET_PROPERTY_REGION,
    ACTION_SET_PROPERTY_SERVICE, ACTION_SET_PROPERTY_SERVICES,
    ACTION_SET_PROPERTY_SIZE,ACTION_SET_USER_ID,
    ACTION_SET_PROPERTY_TYPE,
    ACTION_SET_PROVINCE, ACTION_SET_SERVICE_ARRIVE_TIME, ACTION_SET_SERVICE_DATE_TIME,
    ACTION_SET_STREET_NAME,
    ACTION_SET_STREET_NUMBER,
    ACTION_SET_UNIT_NUMBER, INITIAL_STATE_BOOKNOW, LOG_IN, LOG_OUT, SESSION_ORDER, SESSION_USER
} from "../common/constants";

export const bookNowReducer = (state, action) => {
    // eslint-disable-next-line default-case
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
        case ACTION_SET_SERVICE_ARRIVE_TIME: {
            return {...state,
                serviceArriveTime: action.value
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

        // eslint-disable-next-line no-lone-blocks
        case ACTION_SET_DISPLAY_SERVICES: {
            return {...state,
                displayCheckService: action.value
            };
        };
        case ACTION_SET_USER_ID: {
            return {...state,
                userId: action.value
            };
        }
        case ACTION_EDIT_DISPATCH: {

                // Get selected property all services(pricing)  based on selected property size ID
                const selectedProducts = action.propertyDateList.servicesData?.data?.filter(
                    (item) => item.propertySizeId === parseInt(action.value?.address?.propertySize?.id)
                )[0];

                //Get all product services that is NOT a bundle
                const filteredProductTypes = selectedProducts.pricing.filter(
                    (item) => item.type.length === 1
                );

                //Get selected product services
                const selectedProductTypes = selectedProducts.pricing.filter(
                    (item) => item.productId === parseInt(action.value?.products[0]?.productId)
                )[0]?.type;

                //Check if NOT bundle services list if it has a product service that is being selected, if not then do nothing else remove it from extra services
                for (let x = 0; x < selectedProductTypes?.length; x++) {
                const index = filteredProductTypes.findIndex(
                    (item) => item.productId === selectedProductTypes[x].id
                );
                filteredProductTypes.splice(index, 1);
            }

            const checkedServiceProduct = action.value.products.filter(item => item.productId !== action.value.products[0].productId);
            const checkedServiceItem = [];
            checkedServiceProduct.forEach(element => checkedServiceItem.push(element.productId.toString()));
            return {...state,
                selectPropertySize: parseInt(action.value?.address?.propertySize?.id),
                selectPropertyService: parseInt(action.value?.products[0]?.productId),
                selectPropertyType: parseInt(action?.value?.address?.propertyType?.id),
                selectPropertyRegion: parseInt(action?.value?.address?.city?.id),
                unitNumber: action.value?.address?.unitNumber,
                streetNumber: action.value?.address?.streetNumber,
                streetName: action.value?.address?.streetName,
                postalCode: action.value?.address?.postalCode,
                province: action.value?.address?.province?.id,
                additionalComments: action.value?.note,
                serviceDatetime: action.value?.scheduleDate,
                serviceArriveTime: action.value?.arriveTime,
                propertyServices: action.propertyDateList?.servicesData?.data.filter((item) => parseInt(item.propertySizeId) === parseInt(action.value?.address?.propertySize?.id))[0].pricing,
                extraService: filteredProductTypes,
                checkedService: checkedServiceItem,
                displayCheckService: action.value?.products,
                userId: action.value?.userId

            };
        }
        case ACTION_RESET: {
            return INITIAL_STATE_BOOKNOW;
        };



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