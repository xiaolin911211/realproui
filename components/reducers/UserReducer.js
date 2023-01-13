import {SELECT_ORDER, USER_LOGIN, USER_LOGOUT} from "../constant/Constants";

export const userReducer = (state, action) => {
    console.log('USER REDUCER', action)
    switch (action.type) {
        case USER_LOGIN:
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
            }
        case USER_LOGOUT:
            return {
                isLoggedIn: false,
                userName: "",
                email: "",
                phone: "",
                accountType: "",
                sessionToken: "",
                userId: "",
                dateOfBirth: "",
                accountStatus: "",
                initial: ""
            }
        default:
            return false;
    }
}
export const orderReducer = (state, action) => {
    console.log('orderReducer: ', action);
    switch (action.type) {
        case SELECT_ORDER:
            return {
                orderNumber: action.order.orderId,
                orderDate: action.order.created,
                products: action.order.products,
                address: action.order.address,
                payment: action.order.payment

            }
        default:
            return false;
    }
}