import {createContext, useEffect, useReducer} from "react";
import {orderReducer, userReducer} from "../reducers/UserReducer";
import {decryptData, encryptData} from "../utilities/util";

export const UserContext = createContext();
export const OrderContext = createContext();

const UserContextProvider = (props) => {

    const initialState = {
        isLoggedIn: false,
        userName: "",
        email: "",
        phone: "",
        accountType: "",
        sessionToken: "",
        initial: ""
    };
    const initialStateOrder = {
        orderNumber: '',
        payment: '',
        products: '',
        address: ''
    }
    const [users, dispatch] = useReducer(userReducer, initialState, () => {
        // const originalDataDecrypt = decryptData(sessionStorage.getItem("user"), process.env.NEXT_PUBLIC_SALT);

        const localData = decryptData(sessionStorage.getItem("user"), process.env.NEXT_PUBLIC_SALT);

        return localData ? JSON.parse(localData) : {};

    });
    const [orders, dispatchOrder] = useReducer(orderReducer, initialStateOrder,() => {

        // const localData = sessionStorage.getItem("cart");
        // return localData ? JSON.parse(localData) : {};

    });
    useEffect(() => {

        const encryptedData = encryptData(JSON.stringify(users), process.env.NEXT_PUBLIC_SALT);
        sessionStorage.setItem('user', encryptedData);
        // sessionStorage.setItem('cart', JSON.stringify(orders));
    }, [users])


    return (
        <UserContext.Provider value={{users, dispatch}}>
            <OrderContext.Provider value={{orders, dispatchOrder}}>
                {props.children}
            </OrderContext.Provider>
        </UserContext.Provider>
    );
}

export default UserContextProvider;