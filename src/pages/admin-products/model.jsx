import {Modal} from "flowbite-react";


const AdminProductsModel = ({editOpenStatus, onClickOpenStatus, selectedServices, onChangeUpdateProduct,onClickUpdateProduct}) =>{

    return(
        <Modal show={editOpenStatus} size="md" popup onClose={() => onClickOpenStatus(false)}>
            <Modal.Body className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                <div className="p-6 text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Update Product
                    </h3>
                    <div className="flex flex-col mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >
                            ProductID
                        </label>

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
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >
                            Property Size
                        </label>

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
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Product Name
                        </label>
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
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Price
                        </label>
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
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Status
                        </label>
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

                    <button
                        data-modal-toggle="popup-modal"
                        type="button"
                        onClick={onClickUpdateProduct}
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                        Yes, I'm sure
                    </button>
                    <button
                        data-modal-toggle="popup-modal"
                        type="button"
                        onClick={() => onClickOpenStatus(false)}
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                        No, cancel
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};
export default AdminProductsModel;
