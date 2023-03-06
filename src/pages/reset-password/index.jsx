import {Button} from "flowbite-react";
import {INPUT_BLUE_BG} from "../../common/css-constant";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {DISPLAY_INIT, MESSAGE_SUCCESS_FORGOT_PWD, METHOD_POST} from "../../common/constants";
import {CommonLoadHttp, DisplayMessage, Loading} from "../../common/sharedComponent";


const ResetPassword = () => {
    const {email, token} = useParams();
    const [displayMessage, setDisplayMessage] = useState(DISPLAY_INIT);
    const [credential, setCredential] = useState({
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (!email && !token) {
            return;
        }
    }, []);
    const onClickResetPassword = async (e) => {
        e.preventDefault();
        if (resetPasswordValidation()) {
            await CommonLoadHttp({
                url: process.env.REACT_APP_URL_RESET_PWD,
                displayMessage,
                setDisplayMessage,
                request: {
                    "password": credential.password,
                    "email": email,
                    "token": token

                },
                token: '',
                method: METHOD_POST,
                isDisplay: true,
                customPageMessage: MESSAGE_SUCCESS_FORGOT_PWD,
                navigate: ''
            })

        }

    };

    const resetPasswordValidation = () => {

        if (credential.password.length < 8) {
            setDisplayMessage({
                ...displayMessage,
                isDisplay: true,
                isMessage: "Password must be 8 or more characters",
                isSuccess: false
            });
            return false;
        } else if (credential.confirmPassword.length < 8) {
            setDisplayMessage({
                ...displayMessage,
                isDisplay: true,
                isMessage: "Confirmation Password must be 8 or more characters",
                isSuccess: false
            });
            return false;
        } else if (credential.password !== credential.confirmPassword) {
            setDisplayMessage({
                ...displayMessage,
                isDisplay: true,
                isMessage: "Password does not match",
                isSuccess: false
            });
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
                            <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage}
                                            isSuccess={displayMessage.isSuccess}/>
                            <Loading isActive={displayMessage.loading}/>
                            <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Reset
                                Password</h1>

                            <div className="mb-6">
                                <label className="mb-2 font-bold text-lg text-gray-900">Email</label>
                                <input
                                    disabled={true}
                                    type="text"
                                    className={INPUT_BLUE_BG}
                                    placeholder="Email address"
                                    value={email}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="mb-2 font-bold text-lg text-gray-900">Password</label>
                                <input
                                    type="password"
                                    className={INPUT_BLUE_BG}
                                    placeholder="Password"
                                    value={credential.password}
                                    onChange={(e) => setCredential({...credential, password: e.target.value})}/>
                            </div>
                            <div className="mb-6">
                                <label className="mb-2 font-bold text-lg text-gray-900">Confirm Password</label>
                                <input
                                    type="password"
                                    className={INPUT_BLUE_BG}
                                    placeholder="Confirm password"
                                    value={credential.confirmPassword}
                                    onChange={(e) => setCredential({...credential, confirmPassword: e.target.value})}/>
                            </div>
                            <Button
                                color="dark"
                                pill={true}
                                disabled={displayMessage.isSuccess}
                                onClick={onClickResetPassword}
                                type="submit"
                                className="inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Reset Password
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ResetPassword;