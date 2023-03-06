import React, {useState} from "react";
import {CommonLoadHttp, DisplayMessage, Loading} from "../../common/sharedComponent";
import {DISPLAY_INIT, MESSAGE_SUCCESS_FORGOT_PWD, METHOD_POST} from "../../common/constants";
import {Button} from "flowbite-react";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [displayMessage, setDisplayMessage] = useState(DISPLAY_INIT);

    const onClickResetPassword = async (e) => {
        e.preventDefault();

        await CommonLoadHttp({
            url: process.env.REACT_APP_URL_FORGOTPASSWORD,
            displayMessage,
            setDisplayMessage,
            request: {'email': email},
            token: '',
            method: METHOD_POST,
            isDisplay: true,
            customPageMessage: MESSAGE_SUCCESS_FORGOT_PWD,
            navigate: ''
        })

    }
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

                            <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage}
                                            isSuccess={displayMessage.isSuccess}/>
                            <h1 className="dark:text-white block w-full text-center text-gray-800 text-2xl font-bold mb-6">Forgot
                                Password</h1>


                            <div className="mb-6">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />
                                <Loading isActive={displayMessage.loading}/>
                            </div>

                            <Button
                                disabled={displayMessage.isSuccess}
                                color="dark"
                                onClick={onClickResetPassword}
                                pill={true}
                                type="submit"
                                className="inline-block px-7 py-3  text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg ease-in-out w-full"

                            >
                                Reset Password
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}
export default ForgotPassword;