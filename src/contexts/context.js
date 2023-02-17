import {createContext, useEffect, useReducer} from "react";
import {decryptData} from "../utilities/aes-encryption";
import {
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
    ACTION_SET_UNIT_NUMBER, ACTION_SET_VACANT, initialState, initialStateBookNow, initialStateOrder,
    LOG_IN,
    LOG_OUT, SESSION_ORDER, SESSION_USER
} from "../common/constants";
import {encryptData} from "../utilities/aes-decryption";
import {bookNowReducer, orderReducer, userReducer} from "./reducers";


export const UserContext = createContext(null);

export const UserProvider = ({children}) => {

    const [state, dispatch] = useReducer(userReducer, initialState, () => {
        const localData = sessionStorage.getItem(SESSION_USER);
        return localData ? JSON.parse(localData) : {};

    });
    useEffect(() => {
        const encryptedData = JSON.stringify(state);
        sessionStorage.setItem(SESSION_USER, encryptedData);
    }, [state]);
    return (<UserContext.Provider value={{state, dispatch}}>
        {children}
    </UserContext.Provider>);

};


export const ContextBookNow = createContext(null);

export const BookNowProvider = ({children}) => {
    const [stateBookNow, dispatchBookNow] = useReducer(bookNowReducer, initialStateBookNow);
    return (<ContextBookNow.Provider value={{stateBookNow, dispatchBookNow}}>
        {children}
    </ContextBookNow.Provider>);
}

export const ContextOrder = createContext(null);

export const OrderProvider = ({children}) => {
    const [stateOrder, dispatchOrder] = useReducer(orderReducer, initialStateOrder, () =>{
        const localData = sessionStorage.getItem(SESSION_ORDER);
        return localData ? JSON.parse(localData) : {};
    });
    useEffect(() => {
        const encryptedData = JSON.stringify(stateOrder);
        sessionStorage.setItem(SESSION_ORDER, encryptedData);
    }, [stateOrder]);
    return (<ContextOrder.Provider value={{stateOrder, dispatchOrder}}>
        {children}
    </ContextOrder.Provider>);
}