import {Button, Label, Modal} from "flowbite-react";
import React from "react";
import PropertyInfo from "../booknow/property-info";
import ContactInfo from "../booknow/contact-info";
import ServiceDate from "../booknow/service-date";
import CartProducts from "../booknow/cart-products";
import {DisplayMessage, DropDownAgent} from "../../common/sharedComponent";
const AdminOrderAdd = ({openAdd, onClose,propertyData, stateOrder, dispatchOrderNow,onClickAddOrderHandler,displayMessage,userList}) =>{
    return (

        <Modal size="5xl" className="overflow-x-hidden overflow-y-auto"  show={openAdd}   popup onClose={onClose}>
            <Modal.Body className="overflow-x-hidden overflow-y-auto" >
                <div className="h-screen overflow-x-auto overflow-y-auto relative shadow-md sm:rounded-lg">
                    <Label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300 text-center" ></Label>
                    <Label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300 text-center" >Add Order</Label>
                    <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage}
                                    isSuccess={displayMessage.isSuccess}/>
                    <Label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300" >Property Info</Label>
                    <PropertyInfo propertyData={propertyData} propertyInfo={stateOrder} setPropertyInfo={dispatchOrderNow}/>
                    <Label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300" >Contact Info</Label>
                    <ServiceDate propertyData={propertyData?.scheduleTimeData?.data} serviceDates={stateOrder} setServiceDates={dispatchOrderNow}/>
                    <ContactInfo contactInfo={stateOrder} setContactInfo={dispatchOrderNow}/>
                    <Label>Agent</Label>
                    <DropDownAgent userList={userList} dispatchSelect={stateOrder} setDispatchSelect={dispatchOrderNow} />
                    <CartProducts propertyData={propertyData} stateBookNow={stateOrder}/>
                    <div className="grid gap-6 mb-6 lg:grid-cols-2">
                        <Button
                            data-modal-toggle="popup-modal"
                            type="submit"
                            color="dark"
                            pill={true}
                            onClick={onClickAddOrderHandler}
                        >
                            Yes, I'm sure
                        </Button>
                        <Button
                            data-modal-toggle="popup-modal"
                            type="submit"
                            color="failure"
                            pill={true}
                            onClick={onClose}
                        >
                            No, cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>

        </Modal>

    )
};
export default AdminOrderAdd;