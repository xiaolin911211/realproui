import React, {useEffect, useState} from "react";
import { v4 } from 'uuid';
import {useNavigate} from "react-router-dom";
import {DisplayMessage, FetchDataCache, Loading} from "../../common/sharedComponent";
import {
    CACHE_SERVICES, DISPLAY_INIT,
    MESSAGE_SERVER_ERROR,
    PAGE_BOOK_NOW,
    SERVICE_TYPE_PHOTO_BODY,
    SERVICE_TYPE_PHOTO_IMAGE,
    SERVICE_TYPE_PHOTO_TITLE, SERVICE_TYPE_VIDEO_BODY,
    SERVICE_TYPE_VIDEO_IMAGE, SERVICE_TYPE_VIDEO_TITLE,
    STATUS_ACTIVE
} from "../../common/constants";
import {Button} from "flowbite-react";
import ServiceTypes from "./service-types";

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
    const onClickBookNow = () =>{
        navigate(PAGE_BOOK_NOW,{replace: true})
    }
    const setServicesHandler = async () =>{
        setDisplayMessage({...displayMessage, 'loading': true});
        const fetchServiceDataResponse = await FetchDataCache(CACHE_SERVICES, process.env.REACT_APP_URL_GET_PRODUCTS);
        setDisplayMessage({...displayMessage, 'loading': false});
        const [isSuccess, isMessage] = [fetchServiceDataResponse?.success,fetchServiceDataResponse?.msg];
        if (isSuccess) {
            setServices(fetchServiceDataResponse);
        } else {
            //only display when error
            setDisplayMessage({
                isDisplay: !isSuccess,
                isMessage: isMessage === undefined ? MESSAGE_SERVER_ERROR: isMessage,
                isSuccess: isSuccess,
                loading: false
            });
        }
    }

    return (
        <div className="min-h-screen dark:bg-gray-900 ">
            <div className="flex justify-center items-center">
                <Loading isActive={displayMessage.loading} />
                <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage} isSuccess={displayMessage.isSuccess}/>
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
                                type="button"
                                key={v4()}
                                className="text-gray-900 bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center  w-full inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Book Now
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
            <ServiceTypes serviceTitle={SERVICE_TYPE_PHOTO_TITLE} serviceContent={SERVICE_TYPE_PHOTO_BODY} imageUrl={SERVICE_TYPE_PHOTO_IMAGE} />
            <ServiceTypes serviceTitle={SERVICE_TYPE_VIDEO_TITLE} serviceContent={SERVICE_TYPE_VIDEO_BODY} imageUrl={SERVICE_TYPE_VIDEO_IMAGE} />
        </div>
    );
};
export default Services;
