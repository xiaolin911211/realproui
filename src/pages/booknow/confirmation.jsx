import {useContext, useState} from "react";
import {ContextBookNow, UserContext} from "../../contexts/context";
import {httpCommonPost} from "../../api/http-request";
import {
    MESSAGE_SERVER_ERROR,
    MESSAGE_SUCCESS_CREATE_ORDER,
    PAGE_LOG_IN, SESSION_ORDER, SESSION_USER,
    UNAUTHORIZED_CODE, WAIT_EXECUTE
} from "../../common/constants";
import { Loading} from "../../common/sharedComponent";
import {Button} from "flowbite-react";
import {useNavigate} from "react-router-dom";

const Confirmation = ({propertyData, confirmationCallBackMessage,disableButton}) => {
    const {stateBookNow} = useContext(ContextBookNow);
    const {state} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const addingSelectedProductId = () =>{
        const extraItemSelected = stateBookNow.checkedService;
        const tempPropertyServiceSelected = [];
        tempPropertyServiceSelected.push(stateBookNow.selectPropertyService);
        for (const item of extraItemSelected){
            tempPropertyServiceSelected.push(item);
        };

        return tempPropertyServiceSelected;
    };
    const onClickCreateOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        const createPrderResponse = await httpCommonPost(process.env.REACT_APP_BASE_PATH + process.env.REACT_APP_URL_POST_CREATE_ORDER,
            {
                productId: addingSelectedProductId(),
                address: {
                    unitNumber: stateBookNow.unitNumber,
                    streetNumber: stateBookNow.streetNumber,
                    streetName: stateBookNow.streetName,
                    city: stateBookNow.selectPropertyRegion,
                    propertyTypeId: stateBookNow.selectPropertyType,
                    propertySize: stateBookNow.selectPropertySize,
                    postalCode: stateBookNow.postalCode,
                    province: stateBookNow.province,
                },
                scheduleTime: stateBookNow.serviceDatetime,
                isVacant: stateBookNow.vacant,
                note: stateBookNow.additionalComments,
                accessCode: stateBookNow.lockBoxPwd,
                userId: state.userId,
            });
        setLoading(false);
        const [isSuccess, isMessage,isCode] = [createPrderResponse?.data?.success, createPrderResponse?.data?.msg, createPrderResponse?.data?.code];

        confirmationCallBackMessage({
            isDisplay: true,
            isMessage: isSuccess ? MESSAGE_SUCCESS_CREATE_ORDER: (isMessage === undefined ? MESSAGE_SERVER_ERROR : isMessage),
            isSuccess: isSuccess

        });

        if (isCode === UNAUTHORIZED_CODE) {
            setTimeout(function () {
                sessionStorage.removeItem(SESSION_USER);
                sessionStorage.removeItem(SESSION_ORDER);
                navigate(PAGE_LOG_IN, {replace: true})
            }, WAIT_EXECUTE);

        }
    }

    return (
        <>
            <Loading isActive={loading} />
            <div className="py-14 px-14 md:px-10 2xl:px-20 2xl:container 2xl:mx-auto dark:bg-gray-800 rounded-lg ">
                <div className="grid grid-cols-6 gap-4">
                    <div
                        className={
                            "dark:text-white flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full rounded-lg "
                        }
                    >
                        <img src="/FacebookLogo.png" alt="Flowbite Logo"/>
                        RealPro Inc.
                        <p className="text-sm dark:text-white leading-none text-gray-800">
                          <span className="dark:text-gray-400 text-gray-300">
                            291 N 4th St, San Jose, CA 95112, USA
                          </span>
                        </p>
                        <p className="text-sm dark:text-white leading-none text-gray-800">
                          <span className="dark:text-gray-400 text-gray-300">
                            <br></br>
                              {new Date().toJSON()}
                          </span>
                        </p>
                    </div>

                    <div className="col-start-1 col-end-7 ..."></div>

                </div>
                <div
                    className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div
                            className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                                Customer’s Cart
                            </p>

                            <div
                                className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                <div className="pb-4 md:pb-8 w-full md:w-40">
                                    <img
                                        className="w-full hidden md:block"
                                        src={
                                            propertyData?.servicesData?.data?.filter(
                                                (item) => item.propertySizeId === stateBookNow.selectPropertySize
                                            )[0]?.image
                                        }
                                    />
                                </div>
                                <div
                                    className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                        <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                                            {
                                                stateBookNow.propertyServices?.data?.filter(
                                                    (item) => item.productId === stateBookNow.selectPropertyService
                                                )[0]?.productName
                                            }
                                        </h3>
                                    </div>
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                        <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                                            01
                                        </p>
                                        <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                                            $
                                            {
                                                stateBookNow.propertyServices?.data?.filter(
                                                    (item) => item.productId === stateBookNow.selectPropertyService
                                                )[0]?.price
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {stateBookNow.displayCheckService?.map((item, index) => (
                                <div
                                    className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                    <div className="pb-4 md:pb-8 w-full md:w-40">
                                        <img
                                            className="w-full hidden md:block"
                                            src={
                                                propertyData?.servicesData.data?.filter(
                                                    (item) =>
                                                        item.propertySizeId === stateBookNow.selectPropertySize
                                                )[0]?.image
                                            }
                                            alt="dress"
                                        />
                                    </div>
                                    <div
                                        className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                                            <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                                                {item.productName} (Extra Service)
                                            </h3>
                                        </div>
                                        <div className="flex justify-between space-x-8 items-start w-full">
                                            <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                                                01
                                            </p>
                                            <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                                                ${item.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                            Customer
                        </h3>
                        <div
                            className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                            <div className="flex flex-col justify-start items-start flex-shrink-0">
                                <div
                                    className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                    <div
                                        className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-red-500 text-xl text-white uppercase">
                                        jc
                                    </div>
                                    <div className="flex justify-start items-start flex-col space-y-2">
                                        <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800"></p>
                                    </div>
                                </div>

                                <div
                                    className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <p className="cursor-pointer text-sm leading-5 ">
                                        {state.email}
                                    </p>
                                </div>
                                <div
                                    className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <p className="cursor-pointer text-sm leading-5 ">
                                        {state.phone}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                <div
                                    className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                    <div
                                        className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                                            Service Property
                                        </p>
                                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  <span className="dark:text-white">
                                    Type:
                                  </span>
                                            {
                                                propertyData?.propertyTypeData?.data?.filter(
                                                    (item) => item.id === stateBookNow?.selectPropertyType
                                                )[0]?.type
                                            }
                                        </p>
                                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  <span className="dark:text-white ">
                                    Size:{" "}
                                  </span>
                                            {
                                                propertyData?.servicesData?.data?.filter(
                                                    (item) =>
                                                        item.propertySizeId === stateBookNow?.selectPropertySize
                                                )[0]?.propertySizeName
                                            }
                                        </p>
                                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  <span className="dark:text-white">
                                    Address:{" "}
                                  </span>
                                            {stateBookNow.unitNumber +
                                                " - " +
                                                stateBookNow.streetNumber +
                                                " " +
                                                stateBookNow.streetName +
                                                " , " +
                                                stateBookNow.selectPropertyRegion +
                                                " , " +
                                                stateBookNow.province +
                                                " " +
                                                stateBookNow.postalCode}
                                        </p>
                                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  <span className="dark:text-white">
                                    Requested Schedule Time:{" "}
                                  </span>
                                            {/*{stateBookNow.serviceDatetime}*/}
                                        </p>
                                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  <span className="dark:text-white">
                                    vacant:{" "}
                                  </span>
                                            {stateBookNow.vacant
                                                ? "Owner will be away"
                                                : "Owner will be home"}
                                        </p>
                                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  <span className="dark:text-white">
                                    Lock Box Password:{" "}
                                  </span>
                                            {stateBookNow.lockBoxPwd}
                                        </p>
                                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  <span className="dark:text-white">
                                    Comments:{" "}
                                  </span>
                                            {stateBookNow.additionalComments}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Button
                                 disabled={disableButton}
                                onClick={onClickCreateOrder}
                                type="submit"
                                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Book Confirmation
                            </Button>
                        </div>

                    </div>

                </div>


            </div>
        </>
    );
}
export default Confirmation;