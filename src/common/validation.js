import {COMMON_RETURN_DISPLAY} from "./constants";

export const validateService = ({stateBookNow, displayMessage, setDisplayMessage}) => {

    let errorMessage ="";
    if (stateBookNow.selectPropertyService === '' || stateBookNow.selectPropertyService === 'default') {
        errorMessage="Property Service Is not selected";
    } else if (stateBookNow.selectPropertySize === '' || stateBookNow.selectPropertySize === 'default') {
        errorMessage="Property Size Is not selected";
    } else if (stateBookNow.selectPropertyRegion === '' || stateBookNow.selectPropertyRegion === 'default') {
        errorMessage="Property Region Is not selected";
    } else if (stateBookNow.selectPropertyType === '' || stateBookNow.selectPropertyType === 'default') {
        errorMessage="Property Type Is not selected";
    }

    if (errorMessage === ""){
        return true;
    } else {
        setDisplayMessage(COMMON_RETURN_DISPLAY({displayMessage,isMessage: "Street Number is not valid"}));
        return false;
    }

};

export const validateDetail = ({stateBookNow, displayMessage, setDisplayMessage}) => {
    if (!stateBookNow.streetNumber.match("\\d+")) {
        setDisplayMessage(COMMON_RETURN_DISPLAY({displayMessage,isMessage: "Street Number is not valid"}));
        return false;
    } else if (stateBookNow.streetName.length <= 2) {
        setDisplayMessage(COMMON_RETURN_DISPLAY({displayMessage,isMessage: "Street Name is not valid"}));
        return false;
    } else if (!stateBookNow.postalCode.match("[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}[0-9]{1}")) {
        setDisplayMessage(COMMON_RETURN_DISPLAY({displayMessage,isMessage: "Postal Code is not valid"}));
        return false;
    } else {
        return true;
    }
};

export const validateScheduleTime = ({stateBookNow, displayMessage, setDisplayMessage}) => {
    if (stateBookNow.serviceDatetime === '' || stateBookNow.serviceDatetime === 'default') {
        setDisplayMessage(COMMON_RETURN_DISPLAY({displayMessage,isMessage: "Please select a Date"}));
        return false;
    } else if (stateBookNow.serviceArriveTime === '' || stateBookNow.serviceArriveTime === 'default') {
        setDisplayMessage(COMMON_RETURN_DISPLAY({displayMessage,isMessage: "Please select arrive time"}));
        return false;
    } else return true;
};