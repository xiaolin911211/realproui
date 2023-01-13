import React, {useEffect, useRef, useState} from "react";
import {HttpForgotPassword, HttpResetPwd} from "../../components/api/RequestAPI";
import {useRouter} from "next/router";

const ResetPasswordPage = () => {
    const router = useRouter();
    const [status, setStatus] = useState(2);
    const [displayMSG, setDisplayMSG] = useState("");
    const emailUser = useRef("");
    const password = useRef("");
    const confirmPassword = useRef("");
    const {email} = router.query
    const {token} = router.query
    useEffect(() => {
        if (!email && !token) {
            return;
        }

    }, [email, token])
    const resetPasswordHandler = async (e) => {
        e.preventDefault();
        if (resetPasswordValidation()) {
            const httpResetPasswordResponse = await HttpResetPwd(email, token, password.current.value);
            console.log(httpResetPasswordResponse.data);

            if (httpResetPasswordResponse.status === 200 && httpResetPasswordResponse?.data?.success) {
                setStatus(1);
                setDisplayMSG("Password reset successfully")
            } else {
                setStatus(0);
                setDisplayMSG(httpResetPasswordResponse?.data?.msg ? httpResetPasswordResponse?.data?.msg : "We are experiencing technical difficulties please try again later");
            }
        }

    };

    const resetPasswordValidation = () => {
        console.log('resetPasswordValidation');
        if (password.current.value.length < 8) {
            setStatus(0);
            setDisplayMSG("Password must be 8 or more characters");
            return false;
        } else if (confirmPassword.current.value.length < 8) {
            setStatus(0);
            setDisplayMSG("Reenter Password must be 8 or more characters");
            return false;
        } else if (password.current.value !== confirmPassword.current.value) {
            setStatus(0);
            setDisplayMSG("Password does not match");
            return false;
        } else {

            return true;
        }
    }


    return (
        <>
            <section className="h-screen">
                <div className="container px-6 py-12 h-full">
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                        <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="w-full"
                                alt="Phone image"
                            />
                        </div>
                        <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                            {status == 0 ?
                                (<div className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-white-700 mb-3"
                                      role="alert">
                                    {displayMSG}
                                </div>) : status == 1 ? (<div
                                    className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-white-700 mb-3"
                                    role="alert">
                                    {displayMSG}
                                </div>) : null}
                            {status != 1 ? (
                                <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Reset
                                    Password</h1>) : null}

                            {status != 1 ? (<form action="/" method="post" onSubmit={resetPasswordHandler}>

                                <div className="mb-6">
                                    <label className="mb-2 font-bold text-lg text-gray-900">Email</label>
                                    <input
                                        disabled={true}
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email address"
                                        ref={emailUser}
                                        value={email}

                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="mb-2 font-bold text-lg text-gray-900">Password</label>
                                    <input
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Password"
                                        ref={password}

                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="mb-2 font-bold text-lg text-gray-900">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Confirm password"
                                        ref={confirmPassword}

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
            </section>
        </>
    )
}
export default ResetPasswordPage