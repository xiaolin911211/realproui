import {
    CACHE_SERVICES,
    DISPLAY_INIT,
    MESSAGE_SUCCESS_UPDATE_PRODUCT,
    METHOD_GET,
    METHOD_PUT,
    SERVICES_HEADER
} from "../../common/constants";
import {CommonLoadHttp, DisplayMessage, Loading} from "../../common/sharedComponent";
import React, {useEffect, useState} from "react";

import SidebarAdmin from "../../navigation/sidebar";
import ProductsTable from "./tables";
import AdminProductsModalEdit from "./model-edit";

const AdminProducts = () =>{
    const [services, setServices] = useState([]);
    const [displayMessage, setDisplayMessage] = useState(DISPLAY_INIT);
    const [displayProduct, setDisplayProduct] = useState([]);
    const [selectStatus, setSelectStatus] = useState('default');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [editOpenStatus, setEditOpenStatus] = useState(false);
    useEffect(() => {

        const storedServices = sessionStorage.getItem(CACHE_SERVICES);
        //check if session storage have data, if true return else call API

        if (!storedServices) {
            setServicesHandler();
        } else {

            setServices(JSON.parse(storedServices));
            setDisplayProduct(convertProductToDisplay(JSON.parse(storedServices)));
        }
    }, []);
    const convertProductToDisplay = (payload) =>{

       const displayServicesList =  (payload?.data?.map((row => row?.pricing?.map(element  => ({
            productId: element.productId,
            propertySize: row.propertySizeName,
            productName: element.productName,
            price: element.price,
            active: parseInt(element.active),
        })))))?.flat();
       return displayServicesList;
    };
    const onSelectStatusFilter = (e) =>{
        setSelectStatus(e);
        const status = e === "default" ? null : parseInt(e);
        const convertedService = convertProductToDisplay(services);
        const productListTemp = (e === 'default') ? convertedService:convertedService.filter(product => product.active === (status));
        setDisplayProduct(productListTemp);

    };

    const onChangeSearchProducts = (e) => {
        setSelectStatus('default');
        const searchValue = e.target.value;
        const convertedService = convertProductToDisplay(services);
        const productListTemp = convertedService.filter(product => (product.productName).toLowerCase().includes(searchValue.toLowerCase()));
        setDisplayProduct(productListTemp);

    };


    const onClickUpdateProduct = async () => {
        setEditOpenStatus(false);
           const httpResponse = await CommonLoadHttp({
            url: process.env.REACT_APP_URL_UPDATE_PRODUCT,
            displayMessage,
            setDisplayMessage,
            request: selectedProduct,
            token: '',
            method: METHOD_PUT,
            isDisplay: true,
            customPageMessage: MESSAGE_SUCCESS_UPDATE_PRODUCT,
            navigate: ''
        });
        if (httpResponse.isSuccess) {
            await setServicesHandler();
        }

    };
    const setServicesHandler = async () =>{
        const httpResponse = await CommonLoadHttp({
            url: process.env.REACT_APP_URL_GET_PRODUCTS,
            displayMessage,
            setDisplayMessage,
            request: '',
            token: '',
            method: METHOD_GET,
            isDisplay: displayMessage.isSuccess,
            customPageMessage: '',
            navigate: '',
            cache: CACHE_SERVICES
        });
        setServices(httpResponse?.isData);
        setDisplayProduct(convertProductToDisplay(httpResponse?.isData));
    };
    return (
        <section>

            <div className="flex ...">
                <SidebarAdmin />
                <div className="flex-auto w-64 ...">
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                        <div className="flex justify-between items-center pb-4 bg-white dark:bg-gray-900">
                            <label htmlFor="table-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="table-search-users"
                                    className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search"
                                    onChange={onChangeSearchProducts}
                                />
                            </div>
                            <div className="relative">
                                <select
                                    id="propertyService"
                                    onChange={(e) => onSelectStatusFilter(e.target.value)}
                                    value={selectStatus}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value={"default"}>
                                        Status
                                    </option>

                                    <option value={1} key={1}>
                                        Active
                                    </option>
                                    <option value={0} key={0}>
                                        Not Active
                                    </option>

                                </select>
                            </div>
                        </div>
                        <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage}
                                        isSuccess={displayMessage.isSuccess}/>
                        <Loading isActive={displayMessage.loading}/>
                        <ProductsTable getServiceList={displayProduct} openEditHandler={(payload)=>{ setSelectedProduct(payload);setEditOpenStatus(true)}} headerCell={SERVICES_HEADER}/>
                        <AdminProductsModalEdit editOpenStatus={editOpenStatus} onClickOpenStatus={()=>setEditOpenStatus(false)}  selectedServices={selectedProduct} onChangeUpdateProduct={ (payload)=> setSelectedProduct(payload)} onClickUpdateProduct={onClickUpdateProduct} />
                    </div>
                </div>
            </div>
        </section>);
};

export default AdminProducts;