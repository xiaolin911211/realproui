import {useEffect, useState} from "react";
import { useRouter } from "next/router";
const CustomErrorPage = (props) => {
    const [redirectSeconds, setRedirectSeconds] = useState(10);
    const [message, setMessage] = useState("");
    const [redirect, setRedirect] = useState("");
    const [buttonMSG, setButtonMSG] = useState("");
    const router = useRouter();
    useEffect(()=>{
            setMessage(props.messages);
            setRedirect(props.redirect);
            setButtonMSG(props.redirectTag);
        console.log(props);

    },[]);
    useEffect(()=>{
        setTimeout(()=>{
            console.log(redirectSeconds);
            setRedirectSeconds((redirectSeconds) => redirectSeconds -1);
            if (redirectSeconds === 0) {
                console.log('REDIRECT SECOND')
                router.push({
                    pathname: "/login",
                  });
              }
        },1000)
    },[redirectSeconds])



    return (
        <div class="flex items-center justify-center w-screen h-screen">
            <div className="px-4 lg:py-12">
                <div className="lg:gap-4 lg:flex">
                    <div
                        className="flex flex-col items-center justify-center md:py-24 lg:py-32"
                    >
                        <h1 className="font-bold text-blue-600 text-9xl">{props.statusCode} </h1>
                        <p
                            className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl"
                        >
                            <span className="text-red-500"></span> {message} in {redirectSeconds} seconds Or Click below button to redirect directly
                        </p>
                        <a
                            href={redirect}
                            className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
                        >Go {buttonMSG}</a
                        >
                    </div>
                    <div className="mt-4">
                        <img
                            src="https://cdn.pixabay.com/photo/2016/11/22/23/13/black-dog-1851106__340.jpg"
                            alt="img"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CustomErrorPage;