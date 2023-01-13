import {React, useRef, useState} from "react";
import {HttpContactUs, HttpLogin} from "../../components/api/RequestAPI";

const ContactPage = () => {
    const email = useRef("");
    const name = useRef("");
    const phone = useRef("");
    const message = useRef("");
    const [status, setStatus] = useState(2);
    const [displayMSG, setDisplayMSG] = useState("")
    const contactUsHttpHandler = async (e) => {
        e.preventDefault();
        console.log("name.current.value",name.current.value)
        console.log("status",status)
        console.log("displayMSG",displayMSG)
        console.log("validateInput",validateInput())
        if (validateInput()) {
            const contactUsResponse = await HttpContactUs(name.current.value, email.current.value, phone.current.value, message.current.value);
            if (contactUsResponse.status === 200 && contactUsResponse?.data?.success) {
                setStatus(1);
                setDisplayMSG("Message was sent, we will get back to you as soon as possible");
            } else {
                setStatus(0);
                setDisplayMSG(contactUsResponse?.data?.msg ? contactUsResponse?.data?.msg : "We are experiencing technical difficulties please try again later");
            }
        }

    };

    const validateInput = () =>{
        if (!String(email.current.value).match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            setStatus(0);
            setDisplayMSG("Invalid Email");
            return false;
        } else if (!String(phone.current.value).match("[0-9]{10}")) {
            setStatus(0);
            setDisplayMSG("Phone number must be 10 characters");
            return false;
        } else if (name.current.value.length <= 2) {
            setStatus(0);
            setDisplayMSG("First Name needs to be greater than 2 characters");
            return false;
        } else if (message.current.value.length <= 1) {
            setStatus(0);
            setDisplayMSG("Message can not be empty");
            return false;
        } else {

            return true;
        }
    }
    return (
        <div className="relative">
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
                                <h1 className="dark:text-white block w-full text-center text-gray-800 text-2xl font-bold mb-6">Contact
                                    Us</h1>) : null}
                            {status != 1 ? (<form action="/" method="post" onSubmit={contactUsHttpHandler}>

                            <div className="mb-6">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Name"
                                    ref={name}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone
                                    Number</label>
                                <input
                                    type="number"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Phone"
                                    ref={phone}
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email"
                                    ref={email}
                                />
                            </div>
                            <div className="mb-8">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Message</label>
                                <textarea

                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Message"
                                    ref={message}
                                />
                            </div>

                            <button
                                type="submit"
                                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Send Message
                            </button>

                        </form>) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <>
        //     <section className="h-screen class">
        //         <div className="container px-6 py-12 h-full">
        //             <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
        //                 <div
        //                     className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        //                     <img src={'/contactus.jpg'}/>
        //                         <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Contact Us</h5>
        //
        //                     <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><img className="inline w-13 h-12 rounded-full" src="/WechatLogo.png"
        //                     />WECHAT XIAO</h5>
        //                     <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> <img className="inline w-10 h-10 rounded-full" src="/phoneLogo.png"
        //                     />6477746619 /4161234567</h5>
        //                     <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><img className="inline w-13 h-12 rounded-full" src="/FacebookLogo.png"
        //                     />xiao@facebook.ca</h5>
        //                 </div>
        //
        //                 <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
        //                     <div className="profile mx-auto  text-4xl font-medium mt-4 rounded-full ">
        //                         <p>Contact Us</p>
        //                     </div>
        //                     {status == 2 ? (<form onSubmit={contactUsHttpHandler}>
        //
        //                         <div className="mb-6">
        //                             <input
        //                                 type="text"
        //                                 className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        //                                 placeholder="Name"
        //                                 ref={name}
        //                             />
        //                         </div>
        //
        //                         <div className="mb-6">
        //                             <input
        //                                 type="number"
        //                                 className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        //                                 placeholder="Phone"
        //                                 ref={phone}
        //                             />
        //                         </div>
        //                         <div className="mb-6">
        //                             <input
        //                                 type="email"
        //                                 className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        //                                 placeholder="Email"
        //                                 ref={email}
        //                             />
        //                         </div>
        //                         <div className="mb-8">
        //                             <textarea
        //
        //                                 className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        //                                 placeholder="Message"
        //                                 ref={message}
        //                             />
        //                         </div>
        //
        //                         <button
        //                             type="submit"
        //                             className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        //                             data-mdb-ripple="true"
        //                             data-mdb-ripple-color="light"
        //                         >
        //                             Send Message
        //                         </button>
        //
        //                     </form>) : status == 0 ?
        //                         (<div className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-white-700 mb-3"
        //                               role="alert">
        //                             {displayMSG}
        //                         </div>) : status == 1 ? (<div
        //                             className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-white-700 mb-3"
        //                             role="alert">
        //                             {displayMSG}
        //                         </div>) : null}
        //
        //
        //                 </div>
        //             </div>
        //         </div>
        //     </section>
        // </>

    )
}
export default ContactPage