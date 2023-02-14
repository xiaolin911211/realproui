import React, {useContext} from "react";
import {Avatar, Button, Dropdown, Navbar} from "flowbite-react";
import {
    LOG_IN,
    LOG_OUT,
    NAVIGATION,
    PAGE_ORDER_DASHBOARD,
    PAGE_ORDER_HISTORY,
    PAGE_ORDER_PROFILE
} from "../common/constants";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../contexts/context";

const Navbars = () => {
    const navigate = useNavigate();
    const {state,dispatch} = useContext(UserContext);
    const onClickProfile = (e) =>{
        navigate(PAGE_ORDER_PROFILE,{replace: true});
    };
    const onClickHistory = (e) =>{
        navigate(PAGE_ORDER_HISTORY,{replace: true});
    }
    const onClickAdmin = (e) =>{
        navigate(PAGE_ORDER_DASHBOARD,{replace: true});
    }
    const onClickLogout = (e) =>{

        dispatch({type: LOG_OUT, user: {}});
        navigate('/',{replace: true})
    }
    return (
        <Navbar
            fluid={true}
            rounded={true}
        >
            <Navbar.Brand href="https://flowbite.com/">
                <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      RealPro
    </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {state.isLoggedIn ? (<Dropdown
                            arrowIcon={false}
                            inline={true}
                            label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true}/>}
                        >
                            <Dropdown.Header>
                <span className="block text-sm">
                  Bonnie Green
                </span>
                                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
                            </Dropdown.Header>
                            <Dropdown.Item onClick={onClickProfile}>
                                Your Profile
                            </Dropdown.Item>
                            <Dropdown.Item onClick={onClickHistory}>
                                Order History
                            </Dropdown.Item>
                            <Dropdown.Item onClick={onClickAdmin}>
                                Admin
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={onClickLogout}>
                                Sign out
                            </Dropdown.Item>
                        </Dropdown>) :
                        // <Navbar.Toggle />
                <Navbar.Collapse>
                  <Navbar.Link
                        href="/login"
                        active="false"
                    >
                        Login
                    </Navbar.Link>
                </Navbar.Collapse>}
            </div>
            <Navbar.Collapse>
                {NAVIGATION.map((item) =>
                    <Navbar.Link
                        key={item.name}
                        href={item.href}
                        active={item.current}
                    >
                        {item.name}
                    </Navbar.Link>
                )}
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Navbars;