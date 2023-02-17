import {Button, Modal} from "flowbite-react";
import {USER_ROLES} from "../../common/constants";

const AdminModalAdd = ({openAdd, onClose, addUser, onChangeUpdateUser, onClickAddUserHandler}) =>{
    return (<Modal show={openAdd} size="md" popup onClose={onClose}>
        <Modal.Body className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <div className="p-6 text-center">

                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Add New User
                </h3>
                <div className="flex flex-col mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        First Name
                    </label>

                    <input
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type="text"
                        name="first_name"
                        value={addUser.firstName}
                        onChange={(e)=>onChangeUpdateUser({...addUser, firstName: e.target.value})}
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
                        value={addUser.lastName}
                        onChange={(e)=>onChangeUpdateUser({...addUser, lastName: e.target.value})}
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
                        value={addUser.email}
                        onChange={(e)=>onChangeUpdateUser({...addUser, email: e.target.value})}
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
                        value={addUser.phone}
                        onChange={(e)=>onChangeUpdateUser({...addUser, phone: e.target.value})}
                        id="phone"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Password
                    </label>
                    <input
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type="text"
                        value={addUser.password}
                        onChange={(e)=>onChangeUpdateUser({...addUser, password: e.target.value})}
                        name="password"
                        id="password"
                    />
                </div>
                <div className="relative">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Account Type
                    </label>
                    <select
                        id="accountType"
                        required={true}
                        value={addUser.accountTypeId}
                        onChange={(e)=>onChangeUpdateUser({...addUser, accountTypeId: parseInt(e.target.value)} )}
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-blue-50 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                        <option value={"default"}>
                            Account Type
                        </option>
                        {USER_ROLES.map((row) => (
                            <option value={row.id} key={row.id}>
                                {row.role}{" "}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-rows-1 grid-flow-col gap-4">
                <Button

                    onClick={onClickAddUserHandler}
                >
                    Yes, I'm sure
                </Button>
                <Button
                    color="failure"
                    onClick={onClose}
                >
                    No, cancel
                </Button>
                </div>
            </div>
        </Modal.Body>
    </Modal>)
};
export default AdminModalAdd;