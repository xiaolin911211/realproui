import React, {useEffect, useState} from "react";
import {v4} from 'uuid';
import {useNavigate} from "react-router-dom";
import {CommonLoadHttp, DisplayMessage, Loading} from "../../common/sharedComponent";
import {
    CACHE_SERVICES,
    DISPLAY_INIT,
    METHOD_GET,
    PAGE_BOOK_NOW,
    SERVICE_TYPE_PHOTO_BODY,
    SERVICE_TYPE_PHOTO_IMAGE,
    SERVICE_TYPE_PHOTO_TITLE,
    SERVICE_TYPE_VIDEO_BODY,
    SERVICE_TYPE_VIDEO_IMAGE,
    SERVICE_TYPE_VIDEO_TITLE,
    STATUS_ACTIVE
} from "../../common/constants";
import {Button} from "flowbite-react";
import ServiceTypes from "./service-types";
import {BTN_WIDE} from "../../common/css-constant";

const Services = () => {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();
    const [displayMessage, setDisplayMessage] = useState(DISPLAY_INIT);
    useEffect(() => {
        const storedServices = sessionStorage.getItem(CACHE_SERVICES);
        //check if session storage have data, if true return else call API
        if (!storedServices) {
            setServicesHandler();
        } else {
            setServices(JSON.parse(storedServices));
        }
    }, []);
    const onClickBookNow = () => {
        navigate(PAGE_BOOK_NOW, {replace: true})
    }
    const setServicesHandler = async () => {
        const httpResponse = await CommonLoadHttp({
            url: process.env.REACT_APP_URL_GET_PRODUCTS,
            displayMessage,
            setDisplayMessage,
            request: '',
            token: '',
            method: METHOD_GET,
            isDisplay: displayMessage.isSuccess,
            customPageMessage: '',
            navigate: '',
            cache: CACHE_SERVICES

        });
        setServices(httpResponse.isData);
    }

    return (
        <div className="min-h-screen dark:bg-gray-900 ">
            <div className="flex justify-center items-center">
                <Loading isActive={displayMessage.loading}/>
                <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage}
                                isSuccess={displayMessage.isSuccess}/>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services?.data?.map((item, index) => (
                        <div key={v4()}
                             className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img
                                    className="rounded-t-lg object-cover h-48 w-96"
                                    src={item.image}
                                    alt=""
                                />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {item.propertySizeName}
                                    </h5>
                                </a>
                                {item.pricing.map((priceItem) => (
                                    priceItem.active === STATUS_ACTIVE ? (
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" key={v4()}>
                                            {priceItem.productName} $
                                            {priceItem.price}
                                        </p>) : null
                                ))}
                            </div>
                            <Button
                                onClick={onClickBookNow}
                                color="dark"
                                pill={true}
                                type="button"
                                key={v4()}
                                className={BTN_WIDE}
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Book Now
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
            <ServiceTypes serviceTitle={SERVICE_TYPE_PHOTO_TITLE} serviceContent={SERVICE_TYPE_PHOTO_BODY}
                          imageUrl={SERVICE_TYPE_PHOTO_IMAGE}/>
            <ServiceTypes serviceTitle={SERVICE_TYPE_VIDEO_TITLE} serviceContent={SERVICE_TYPE_VIDEO_BODY}
                          imageUrl={SERVICE_TYPE_VIDEO_IMAGE}/>
        </div>
    );
};

export default Services;
