import {useContext} from "react";
import {ContextBookNow, UserContext} from "../../contexts/context";
import {COMMON_CREATE_ORDER_REQUEST} from "../../common/constants";
import {CommonLoadHttp, Loading} from "../../common/sharedComponent";
import {Button} from "flowbite-react";
import CartProducts from './cart-products';

const Confirmation = ({propertyData,disableButton, displayMessage, setDisplayMessage}) => {
    const {stateBookNow} = useContext(ContextBookNow);
    const {state} = useContext(UserContext);
    const currentDate = new Date();


    const onClickCreateOrder = async (e) => {
        e.preventDefault();
        await CommonLoadHttp(COMMON_CREATE_ORDER_REQUEST({displayMessage,setDisplayMessage,stateBookNow,state}));
    }

    return (
        <>
            <Loading isActive={displayMessage.loading} />
            <div className="py-14 px-14 md:px-10 2xl:px-20 2xl:container 2xl:mx-auto dark:bg-gray-800 rounded-lg ">

                    <div className="flex justify-start item-start space-y-2 flex-col">
                        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order
                            Confirmation</h1>
                        <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">{currentDate.toISOString().split('T')[0] + " "+currentDate.toLocaleTimeString()}</p>
                    </div>
                    <div className="col-start-1 col-end-7 ..."></div>


                <div
                    className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div
                            className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                                Customer’s Cart
                            </p>

                            <CartProducts  propertyData = {propertyData} stateBookNow = {stateBookNow}/>
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
                                    Requested Schedule Date Time:{" "}
                                  </span>
                                            {stateBookNow.serviceDatetime.toISOString().slice(0, 10) + " " + stateBookNow.serviceArriveTime}
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
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                 color="dark"
                                 pill={true}
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