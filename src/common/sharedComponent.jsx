import {Alert, Modal, Spinner} from "flowbite-react";
import {httpCommonGet} from "../api/http-request";

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
            {isDisplay ? (<Alert
                color={isSuccess ? "success" : "failure"}
            >
  <span>
      {isMessage}
  </span>
            </Alert>) : <></>} </>
    )
}
export const FetchDataCache = async (cacheName, url) => {

    const fetchDataResponse = await httpCommonGet(process.env.REACT_APP_BASE_PATH + url);
    if (fetchDataResponse?.data?.code === 200) {
        sessionStorage.setItem(cacheName, JSON.stringify(fetchDataResponse?.data));
    }
    return fetchDataResponse?.data;
}
