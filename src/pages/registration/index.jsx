import React,  {useState} from "react";
import {CommonLoadHttp, DisplayMessage, DisplayMessagesToUI, Loading} from "../../common/sharedComponent";
import {httpCommonPost} from "../../api/http-request";
import {DISPLAY_INIT, MESSAGE_SERVER_ERROR, MESSAGE_SUCCESS_REGISTER, METHOD_POST} from "../../common/constants";
import {Button} from "flowbite-react";
import {BTN_WIDE, INPUT_BLUE_BG} from "../../common/css-constant";
const Registration = () => {
    const [displayMessage, setDisplayMessage] = useState(DISPLAY_INIT);
    const [registerInfo, setRegisterInfo] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        phone: '',
        accountTypeId: '1',
        confirmpassword: ''
    });

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
            setDisplayMessage({...displayMessage, isDisplay: true, isMessage: "Confirmation Password must be 8 or more characters", isSuccess: false});
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
            await CommonLoadHttp({
                url: process.env.REACT_APP_URL_URL_REGISTER,
                displayMessage,
                setDisplayMessage,
                request: registerInfo,
                token: '',
                method: METHOD_POST,
                isDisplay: true,
                customPageMessage: MESSAGE_SUCCESS_REGISTER,
                navigate: ''
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
                            <Loading isActive={displayMessage.loading} />
                                <h1 className="dark:text-white block w-full text-center text-gray-800 text-2xl font-bold mb-6">Registration</h1>
                           <form action="/" method="post" onSubmit={registrationHandler}>
                                <div className="flex flex-col mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First
                                        Name</label>

                                    <input
                                        className={INPUT_BLUE_BG}
                                        type="text" name="first_name" onChange={(e)=>setRegisterInfo({...registerInfo,firstName: e.target.value})}
                                        id="first_name"/>

                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last
                                        Name</label>
                                    <input
                                        className={INPUT_BLUE_BG}
                                        type="text" name="last_name"  id="last_name" onChange={(e)=>setRegisterInfo({...registerInfo,lastName: e.target.value})}/>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                    <input
                                        className={INPUT_BLUE_BG}
                                        type="email" name="email" id="email" onChange={(e)=>setRegisterInfo({...registerInfo,email: e.target.value})}/>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone</label>
                                    <input
                                        className={INPUT_BLUE_BG}
                                        type="text" name="phone" id="phone" onChange={(e)=>setRegisterInfo({...registerInfo,phone: e.target.value})}/>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                                    <input
                                        className={INPUT_BLUE_BG}
                                        type="password" name="password"
                                        id="password" onChange={(e)=>setRegisterInfo({...registerInfo,password: e.target.value})}/>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm
                                        Password</label>
                                    <input
                                        className={INPUT_BLUE_BG}
                                        type="password"  name="confirmpassword"
                                        id="confirmpassword" onChange={(e)=>setRegisterInfo({...registerInfo,confirmpassword: e.target.value})}/>
                                </div>
                                <Button
                                    disabled={displayMessage.isSuccess}
                                    color="dark"
                                    pill={true}
                                    type="submit"
                                    className={BTN_WIDE}
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