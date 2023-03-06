import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {DisplayMessage, DisplayMessagesToUI, Loading} from "../../common/sharedComponent";
import {DISPLAY_INIT, MESSAGE_SUCCESS_ACTIVATION} from "../../common/constants";
import {httpCommonPost} from "../../api/http-request";


const Activation = () => {
    const {token} = useParams();
    const [displayMessage, setDisplayMessage] = useState(DISPLAY_INIT);
    useEffect(() => {
        if (!token) {
            return;
        } else {
            httpActivateAccount();
        }
    }, []);
    const httpActivateAccount = async (e) =>{
        const activateAccountResponse = await httpCommonPost(process.env.REACT_APP_BASE_PATH + process.env.REACT_APP_URL_USER_ACTIVATION, {
            "activationToken": token
        });
        setDisplayMessage({...displayMessage, loading: false});
        const [isSuccess, isMessage,isCode] = [activateAccountResponse?.data?.success,activateAccountResponse?.data?.msg,activateAccountResponse?.data?.code];
        DisplayMessagesToUI({setDisplayMessage,isDisplay: true, isSuccess : isSuccess,isCode,isMessage,customPageMessage:MESSAGE_SUCCESS_ACTIVATION,navigate:''});

    };
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

                            <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Activate Account</h1>
                            <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage} isSuccess={displayMessage.isSuccess}/>
                            <Loading isActive={displayMessage.loading} />

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Activation;