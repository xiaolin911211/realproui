import React, {useContext, useEffect} from "react";
import {OrderContext, UserContext} from "../../components/contexts/ContextProvider";
import {HttpGetOrderDetailByUserIDOrderID, HttpPayment} from "../../components/api/RequestAPI";
import order from "../order";

const PurchasePage = () => {
    const {users} = useContext(UserContext);
    const {orders} = useContext(OrderContext);
    console.log('load PurchasePage');
    console.log('load PurchasePage orders',orders);

    const checkOut = async () => {
        const orderDetails = [];
        for (let x=0; x< orders.products.length;x++){
            console.log('inside: ');
            orderDetails.push({"priceInCents": (orders.products[x].price).replace(".",""),"name":orders.products[x].description})
        }
        console.log('orderDetails: ',orderDetails);
        const paymentResponse = await HttpPayment(users.email, users.userName, [
            {
                "priceInCents": 95111,
                "name": "10 photos"
            },
            {
                "priceInCents": 999,
                "name": "6 video"
            }
        ]);

        // console.log('paymentResponse: ', paymentResponse);

    }

    return (<>
            <section>
                <div className="p-5">
                    <div className="py-14 px-14 md:px-10 2xl:px-20 2xl:container 2xl:mx-auto dark:bg-gray-800 rounded-lg ">
                        <h1 className="dark:text-white block w-full text-center text-gray-800 text-2xl font-bold mb-6">Invoice</h1>
                        <div className="grid ">

                            <div
                                className={"dark:text-white flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full"}>
                                <img src="/FacebookLogo.png"
                                     className="object-cover flex flex-col justify-start h-48 w-96 ..."
                                     alt="Flowbite Logo"/>

                                <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">RealPro
                                    Inc.</h1>
                                <br/>
                                <p className="text-sm dark:text-white leading-none text-gray-800"><span
                                    className="dark:text-gray-400 text-gray-300">291
                                    N 4th St, San Jose, CA 95112, USA</span>
                                </p>
                                <br/>
                                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">Order
                                    # {orders.orderNumber}</p>
                                <br/>
                                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">Order Date: {orders.orderDate}</p>

                            </div>

                            <div className="col-start-1 col-end-7 ..."></div>

                        </div>


                        <div
                            className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                            <div
                                className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                                <div
                                    className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                    <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s
                                        Cart</p>

                                    {orders.products.map((item, i) => (<div
                                        className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                        <div className="pb-4 md:pb-8 w-full md:w-40">
                                            <img className="w-full hidden md:block"
                                                 src="https://i.ibb.co/84qQR4p/Rectangle-10.png" alt="dress"/>
                                            <img className="w-full md:hidden"
                                                 src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                                                 alt="dress"/>
                                        </div>
                                        <div
                                            className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{item.description}</h3>
                                                {/*<div className="flex justify-start items-start flex-col space-y-2">*/}
                                                {/*    <p className="text-sm dark:text-white leading-none text-gray-800"><span*/}
                                                {/*        className="dark:text-gray-400 text-gray-300">Type: </span> {item.description}*/}
                                                {/*    </p>*/}
                                                {/*    <p className="text-sm dark:text-white leading-none text-gray-800"><span*/}
                                                {/*        className="dark:text-gray-400 text-gray-300">Description: </span> {item.description}*/}
                                                {/*    </p>*/}
                                                {/*</div>*/}
                                            </div>
                                            <div className="flex justify-between space-x-8 items-start w-full">

                                                <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">01</p>
                                                <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">${item.price}</p>
                                            </div>
                                        </div>
                                    </div>))}
                                </div>
                                <div
                                    className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                    <div
                                        className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                                        <div
                                            className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                            <div className="flex justify-between w-full">
                                                <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                                                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">${orders.payment.totalBeforeTax}</p>
                                            </div>
                                            <div className="flex justify-between items-center w-full">
                                                <p className="text-base dark:text-white leading-4 text-gray-800">Taxes
                                                </p>
                                                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">${orders.payment.taxRate}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                            <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">${orders.payment.total}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div
                                className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
                                <div
                                    className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                                    <div className="flex flex-col justify-start items-start flex-shrink-0">
                                        <div
                                            className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                            <div
                                                className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-red-500 text-xl text-white uppercase">jc
                                            </div>
                                            <div className="flex justify-start items-start flex-col space-y-2">
                                                <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{users.userName}</p>
                                            </div>

                                        </div>

                                        <div
                                            className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round"
                                                      strokeLinejoin="round"/>
                                            </svg>
                                            <p className="cursor-pointer text-sm leading-5 ">{users.email}</p>
                                        </div>
                                        <div
                                            className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                                 fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                                 trokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                            </svg>
                                            <p className="cursor-pointer text-sm leading-5 ">{users.phone}</p>
                                        </div>
                                    </div>
                                    <div
                                        className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                        <div
                                            className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                            <div
                                                className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Service
                                                    Property</p>
                                                <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"><span
                                                    className="dark:text-white">Type: </span>{orders.address.propertyType.name}
                                                </p>
                                                <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"><span
                                                    className="dark:text-white ">Size: </span>{orders.address.propertySize.name}
                                                </p>
                                                <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"><span
                                                    className="dark:text-white">Address: </span> {orders.address.unitNumber + ' - ' + orders.address.streetNumber + ' ' + orders.address.streetName + ' , ' + orders.address.city.name + ' , ' + orders.address.province.name + ' ' + orders.address.postalCode}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                    <button
                                        onClick={checkOut}
                                        type="submit"
                                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                    >
                                        Payment
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default PurchasePage