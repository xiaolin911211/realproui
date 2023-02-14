import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../contexts/context";
import {PAGE_LOG_IN} from "../common/constants";
const Protected = ({  children }) => {
    const {state} = useContext(UserContext);
    const navigate = useNavigate();
    if (!state.isLoggedIn) {
        navigate(PAGE_LOG_IN,{replace: true})
    }

    return children;
};
export default Protected;