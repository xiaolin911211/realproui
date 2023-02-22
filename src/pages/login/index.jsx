import React, {useContext, useState} from "react";
import {UserContext} from "../../contexts/context";
import {LOG_IN, MESSAGE_SERVER_ERROR, PAGE_REGISTRATION} from "../../common/constants";
import {httpCommonPost} from "../../api/http-request";
import {DisplayMessage, Loading} from "../../common/sharedComponent";
import {useNavigate} from 'react-router-dom';
import {Button} from "flowbite-react";

const Login = () => {
    const navigate = useNavigate();
    const { dispatch }  = useContext(UserContext);
     const [displayMessage, setDisplayMessage] = useState({
        isDisplay: false,
        isMessage: '',
        isSuccess: false,
        loading: false
    })
    const [loginCredential, setLoginCredential] = useState({
        email: '',
        password: ''
    });
    const onClickCreateAccount = (e) => {
        e.preventDefault();
        navigate(PAGE_REGISTRATION,{replace: true})
    }
    const onSubmitLogin = async (e) => {
        e.preventDefault();
        setDisplayMessage({...displayMessage, 'loading': true});
        const loginResponse = await httpCommonPost(process.env.REACT_APP_BASE_PATH + process.env.REACT_APP_URL_LOGIN,loginCredential);
        const [isSuccess, isMessage, loginData] = [loginResponse?.data?.success, loginResponse?.data?.msg ,loginResponse?.data?.data?.user];
        setDisplayMessage({...displayMessage, 'loading': false});

        if (isSuccess) {
            dispatch({type: LOG_IN, user: loginData});
            navigate('/',{replace: true})
        }
        else {
            setDisplayMessage({
                isDisplay: true,
                isMessage: isMessage === undefined ? MESSAGE_SERVER_ERROR: isMessage,
                isSuccess: false
            })
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
                        <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage} isSuccess={displayMessage.isSuccess}/>
                        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                            <h1 className="dark:text-white block w-full text-center text-gray-800 text-2xl font-bold mb-6">RealPro
                                Inc.</h1>
                            <div >

                                <div className="mb-6">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email address"
                                        value={loginCredential.email}
                                        onChange={(e)=>setLoginCredential({...loginCredential, 'email': e.target.value})}
                                    />
                                </div>

                                <div className="mb-6">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Password"
                                        value={loginCredential.password}
                                        onChange={(e)=>setLoginCredential({...loginCredential, 'password': e.target.value})}
                                    />
                                </div>

                                <div className="flex justify-between items-center mb-6">

                                    <a
                                        href="../forgotpassword"
                                        className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                                    >Forgot password?</a
                                    >
                                </div>

                                <Loading isActive={displayMessage.loading} />

                                <Button
                                    onClick={onSubmitLogin}
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
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
                                    color="purple"                          t
                                        type="submit"
                                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
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