import {Button, Label, Modal} from "flowbite-react";


const AdminProductsModalEdit = ({editOpenStatus, onClickOpenStatus, selectedServices, onChangeUpdateProduct,onClickUpdateProduct}) =>{

    return(
        <Modal show={editOpenStatus} size="md" popup onClose={() => onClickOpenStatus(false)}>
            <Modal.Body className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                <div className="p-6 text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Update Product
                    </h3>
                    <div className="flex flex-col mb-4">
                        <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >
                            ProductID
                        </Label>

                        <input
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="text"
                            name="productId"
                            value={selectedServices.productId}
                            disabled={true}
                            id="productId"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >
                            Property Size
                        </Label>

                        <input
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="text"
                            name="propertySize"
                            value={selectedServices.propertySize}
                            disabled={true}
                            id="propertySize"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Product Name
                        </Label>
                        <input
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="text"
                            name="productName"
                            value={selectedServices.productName}
                            onChange={(e)=>onChangeUpdateProduct({...selectedServices, productName: e.target.value})}
                            id="productName"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Price
                        </Label>
                        <input
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="text"
                            name="price"
                            value={selectedServices.price}
                            onChange={(e)=>onChangeUpdateProduct({...selectedServices, price: e.target.value})}
                            id="price"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Status
                        </Label>
                        <select
                            id="propertyStatus"
                            onChange={(e)=>onChangeUpdateProduct({...selectedServices, active: parseInt(e.target.value)})}
                            value={selectedServices.active}
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        >

                            <option value={1} key={1}>
                                Active
                            </option>
                            <option value={0} key={0}>
                                Not Active
                            </option>

                        </select>
                    </div>
                    <div className="grid gap-6 mb-6 lg:grid-cols-2">
                    <Button
                        data-modal-toggle="popup-modal"
                        type="button"
                        onClick={onClickUpdateProduct}
                        color="dark"
                        pill={true}
                    >
                        Yes, I'm sure
                    </Button>
                    <Button
                        data-modal-toggle="popup-modal"
                        type="button"
                        onClick={() => onClickOpenStatus(false)}
                        color="failure"
                        pill={true}
                    >
                        No, cancel
                    </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};
export default AdminProductsModalEdit;
