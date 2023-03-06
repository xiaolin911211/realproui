import React, {useContext, useState} from "react";
import { UserContext} from "../../contexts/context";
import {CommonLoadHttp, DisplayMessage, DisplayMessagesToUI, Loading} from "../../common/sharedComponent";
import {
    ACTION_SET_ADDITIONAL_COMMENTS, DISPLAY_INIT,
    MESSAGE_SERVER_ERROR, MESSAGE_SUCCESS_CONTACT_US,
    MESSAGE_SUCCESS_CREATE_ORDER, METHOD_POST
} from "../../common/constants";
import {httpCommonPost} from "../../api/http-request";
import {Button} from "flowbite-react";

const Contact = () => {

    const [displayMessage, setDisplayMessage] = useState(DISPLAY_INIT);
    const [contactInput, setContactInput] = useState({
        email: '',
        phone: '',
        name: '',
        message: ''
    });
    const validateInputs = (e) =>{
        if (!String(contactInput.email).match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            setDisplayMessage({
                isDisplay: true,
                isMessage: "Invalid Email",
                isSuccess: false
            });
            return false;
        } else if (!String(contactInput.phone).match("[0-9]{10}")) {
            setDisplayMessage({
                isDisplay: true,
                isMessage: "Phone number must be 10 characters",
                isSuccess: false
            });
            return false;
        } else if (contactInput.name.length <= 1) {
            setDisplayMessage({
                isDisplay: true,
                isMessage: "Name can not be empty",
                isSuccess: false
            });
            return false;
        } else if (contactInput.message.length <= 1) {
            setDisplayMessage({
                isDisplay: true,
                isMessage: "Message can not be empty",
                isSuccess: false
            });
            return false;
        } else {

            return true;
        }
    }
    const contactUsHttpHandler = async (e) => {
        e.preventDefault();
        if (validateInputs()) {
            await CommonLoadHttp({
                url: process.env.REACT_APP_URL_CONTACT_US,
                displayMessage,
                setDisplayMessage,
                request: contactInput,
                token: '',
                method: METHOD_POST,
                isDisplay: true,
                customPageMessage: MESSAGE_SUCCESS_CONTACT_US,
                navigate: ''
            })
        }

    };
    return <div className="relative">
        <div
            className="h-screen w-full "
            style={{
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                backgroundImage: `url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80)`,
            }}
        >
            <div className="flex h-screen justify-center items-center">
                <div
                    className={"bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700"}>
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                        <Loading isActive={displayMessage.loading} />
                       <form action="/" method="post" onSubmit={contactUsHttpHandler}>

                            <div className="mb-6">
                                <h1 className="dark:text-white block w-full text-center text-gray-800 text-2xl font-bold mb-6">Contact Us</h1>
                                <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage} isSuccess={displayMessage.isSuccess}/>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Name"
                                    value={contactInput.name}
                                    onChange={(e) => setContactInput({...contactInput, name: e.target.value})}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone
                                    Number</label>
                                <input
                                    type="number"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Phone"
                                    value={contactInput.phone}
                                    onChange={(e) => setContactInput({...contactInput, phone: e.target.value})}
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email"
                                    value={contactInput.email}
                                    onChange={(e) => setContactInput({...contactInput, email: e.target.value})}
                                />
                            </div>
                            <div className="mb-8">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Message</label>
                                <textarea

                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Message"
                                    value={contactInput.message}
                                    onChange={(e) => setContactInput({...contactInput, message: e.target.value})}
                                />
                            </div>

                            <Button
                                disabled={displayMessage.isSuccess}
                                color="dark"
                                pill={true}
                                type="submit"
                                className="inline-block px-7 py-3  text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Send Message
                            </Button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Contact;