import React, {useRef, useState} from "react";
import {HttpRegister} from "../../components/api/RequestAPI";
import {AGENT_ACCOUNT} from "../../components/constant/Constants";

const RegistrationPage = () => {
    console.log('Load Registration Page');
    const [status, setStatus] = useState(2);
    const [displayMSG, setDisplayMSG] = useState("");
    const email = useRef("");
    const first_name = useRef("");
    const last_name = useRef("");
    const phone = useRef("");
    const password = useRef("");
    const confirmpassword = useRef("");

    const registrationValidationHandler = () => {
        if (!String(email.current.value).match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            setStatus(0);
            setDisplayMSG("Invalid Email");
            return false;
        } else if (phone.current.value.length !== 10) {
            setStatus(0);
            setDisplayMSG("Phone number must be 10 characters");
            return false;
        } else if (first_name.current.value.length <= 2) {
            setStatus(0);
            setDisplayMSG("First Name needs to be greater than 2 characters");
            return false;
        } else if (last_name.current.value.length <= 2) {
            setStatus(0);
            setDisplayMSG("Last Name needs to be greater than 2 characters");
            return false;
        } else if (password.current.value.length < 8) {
            setStatus(0);
            setDisplayMSG("Password must be 8 or more characters");
            return false;
        } else if (confirmpassword.current.value.length < 8) {
            setStatus(0);
            setDisplayMSG("Reenter Password must be 8 or more characters");
            return false;
        } else if (password.current.value !== confirmpassword.current.value) {
            setStatus(0);
            setDisplayMSG("Password does not match");
            return false;
        } else {

            return true;
        }

    }
    const registrationHandler = async (e) => {
        e.preventDefault();
        if (registrationValidationHandler()) {
            const httpRegisterResponse = await HttpRegister(first_name.current.value, last_name.current.value, phone.current.value, email.current.value, password.current.value, AGENT_ACCOUNT);
            console.log(httpRegisterResponse);

            if (httpRegisterResponse.status === 200 && httpRegisterResponse?.data?.success) {
                setStatus(1);
                setDisplayMSG("Account registered successfully please check your email to Activate account")
            } else {
                setStatus(0);
                setDisplayMSG(httpRegisterResponse?.data?.msg ? httpRegisterResponse?.data?.msg : "We are experiencing technical difficulties please try again later");
            }

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
                                <h1 className="dark:text-white block w-full text-center text-gray-800 text-2xl font-bold mb-6">Registration</h1>) : null}
                            {status != 1 ? (<form action="/" method="post" onSubmit={registrationHandler}>
                                <div className="flex flex-col mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First
                                        Name</label>

                                    <input
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        type="text" name="first_name" ref={first_name}
                                        id="first_name"/>

                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last
                                        Name</label>
                                    <input
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        type="text" name="last_name" ref={last_name} id="last_name"/>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                    <input
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        type="email" name="email" ref={email} id="email"/>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone</label>
                                    <input
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        type="text" name="phone" ref={phone} id="phone"/>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                                    <input
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        type="password" ref={password} name="password"
                                        id="password"/>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm
                                        Password</label>
                                    <input
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        type="password" ref={confirmpassword} name="confirmpassword"
                                        id="confirmpassword"/>
                                </div>
                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Register
                                </button>
                            </form>) : null}
                            {status != 1 ? (<div
                                href="#"
                                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 text-center"

                            ><a
                                href="../login"
                                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 text-center"

                            >Already have an account? Sign in </a></div>) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default RegistrationPage