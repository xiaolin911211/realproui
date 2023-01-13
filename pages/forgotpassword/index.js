import React, {useRef, useState} from "react";
import {HttpForgotPassword} from "../../components/api/RequestAPI";

const ForgotPasswordPage = () => {

    const [status, setStatus] = useState(2);
    const [displayMSG, setDisplayMSG] = useState("");
    const email = useRef("");
    const SendConfirmationCodeHandler = async (e) => {
        e.preventDefault();
        const httpForgotPasswordResponse = await HttpForgotPassword(email.current.value);
        console.log(httpForgotPasswordResponse);

        if (httpForgotPasswordResponse.status === 200 && httpForgotPasswordResponse?.data?.success) {
            setStatus(1);
            setDisplayMSG("Please check your email for the password reset")
        } else {
            setStatus(0);
            setDisplayMSG(httpForgotPasswordResponse?.data?.msg ? httpForgotPasswordResponse?.data?.msg : "We are experiencing technical difficulties please try again later");
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
                            {status == 0 ?
                                (<div className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-white-700 mb-3"
                                      role="alert">
                                    {displayMSG}
                                </div>) : status == 1 ? (
                                    <div
                                        className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-white-700 mb-3"
                                        role="alert">
                                        {displayMSG}
                                    </div>) : null}


                            {status != 1 ? (
                                <h1 className="dark:text-white block w-full text-center text-gray-800 text-2xl font-bold mb-6">Forgot
                                    Password</h1>) : null}

                            {status != 1 ? (<form action="/" method="post" onSubmit={SendConfirmationCodeHandler}>

                                <div className="mb-6">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email address"
                                        ref={email}

                                    />
                                </div>
                                <button

                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Reset Password
                                </button>
                            </form>) : null}
                        </div>
                    </div>
                </div>

            </div>
        </div>


    )
}
export default ForgotPasswordPage