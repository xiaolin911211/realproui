import {useRouter} from "next/router";

import React, {useContext, useEffect, useState} from "react";
import {HttpLogin} from "../../components/api/RequestAPI";
import {UserContext} from "../../components/contexts/ContextProvider";
import {USER_LOGIN} from "../../components/constant/Constants";


const LoginPage = () => {


    const router = useRouter();
    const [displayError, setDisplayError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {dispatch} = useContext(UserContext);
    const emailHandler = (e) => {
        setEmail(e.target.value);
    };
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    const loginHttpHandler = async (e) => {
        e.preventDefault();
        const loginResponse = await HttpLogin(email, password);
        console.log(loginResponse?.data);
        if (loginResponse.status === 200 && loginResponse?.data?.success) {
            dispatch({type: USER_LOGIN, user: loginResponse?.data?.data.user});
            router.push('/')
        } else {
            setDisplayError(true);
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
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                            <h1 className="dark:text-white block w-full text-center text-gray-800 text-2xl font-bold mb-6">RealPro Inc.</h1>
                            <form onSubmit={loginHttpHandler}>

                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email address"
                                        onChange={emailHandler}
                                        value={email}
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                                    <input
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Password"
                                        value={password}
                                        onChange={passwordHandler}
                                    />
                                </div>

                                <div className="flex justify-between items-center mb-6">

                                    <a
                                        href="../forgotpassword"
                                        className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                                    >Forgot password?</a
                                    >
                                </div>

                                {displayError ? (
                                    <div className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3"
                                         role="alert">
                                        Invalid Email/Password
                                    </div>) : null}
                                <button

                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Sign in
                                </button>

                                <div
                                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                                >
                                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                                </div>

                                <a
                                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                                    style={{
                                        backgroundColor: '#3b5998'
                                    }}
                                    href="../registration"
                                    role="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >

                                    Create An Account
                                </a>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default LoginPage