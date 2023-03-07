import {Fragment, useContext} from "react";
import {
    ACTION_SET_CHECKED_SERVICES,
    ACTION_SET_DISPLAY_SERVICES,
    ACTION_SET_EXTRA_SERVICE,
    ACTION_SET_PROPERTY_REGION,
    ACTION_SET_PROPERTY_SERVICE,
    ACTION_SET_PROPERTY_SERVICES,
    ACTION_SET_PROPERTY_SIZE,
    ACTION_SET_PROPERTY_TYPE,
    STATUS_ACTIVE
} from "../../common/constants";
import {Checkbox, Label} from "flowbite-react";
import {INPUT_BLUE_BG} from "../../common/css-constant";

const PropertyInfo = ({propertyData, propertyInfo, setPropertyInfo}) =>{
    const onChangeSelectPropertySize = (e) => {
        setPropertyInfo({type: ACTION_SET_CHECKED_SERVICES, value: []});
        setPropertyInfo({type: ACTION_SET_EXTRA_SERVICE, value: []});
        setPropertyInfo({type: ACTION_SET_PROPERTY_SERVICES, value: propertyData?.servicesData?.data.filter((item) => parseInt(item.propertySizeId) === parseInt(e))[0].pricing});
        setPropertyInfo({type: ACTION_SET_PROPERTY_SIZE, value: e});
    };
    const onChangeSetSelectedPropertyRegion = (e) => {
        setPropertyInfo({type: ACTION_SET_PROPERTY_REGION, value: e});
    };
    const onChangeSetSelectedPropertyType = (e) => {
        setPropertyInfo({type: ACTION_SET_PROPERTY_TYPE, value: e});
    };
    const onChangeSelectPropertyServices = (e) => {
        setPropertyInfo({type: ACTION_SET_DISPLAY_SERVICES, value: []});
        setPropertyInfo({type: ACTION_SET_CHECKED_SERVICES, value: []});
        setPropertyInfo({type: ACTION_SET_PROPERTY_SERVICE, value: e});
        // Get selected property all services(pricing)  based on selected property size ID
        const selectedProducts = propertyData?.servicesData?.data?.filter(
            (item) => item.propertySizeId === parseInt(propertyInfo.selectPropertySize)
        )[0];

        //Get all product services that is NOT a bundle
        const filteredProductTypes = selectedProducts.pricing.filter(
            (item) => item.type.length === 1
        );

        //Get selected product services
        const selectedProductTypes = selectedProducts.pricing.filter(
            (item) => item.productId === parseInt(e)
        )[0].type;

        //Check if NOT bundle services list if it has a product service that is being selected, if not then do nothing else remove it from extra services
        for (let x = 0; x < selectedProductTypes.length; x++) {
            const index = filteredProductTypes.findIndex(
                (item) => item.productId === selectedProductTypes[x].id
            );
            filteredProductTypes.splice(index, 1);
        }

        setPropertyInfo({type: ACTION_SET_EXTRA_SERVICE, value: filteredProductTypes});
    };
    const onChangeCheckedServices = (e) => {
        // Get checked service id
        let updatedList = [...propertyInfo.checkedService];

        if (e.target.checked) {
            //if checked then add to checked service by ID
            updatedList = [...propertyInfo.checkedService, e.target.value];
        } else {
            //else delete from checked service by ID
            updatedList.splice(propertyInfo.checkedService.indexOf(e.target.value), 1);
        }

        setPropertyInfo({type: ACTION_SET_CHECKED_SERVICES, value: updatedList});
        const extraServiceList = [];
        for (let x = 0; x < updatedList.length; x++) {
            if (
                propertyInfo.extraService.filter(
                    (item) => item.productId === parseInt(updatedList[x])
                ).length > 0
            ) {
                extraServiceList.push(
                    propertyInfo.extraService.filter(
                        (item) => item.productId === parseInt(updatedList[x])
                    )[0]
                );
            }
        }

        setPropertyInfo({type: ACTION_SET_DISPLAY_SERVICES, value: extraServiceList});
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
                        value={propertyInfo.selectPropertySize}
                        onChange={(e) => onChangeSelectPropertySize(e.target.value)}
                        className={INPUT_BLUE_BG}
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
                        value={propertyInfo.selectPropertyService}
                        onChange={(e) => onChangeSelectPropertyServices(e.target.value)}
                        className={INPUT_BLUE_BG}
                    >
                        <option  value={"default"}>
                            Choose Property Service
                        </option>
                        {propertyInfo.propertyServices?.map((row) => (
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
                        className="overscroll-x-contain	 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Extra Services
                    </Label>
                    <div className="relative p-4 mb-4 text-sm rounded-lg border-2">
                        <div className="flex items-center gap-2">
                            {propertyInfo.extraService?.map((item, i) => (
                                item.active === STATUS_ACTIVE ? (
                                <Fragment key={item.productName}>
                                    <Checkbox
                                        id={item.productName}
                                        key={item.productId}
                                        checked={propertyInfo.checkedService.includes(
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
                        value={propertyInfo.selectPropertyType}
                        onChange={(e) => onChangeSetSelectedPropertyType(e.target.value)}
                        className={INPUT_BLUE_BG}
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
                        value={propertyInfo.selectPropertyRegion}
                        onChange={(e) => onChangeSetSelectedPropertyRegion(e.target.value)}
                        className={INPUT_BLUE_BG}
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