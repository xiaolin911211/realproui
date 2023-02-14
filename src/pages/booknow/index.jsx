import React, {useContext, useEffect, useState} from "react";
import {
    CACHE_PROPERTY_REGION,
    CACHE_PROPERTY_TYPE,
    CACHE_SERVICES, MESSAGE_SERVER_ERROR,
    MESSAGE_SUCCESS_CREATE_ORDER, STEP_CONFIRMATION, STEP_CONTACT_INFO, STEP_PROPERTY_INFO,
    STEPPER_INFO
} from "../../common/constants";
import {DisplayMessage, FetchDataCache, Loading} from "../../common/sharedComponent";
import PropertyInfo from "./property-info";
import {Stepper, StepperButton} from "./stepper";
import ContactInfo from "./contact-info";
import ServiceDate from "./service-date";
import Confirmation from "./confirmation";
import {ContextBookNow} from "../../contexts/context";
import {Button} from "flowbite-react";

const BookNow = () => {
    const  {stateBookNow}  = useContext(ContextBookNow);
    const [steps, setSteps] = useState(STEP_PROPERTY_INFO);
    const confirmationCallBackMessage = payload =>{
        setDisplayMessage(payload);
    }
    const [displayMessage, setDisplayMessage] = useState({
        isDisplay: false,
        isMessage: '',
        isSuccess: false,
        loading: false
    })
    const [propertyData, setPropertyData] = useState({
            servicesData: [],
            propertyTypeData: [],
            propertyRegionData: []
        }
    );

    useEffect(() => {
        const servicesData = sessionStorage.getItem(CACHE_SERVICES);
        const propertyTypeData = sessionStorage.getItem(CACHE_PROPERTY_TYPE);
        const propertyRegionData = sessionStorage.getItem(CACHE_PROPERTY_REGION);
        if (!propertyTypeData) {
            setPropertyHandler();
        } else {

            setPropertyData({
                ...propertyData,
                servicesData: JSON.parse(servicesData),
                propertyTypeData: JSON.parse(propertyTypeData),
                propertyRegionData: JSON.parse(propertyRegionData)
            });
        }
    }, [])

    const setPropertyHandler = async () => {
        const fetchServicesData = await FetchDataCache(CACHE_SERVICES, process.env.REACT_APP_URL_GET_PRODUCTS);
        const fetchPropertyType = await FetchDataCache(CACHE_PROPERTY_TYPE, process.env.REACT_APP_URL_GET_PROPERTY_TYPE);
        const fetchPropertyRegion = await FetchDataCache(CACHE_PROPERTY_REGION, process.env.REACT_APP_URL_GET_CITIES)

        if (fetchServicesData.success  && fetchPropertyType.success && fetchPropertyRegion.success) {
            setPropertyData(
                {
                    ...propertyData,
                    servicesData: fetchServicesData,
                    propertyTypeData: fetchPropertyType,
                    propertyRegionData: fetchPropertyRegion
                });


        } else {
            setDisplayMessage({...displayMessage, isDisplay: true, isMessage: MESSAGE_SERVER_ERROR, isSuccess: false})
        }
    };

    const validateService = () => {

        if (stateBookNow.selectPropertyService === '' || stateBookNow.selectPropertyService === 'default') {
            setDisplayMessage({...displayMessage, isDisplay: true, isMessage: "Property Service Is not selected", isSuccess: false})
            return false;
        } else if (stateBookNow.selectPropertySize === '' || stateBookNow.selectPropertySize === 'default') {
            setDisplayMessage({...displayMessage, isDisplay: true, isMessage: "Property Size Is not selected", isSuccess: false})
            return false;
        } else if (stateBookNow.selectPropertyRegion === '' || stateBookNow.selectPropertyRegion === 'default') {
            setDisplayMessage({...displayMessage, isDisplay: true, isMessage: "Property Region Is not selected", isSuccess: false})
            return false;
        } else if (stateBookNow.selectPropertyType === '' || stateBookNow.selectPropertyType === 'default') {
            setDisplayMessage({...displayMessage, isDisplay: true, isMessage: "Property Type Is not selected", isSuccess: false})
            return false;
        } else return true;
    };
    const validateDetail = () => {
        if (!stateBookNow.streetNumber.match("\\d+")) {
            setDisplayMessage({...displayMessage, isDisplay: true, isMessage: "Street Number is not valid", isSuccess: false})
            return false;
        } else if (stateBookNow.streetName.length <= 2) {
            setDisplayMessage({...displayMessage, isDisplay: true, isMessage: "Street Name is not valid", isSuccess: false})
            return false;
        } else if (
            !stateBookNow.postalCode.match(
                "[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}[0-9]{1}"
            )
        ) {
            setDisplayMessage({...displayMessage, isDisplay: true, isMessage: "Postal Code", isSuccess: false})
            return false;
        } else {
            return true;
        }
    };
    const onClickNextStep = (e) => {
        e.preventDefault();
        if (steps === STEP_PROPERTY_INFO && validateService()){
            setSteps(steps + 1);
            setDisplayMessage({})
        } else if (steps === STEP_CONTACT_INFO && validateDetail()){
            setSteps(steps + 1);
            setDisplayMessage({})
        }
    };
    const onClickPreStep = (e) => {
        e.preventDefault();
        setSteps(steps - 1);
        setDisplayMessage({})
    }

    return (
        <section>
            <div className="relative">
                <div className="min-h-screen w-full dark:bg-gray-900">
                    <div className="p-5">
                        <div className="mx-4 p-4">
                            <div className="flex items-center">
                                <div className="flex items-center text-teal-600 relative">
                                    <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0">
                                        {STEPPER_INFO.map((item, index) => (
                                            <Stepper steps={steps} heading={item.name} itemId={item.id} key={index}/>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage} isSuccess={displayMessage.isSuccess}/>
                    {steps === STEP_PROPERTY_INFO ? <PropertyInfo propertyData={propertyData}/> : <></>}
                    {steps === STEP_CONTACT_INFO ? <><ServiceDate/> <ContactInfo/></> : <></>}
                    {steps === STEP_CONFIRMATION ? <Confirmation propertyData={propertyData} confirmationCallBackMessage={confirmationCallBackMessage} disableButton={displayMessage.isSuccess}/> : <></>}
                    <div className="flex p-2 mt-4">
                        <StepperButton steps={steps} button={"Previous"} onShow={onClickPreStep} disablePrevious={displayMessage.isSuccess}/>
                        <div className="flex-auto flex flex-row-reverse">
                            <StepperButton steps={steps} button={"Next"} onShow={onClickNextStep}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookNow;