import {Modal} from "flowbite-react";

const AdminOrderEdit = ({openEdit, onClose, onChangeUpdateOrder, selectedOrder, onClickUpdateOrderHandler}) =>{
    return (
        <Modal show={openEdit} size="md" popup onClose={onClose}>
            <Modal.Body className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                <div className="p-6 text-center">
                    <svg
                        className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Edit Order
                    </h3>
                    <div className="flex flex-col mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            First Name
                        </label>

                        <input
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="text"
                            name="first_name"
                            // value={first_name}
                            // onChange={onChangeFirstName}
                            id="first_name"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Last Name
                        </label>
                        <input
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="text"
                            name="last_name"
                            // value={last_name}
                            // onChange={onChangeLastName}
                            id="last_name"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="email"
                            name="email"
                            // value={email}
                            // onChange={onChangeEmail}
                            id="email"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Phone
                        </label>
                        <input
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="text"
                            name="phone"
                            // value={phone}
                            // onChange={onChangePhone}
                            id="phone"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="password"
                            // value={password}
                            // onChange={onChangePassword}
                            name="password"
                            id="password"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Confirm Password
                        </label>
                        <input
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="password"
                            // value={confirmpassword}
                            // onChange={onChangeConfirmPassword}
                            name="confirmpassword"
                            id="confirmpassword"
                        />
                    </div>
                    <div className="relative">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Account Type
                        </label>
                        {/* <select
                id="accountType"
                required={true}
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option selected value={"default"}>
                  Account Type
                </option>
                {USER_ROLES.map((row) => (
                  <option value={row.id} key={row.id}>
                    {row.role}{" "}
                  </option>
                ))}
              </select> */}
                    </div>
                    <button
                        data-modal-toggle="popup-modal"
                        type="button"
                        // onClick={addUserHandler}
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                        Yes, I'm sure
                    </button>
                    <button
                        data-modal-toggle="popup-modal"
                        type="button"
                        // onClick={() => setOpen(false)}
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                        No, cancel
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
};
export default AdminOrderEdit;