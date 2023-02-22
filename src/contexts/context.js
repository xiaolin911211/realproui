import {createContext, useEffect, useReducer} from "react";
import {initialState, initialStateBookNow, initialStateOrder, SESSION_ORDER, SESSION_USER} from "../common/constants";
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