import React, {useContext, useEffect, useState} from "react";
import {
    DISPLAY_INIT,
    PROPERTY_INIT,
    STEP_CONFIRMATION,
    STEP_CONTACT_INFO,
    STEP_PROPERTY_INFO,
    STEPPER_INFO
} from "../../common/constants";
import {CheckPropertyCache, DisplayMessage} from "../../common/sharedComponent";
import PropertyInfo from "./property-info";
import {Stepper, StepperButton} from "./stepper";
import ContactInfo from "./contact-info";
import ServiceDate from "./service-date";
import Confirmation from "./confirmation";
import {ContextBookNow} from "../../contexts/context";
import {validateDetail, validateScheduleTime, validateService} from "../../common/validation";

const BookNow = () => {
    const {stateBookNow, dispatchBookNow} = useContext(ContextBookNow);
    const [steps, setSteps] = useState(STEP_PROPERTY_INFO);
    const [displayMessage, setDisplayMessage] = useState(DISPLAY_INIT)
    const [propertyData, setPropertyData] = useState(PROPERTY_INIT);


    useEffect(() => {
        CheckPropertyCache({propertyData, setPropertyData, displayMessage, setDisplayMessage});
    }, []);

    const onClickNextStep = (e) => {
        e.preventDefault();
        if (steps === STEP_PROPERTY_INFO && validateService({stateBookNow, displayMessage, setDisplayMessage})) {
            setSteps(steps + 1);
            setDisplayMessage({})
        } else if (steps === STEP_CONTACT_INFO && validateDetail({stateBookNow, displayMessage, setDisplayMessage}) && validateScheduleTime({stateBookNow, displayMessage, setDisplayMessage})) {
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
                    <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage}
                                    isSuccess={displayMessage.isSuccess}/>
                    {steps === STEP_PROPERTY_INFO ? <PropertyInfo propertyData={propertyData} propertyInfo={stateBookNow} setPropertyInfo={dispatchBookNow}/> : <></>}
                    {steps === STEP_CONTACT_INFO ? <><ServiceDate propertyData={propertyData?.scheduleTimeData?.data} serviceDates={stateBookNow} setServiceDates={dispatchBookNow}/>
                        <ContactInfo contactInfo={stateBookNow} setContactInfo={dispatchBookNow}/></> : <></>}
                    {steps === STEP_CONFIRMATION ?
                        <Confirmation propertyData={propertyData} disableButton={displayMessage.isSuccess}
                                      displayMessage={displayMessage} setDisplayMessage={setDisplayMessage}/> : <></>}
                    <div className="flex p-2 mt-4">
                        <StepperButton steps={steps} button={"Previous"} onShow={onClickPreStep}
                                       disablePrevious={displayMessage.isSuccess}/>
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