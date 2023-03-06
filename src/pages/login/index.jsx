import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../contexts/context";
import {DISPLAY_INIT, LOG_IN, METHOD_POST, PAGE_REGISTRATION} from "../../common/constants";
import {CommonLoadHttp, DisplayMessage, Loading} from "../../common/sharedComponent";
import {useNavigate} from 'react-router-dom';
import {Button} from "flowbite-react";
import {BTN_WIDE, INPUT_BLUE_BG} from "../../common/css-constant";

const Login = () => {
    const navigate = useNavigate();
    const {dispatch} = useContext(UserContext);
    const [displayMessage, setDisplayMessage] = useState(DISPLAY_INIT)
    const [loginCredential, setLoginCredential] = useState({
        email: '',
        password: ''
    });
    const onClickCreateAccount = (e) => {
        e.preventDefault();
        navigate(PAGE_REGISTRATION, {replace: true})
    };
    const onSubmitLogin = async (e) => {
        e.preventDefault();

        const httpResponse = await CommonLoadHttp({
            url:process.env.REACT_APP_URL_LOGIN,
            displayMessage,
            setDisplayMessage,
            request:loginCredential,
            token: '',
            method: METHOD_POST,
            isDisplay: true,
            customPageMessage:'',
            navigate
        });
        if (httpResponse.isSuccess) {

            dispatch({type: LOG_IN, user: httpResponse.isData?.data?.user});
            navigate('/', {replace: true})
        }
    };

    return (
        <div className="relative">
            <div
                className="h-screen w-full "
                style={{
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed",
                    backgroundImage: `url(https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)`,
                }}
            >
                <div className="flex h-screen justify-center items-center">

                    <div
                        className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage}
                                        isSuccess={displayMessage.isSuccess}/>
                        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                            <h1 className="dark:text-white block w-full text-center text-gray-800 text-2xl font-bold mb-6">RealPro
                                Inc.</h1>
                            <div>

                                <div className="mb-6">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        className={INPUT_BLUE_BG}
                                        placeholder="Email address"
                                        value={loginCredential.email}
                                        onChange={(e) => setLoginCredential({
                                            ...loginCredential,
                                            'email': e.target.value
                                        })}
                                    />
                                </div>

                                <div className="mb-6">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className={INPUT_BLUE_BG}
                                        placeholder="Password"
                                        value={loginCredential.password}
                                        onChange={(e) => setLoginCredential({
                                            ...loginCredential,
                                            'password': e.target.value
                                        })}
                                    />
                                </div>

                                <div className="flex justify-between items-center mb-6">

                                    <a
                                        href="../forgotpassword"
                                        className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                                    >Forgot password?</a
                                    >
                                </div>

                                <Loading isActive={displayMessage.loading}/>

                                <Button
                                    onClick={onSubmitLogin}
                                    color="dark"
                                    pill={true}
                                    type="submit"
                                    className={BTN_WIDE}
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Sign in
                                </Button>

                                <div
                                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                                >
                                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                                </div>

                                <Button
                                    onClick={onClickCreateAccount}
                                    color="purple"
                                    pill={true} t
                                    type="submit"
                                    className={BTN_WIDE}
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light">
                                    CREATE AN ACCOUNT
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}
export default Login;