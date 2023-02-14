import React,  {useState} from "react";
import {DisplayMessage, Loading} from "../../common/sharedComponent";
import {httpCommonPost} from "../../api/http-request";
import {MESSAGE_SERVER_ERROR, MESSAGE_SUCCESS_REGISTER} from "../../common/constants";
import {Button} from "flowbite-react";
const Registration = () => {
    const [loading, setLoading] = useState(false);
    const [displayMessage, setDisplayMessage] = useState({
        isDisplay: false,
        isMessage: '',
        isSuccess: false
    })
    const [registerInfo, setRegisterInfo] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        phone: '',
        accountTypeId: '1',
        confirmpassword: ''
    })

    const registrationValidationHandler = () => {

        if (!String(registerInfo.email).match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            setDisplayMessage({...displayMessage, isDisplay: true, isMessage: "Invalid Email", isSuccess: false});
            return false;
        } else if (registerInfo.phone.length !== 10) {
            setDisplayMessage({...displayMessage, isDisplay: true, isMessage: "Phone number must be 10 characters", isSuccess: false});
            return false;
        } else if (registerInfo.firstName.length <= 2) {
            setDisplayMessage({...displayMessage, isDisplay: true, isMessage: "First Name needs to be greater than 2 characters", isSuccess: false});
            return false;
        } else if (registerInfo.lastName.length <= 2) {
            setDisplayMessage({...displayMessage, isDisplay: true, isMessage: "Last Name needs to be greater than 2 characters", isSuccess: false});
            return false;
        } else if (registerInfo.password.length < 8) {
            setDisplayMessage({...displayMessage, isDisplay: true, isMessage: "Password must be 8 or more characters", isSuccess: false});
            return false;
        } else if (registerInfo.confirmpassword.length < 8) {
            setDisplayMessage({...displayMessage, isDisplay: true, isMessage: "Reenter Password must be 8 or more characters", isSuccess: false});
            return false;
        } else if (registerInfo.password !== registerInfo.confirmpassword) {
            setDisplayMessage({...displayMessage, isDisplay: true, isMessage: "Password does not match", isSuccess: false});
            return false;
        } else {

            return true;
        }

    }
    const registrationHandler = async (e) => {
        e.preventDefault();
        if (registrationValidationHandler()) {
            setLoading(true);
            const createAccountResponse = await httpCommonPost(process.env.REACT_APP_BASE_PATH + process.env.REACT_APP_URL_URL_REGISTER, registerInfo);
            setLoading(false);
            const isSuccess = createAccountResponse?.data?.success;
            const isMessage = createAccountResponse?.data?.msg;
            setDisplayMessage({
                isDisplay: true,
                isMessage: (isMessage === undefined && isSuccess)  ? MESSAGE_SUCCESS_REGISTER: (isMessage === undefined) ? MESSAGE_SERVER_ERROR: isMessage,
                isSuccess: isSuccess
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
                        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                            <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage} isSuccess={displayMessage.isSuccess}/>
                            <Loading isActive={loading} />
                                <h1 className="dark:text-white block w-full text-center text-gray-800 text-2xl font-bold mb-6">Registration</h1>
                           <form action="/" method="post" onSubmit={registrationHandler}>
                                <div className="flex flex-col mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First
                                        Name</label>

                                    <input
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        type="text" name="first_name" onChange={(e)=>setRegisterInfo({...registerInfo,firstName: e.target.value})}
                                        id="first_name"/>

                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last
                                        Name</label>
                                    <input
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        type="text" name="last_name"  id="last_name" onChange={(e)=>setRegisterInfo({...registerInfo,lastName: e.target.value})}/>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                    <input
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        type="email" name="email" id="email" onChange={(e)=>setRegisterInfo({...registerInfo,email: e.target.value})}/>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone</label>
                                    <input
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        type="text" name="phone" id="phone" onChange={(e)=>setRegisterInfo({...registerInfo,phone: e.target.value})}/>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                                    <input
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        type="password" name="password"
                                        id="password" onChange={(e)=>setRegisterInfo({...registerInfo,password: e.target.value})}/>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm
                                        Password</label>
                                    <input
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        type="password"  name="confirmpassword"
                                        id="confirmpassword" onChange={(e)=>setRegisterInfo({...registerInfo,confirmpassword: e.target.value})}/>
                                </div>
                                <Button
                                    disabled={displayMessage.isSuccess}
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Register
                                </Button>
                            </form>
                           <div
                                href="#"
                                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 text-center"

                            ><a
                                href="../login"
                                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 text-center"

                            >Already have an account? Sign in </a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default Registration