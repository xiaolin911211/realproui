import {Alert, Label, Modal, Spinner} from "flowbite-react";
import {httpCommonGet, httpCommonPost, httpCommonPut} from "../api/http-request";
import {
    CACHE_PROPERTY_REGION,
    CACHE_PROPERTY_TYPE, CACHE_SCHEDULE_TIME,
    CACHE_SERVICES,
    MESSAGE_SERVER_ERROR,
    MESSAGE_UNAUTHORIZED, METHOD_GET, METHOD_POST, METHOD_PUT, ACTION_SET_USER_ID,
    PAGE_LOG_IN,
    SESSION_ORDER,
    SESSION_USER,
    UNAUTHORIZED_CODE,
    WAIT_EXECUTE
} from "./constants";

export const Loading = ({isActive}) => {
    return (
        <>
            <Modal
                show={isActive}
                position="center"
            >
                <Modal.Body>
                    <div className="flex flex-col gap-2">

                        <div className="text-center">
                            <Spinner aria-label="Center-aligned spinner example"/>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export const DisplayMessage = ({isMessage, isSuccess, isDisplay}) => {
    return (<>
            {isDisplay ? (  <Alert
                color={isSuccess ? "success" : "failure"}
            >
  <span>
      {isMessage}
  </span>
            </Alert>) : <></>} </>
    )
}

export const UnauthorizedLogout = (isCode,navigate) =>{
    if (isCode === UNAUTHORIZED_CODE) {
        setTimeout(function () {
            sessionStorage.removeItem(SESSION_USER);
            sessionStorage.removeItem(SESSION_ORDER);
            navigate(PAGE_LOG_IN, {replace: true})
        }, WAIT_EXECUTE);

    }
}
export const AddingSelectedProductId = ({stateBookNow}) =>{
    //Add selected service product with extra service ID
    const extraItemSelected = stateBookNow.checkedService;
    const tempPropertyServiceSelected = [];
    tempPropertyServiceSelected.push(stateBookNow.selectPropertyService);
    for (const item of extraItemSelected){
        tempPropertyServiceSelected.push(parseInt(item));
    }

    return tempPropertyServiceSelected;
};
export const CheckPropertyCache = ({propertyData, setPropertyData, displayMessage,setDisplayMessage}) => {
    const servicesData = sessionStorage.getItem(CACHE_SERVICES);
    const propertyTypeData = sessionStorage.getItem(CACHE_PROPERTY_TYPE);
    const propertyRegionData = sessionStorage.getItem(CACHE_PROPERTY_REGION);
    const scheduleData = sessionStorage.getItem(CACHE_SCHEDULE_TIME);

    if (!propertyTypeData || !servicesData || !propertyRegionData || !scheduleData) {

        SetPropertyHandler({propertyData, setPropertyData, displayMessage,setDisplayMessage});
    } else {
        setPropertyData({
            ...propertyData,
            servicesData: JSON.parse(servicesData),
            propertyTypeData: JSON.parse(propertyTypeData),
            propertyRegionData: JSON.parse(propertyRegionData),
            scheduleTimeData: JSON.parse(scheduleData)
        });
    }
};

export const SetPropertyHandler = async ({propertyData, setPropertyData, displayMessage,setDisplayMessage}) => {
    const fetchServicesData = await CommonLoadHttp({
        url: process.env.REACT_APP_URL_GET_PRODUCTS,
        displayMessage,
        setDisplayMessage,
        request: '',
        token: '',
        method: METHOD_GET,
        isDisplay: !displayMessage.isSuccess,
        customPageMessage: '',
        navigate: '',
        cache:CACHE_SERVICES
    });
    const fetchPropertyType = await CommonLoadHttp({
        url: process.env.REACT_APP_URL_GET_PROPERTY_TYPE,
        displayMessage,
        setDisplayMessage,
        request: '',
        token: '',
        method: METHOD_GET,
        isDisplay: !displayMessage.isSuccess,
        customPageMessage: '',
        navigate: '',
        cache:CACHE_PROPERTY_TYPE
    });
    const fetchPropertyRegion = await CommonLoadHttp({
        url: process.env.REACT_APP_URL_GET_CITIES,
        displayMessage,
        setDisplayMessage,
        request: '',
        token: '',
        method: METHOD_GET,
        isDisplay: !displayMessage.isSuccess,
        customPageMessage: '',
        navigate: '',
        cache:CACHE_PROPERTY_REGION
    });
    const fetchScheduleData = await CommonLoadHttp({
        url: process.env.REACT_APP_URL_GET_ARRIVE_TIME,
        displayMessage,
        setDisplayMessage,
        request: '',
        token: '',
        method: METHOD_GET,
        isDisplay: !displayMessage.isSuccess,
        customPageMessage: '',
        navigate: '',
        cache:CACHE_SCHEDULE_TIME
    });
    if (fetchServicesData.isSuccess  && fetchPropertyType.isSuccess && fetchPropertyRegion.isSuccess && fetchScheduleData.isSuccess) {
        setPropertyData(
            {
                ...propertyData,
                servicesData: fetchServicesData.isData,
                propertyTypeData: fetchPropertyType.isData,
                propertyRegionData: fetchPropertyRegion.isData,
                scheduleTimeData: fetchScheduleData.isData
            });
    }
};
export const CommonLoadHttp = async ({url,displayMessage, setDisplayMessage,request, token, method,isDisplay,customPageMessage,navigate,cache }) => {
    setDisplayMessage({...displayMessage, loading: true});
    let httpResponse;
    switch (method) {
        case METHOD_GET:
            httpResponse = await httpCommonGet(process.env.REACT_APP_BASE_PATH + url, request,token);
            break;
        case METHOD_POST:
            httpResponse = await httpCommonPost(process.env.REACT_APP_BASE_PATH + url, request,token);
            break;
        case METHOD_PUT:
            httpResponse = await httpCommonPut(process.env.REACT_APP_BASE_PATH + url, request,token);
        // eslint-disable-next-line no-fallthrough
        default:
            break;
    }
    const [isSuccess, isMessage, isCode, isData] = [httpResponse?.data?.success, httpResponse?.data?.msg, httpResponse?.data?.code, httpResponse?.data];

    if (cache !== undefined && isSuccess){
        sessionStorage.setItem(cache, JSON.stringify(isData));
    }
    DisplayMessagesToUI({setDisplayMessage,isDisplay,isSuccess,isCode,isMessage,customPageMessage: customPageMessage, navigate})
    console.log('Is Data: ',isData);
    return {isSuccess,isData};
}
export const DisplayMessagesToUI = ({setDisplayMessage,isDisplay, isSuccess,isCode,isMessage,customPageMessage,navigate}) =>{

    setDisplayMessage({
        isDisplay: isDisplay,
        isMessage: isCode === UNAUTHORIZED_CODE ? MESSAGE_UNAUTHORIZED : (isSuccess ? customPageMessage: (isMessage === undefined ? MESSAGE_SERVER_ERROR : isMessage)),
        isSuccess: isSuccess,
        loading: false
    });

    UnauthorizedLogout(isCode,navigate);
};


export const DropDownAgent = ({userList,dispatchSelect,setDispatchSelect}) =>{
    return(
        <> 
        <Label>Agent</Label>
        <select
        id="agent"
        value={dispatchSelect.userId}
        onChange={(e) => setDispatchSelect({type: ACTION_SET_USER_ID, value: e.target.value})}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
        <option selected></option>
        {userList?.map((row) => (
         <option value={row.userId}>{row.firstName} {row.lastName} - {row.email} - {row.userId}</option>))}

    </select>
    </>
    );
}