import {Fragment, useContext, useState} from "react";
import {ContextBookNow} from "../../contexts/context";
import {
    ACTION_SET_CHECKED_SERVICES, ACTION_SET_DISPLAY_SERVICES, ACTION_SET_EXTRA_SERVICE,
    ACTION_SET_PROPERTY_REGION,
    ACTION_SET_PROPERTY_SERVICE, ACTION_SET_PROPERTY_SERVICES,
    ACTION_SET_PROPERTY_SIZE, ACTION_SET_PROPERTY_TYPE,
    LOG_IN, STATUS_ACTIVE
} from "../../common/constants";
import {Checkbox, Label} from "flowbite-react";

const PropertyInfo = ({propertyData}) =>{
    const  {stateBookNow, dispatchBookNow}  = useContext(ContextBookNow);
    console.log('propertyData',propertyData)
    const onChangeSelectPropertySize = (e) => {
        dispatchBookNow({type: ACTION_SET_CHECKED_SERVICES, value: []});
        dispatchBookNow({type: ACTION_SET_EXTRA_SERVICE, value: []});
        dispatchBookNow({type: ACTION_SET_PROPERTY_SERVICES, value: propertyData?.servicesData?.data.filter((item) => parseInt(item.propertySizeId) === parseInt(e))[0].pricing});
        dispatchBookNow({type: ACTION_SET_PROPERTY_SIZE, value: e});
    };
    const onChangeSetSelectedPropertyRegion = (e) => {
        dispatchBookNow({type: ACTION_SET_PROPERTY_REGION, value: e});
    };
    const onChangeSetSelectedPropertyType = (e) => {
        dispatchBookNow({type: ACTION_SET_PROPERTY_TYPE, value: e});
    };
    const onChangeSelectPropertyServices = (e) => {
        dispatchBookNow({type: ACTION_SET_DISPLAY_SERVICES, value: []});
        dispatchBookNow({type: ACTION_SET_CHECKED_SERVICES, value: []});
        dispatchBookNow({type: ACTION_SET_PROPERTY_SERVICE, value: e});

        const selectedProducts = propertyData?.servicesData?.data?.filter(
            (item) => item.propertySizeId === parseInt(stateBookNow.selectPropertySize)
        )[0];


        const filteredProductTypes = selectedProducts.pricing.filter(
            (item) => item.type.length === 1
        );
        const seletedProductTypes = selectedProducts.pricing.filter(
            (item) => item.productId === parseInt(e)
        )[0].type;
        for (let x = 0; x < seletedProductTypes.length; x++) {
            const index = filteredProductTypes.findIndex(
                (item) => item.productId === seletedProductTypes[x].id
            );
            filteredProductTypes.splice(index, 1);
        }
        dispatchBookNow({type: ACTION_SET_EXTRA_SERVICE, value: filteredProductTypes});
    };
    const onChangeCheckedServices = (e) => {
        let updatedList = [...stateBookNow.checkedService];
        if (e.target.checked) {
            updatedList = [...stateBookNow.checkedService, e.target.value];
        } else {
            updatedList.splice(stateBookNow.checkedService.indexOf(e.target.value), 1);
        }
        dispatchBookNow({type: ACTION_SET_CHECKED_SERVICES, value: updatedList});
        const extraServiceList = [];
        for (let x = 0; x < updatedList.length; x++) {
            if (
                stateBookNow.extraService.filter(
                    (item) => item.productId === parseInt(updatedList[x])
                ).length > 0
            ) {
                extraServiceList.push(
                    stateBookNow.extraService.filter(
                        (item) => item.productId === parseInt(updatedList[x])
                    )[0]
                );
            }
        }
        dispatchBookNow({type: ACTION_SET_DISPLAY_SERVICES, value: extraServiceList});
    };

    return (                <>
        <div className="mt-8 p-4">
            <div className="justify-center items-center">
                <Label
                    htmlFor="remember"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    Property Size
                </Label>
                <div className="mb-6">
                    <select
                        id="propertySize"
                        value={stateBookNow.selectPropertySize}
                        onChange={(e) => onChangeSelectPropertySize(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option  value={"default"}>
                            Choose property Size
                        </option>
                        {propertyData?.servicesData?.data?.map((row) => (
                            <option
                                value={row.propertySizeId}
                                key={row.propertySizeId}
                            >
                                {row.propertySizeName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <Label
                        htmlFor="remember"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Property Services
                    </Label>
                    <select
                        id="propertyService"
                        required={true}
                        value={stateBookNow.selectPropertyService}
                        onChange={(e) => onChangeSelectPropertyServices(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option  value={"default"}>
                            Choose Property Service
                        </option>
                        {stateBookNow.propertyServices?.map((row) => (
                            row.active === STATUS_ACTIVE ? (
                            <option value={row.productId} key={row.productId}>
                                {row.productName} $ {row.price}
                            </option>) : null
                        ))}
                    </select>
                </div>
                <div className="justify-center items-center">
                    <Label
                        htmlFor="remember"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Extra Services
                    </Label>
                    <div className="relative p-4 mb-4 text-sm rounded-lg border-2">
                        <div className="flex items-center gap-2">
                            {stateBookNow.extraService?.map((item, i) => (
                                item.active === 1 ? (
                                <Fragment key={item.productName}>
                                    <Checkbox
                                        id={item.productName}
                                        key={item.productId}
                                        checked={stateBookNow.checkedService.includes(
                                            String(item.productId)
                                        )}
                                        value={item.productId}
                                        className="dark:border-gray-500 dark:bg-gray-600"
                                        onChange={onChangeCheckedServices}
                                    />
                                    <Label  htmlFor="remember">
                                        {item.productName} ${item.price}
                                    </Label>
                                </Fragment>) : null
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <Label
                        htmlFor="remember"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Property Type
                    </Label>
                    <select
                        id="propertyType"
                        value={stateBookNow.selectPropertyType}
                        onChange={(e) => onChangeSetSelectedPropertyType(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option  value={"default"}>
                            Choose property Type
                        </option>
                        {propertyData?.propertyTypeData?.data?.map((row) => (
                            <option value={row.id} key={row.id}>
                                {row.type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    <Label
                        htmlFor="remember"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Property Region
                    </Label>
                    <select
                        id="propertyRegion"
                        value={stateBookNow.selectPropertyRegion}
                        onChange={(e) => onChangeSetSelectedPropertyRegion(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option  value={"default"}>
                            Choose property region
                        </option>
                        {propertyData?.propertyRegionData?.data?.map((row) => (
                            <option value={row.id} key={row.id}>
                                {row.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    </>)
};
export default PropertyInfo;