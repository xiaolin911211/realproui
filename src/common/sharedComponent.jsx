import {Alert, Modal, Spinner, Toast} from "flowbite-react";
import {httpCommonGet} from "../api/http-request";
import {PAGE_LOG_IN, SESSION_ORDER, SESSION_USER, UNAUTHORIZED_CODE, WAIT_EXECUTE} from "./constants";

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
            {isDisplay ? ( <Toast><Alert
                color={isSuccess ? "success" : "failure"}
            >
  <span>
      {isMessage}
  </span>
            </Alert><Toast.Toggle /></Toast>) : <></>} </>
    )
}
export const FetchDataCache = async (cacheName, url) => {

    const fetchDataResponse = await httpCommonGet(process.env.REACT_APP_BASE_PATH + url);
    if (fetchDataResponse?.data?.code === 200) {
        sessionStorage.setItem(cacheName, JSON.stringify(fetchDataResponse?.data));
    }
    return fetchDataResponse?.data;
}

export const UnauthorizedLogout = (isCode,navigate) =>{
    if (isCode === UNAUTHORIZED_CODE) {
        console.log()
        setTimeout(function () {
            sessionStorage.removeItem(SESSION_USER);
            sessionStorage.removeItem(SESSION_ORDER);
            navigate(PAGE_LOG_IN, {replace: true})
        }, WAIT_EXECUTE);

    }
}