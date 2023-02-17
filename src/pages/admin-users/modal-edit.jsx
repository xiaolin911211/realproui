import {Button, Modal} from "flowbite-react";

const ModalEdit = ({openEdit, selectedUser,onClose, onChangeUpdateUser, onClickUpdateUserHandler}) =>{

    return (
        <Modal show={openEdit} size="md" popup onClose={onClose}>
            <Modal.Body className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                <div className="p-6 text-center">

                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Update User
                    </h3>
                    <div className="flex flex-col mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            First Name
                        </label>

                        <input
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="text"
                            name="first_name"
                            value={selectedUser.firstName}
                            onChange={(e)=>onChangeUpdateUser({...selectedUser, firstName: e.target.value})}
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
                            value={selectedUser.lastName}
                            onChange={(e)=>onChangeUpdateUser({...selectedUser, lastName: e.target.value})}
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
                            value={selectedUser.email}
                            onChange={(e)=>onChangeUpdateUser({...selectedUser, email: e.target.value})}
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
                            value={selectedUser.phone}
                            onChange={(e)=>onChangeUpdateUser({...selectedUser, phone: e.target.value})}
                            id="phone"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            UserID
                        </label>
                        <input
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="text"
                            value={selectedUser?.userId}
                            disabled={true}
                            id="userID"
                        />
                    </div>
                    <div className="relative">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Account Status
                        </label>
                        <select
                            id="propertyStatus"
                            onChange={(e)=>onChangeUpdateUser({...selectedUser, status: parseInt(e.target.value)} )}
                            value={selectedUser?.status}
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        >

                            <option value={1} key={1}>
                                Active
                            </option>
                            <option value={2} key={2}>
                                Not Active
                            </option>

                        </select>
                    </div>
                    <div className="relative">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Account Type
                        </label>
                        <select
                            id="propertyStatus"
                            onChange={(e)=>onChangeUpdateUser({...selectedUser, accountTypeId:  parseInt(e.target.value)} )}
                            value={selectedUser?.accountTypeId}
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        >

                            <option value={1} key={1}>
                                Admin
                            </option>
                            <option value={2} key={2}>
                                Agent
                            </option>
                            <option value={3} key={3}>
                                Photographer
                            </option>
                        </select>
                    </div>
                    <div class="grid grid-rows-1 grid-flow-col gap-4">
                        <Button
                            onClick={onClickUpdateUserHandler}
                        >
                            Yes, Update
                        </Button>
                    <Button color="failure"
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
export default ModalEdit;