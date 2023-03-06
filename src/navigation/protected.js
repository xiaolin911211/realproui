import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "../contexts/context";
import {PAGE_LOG_IN} from "../common/constants";
const Protected = ({  children }) => {
    const {state} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if (state.isLoggedIn === undefined || !state.isLoggedIn) {
            navigate(PAGE_LOG_IN,{replace: true})
        }
    },[])


    return children;
};
export default Protected;