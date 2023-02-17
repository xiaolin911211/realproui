import {Button, Modal} from "flowbite-react";

const AssignOrderModal = ({assignOpen, onClose, selectedEvent,setSelectedEvent, userList, onClickUpdateAssign}) =>{

    return (
        <Modal show={assignOpen} size="md" popup onClose={onClose}>
            <Modal.Body className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 rounded-lg">
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {selectedEvent.title}
                    </h3>
                    <div className="p-6 text-left">
                        <label
                            htmlFor="email"
                            className="block mb-5 text-lg font-normal text-gray-500 dark:text-gray-100"
                        >
                            OrderId:{" "}
                            <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                {selectedEvent.orderId}
                            </label>
                        </label>
                        <label
                            htmlFor="email"
                            className="block mb-5 text-lg font-normal text-gray-500 dark:text-gray-100"
                        >
                            services:{" "}
                            <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                {selectedEvent.service}
                            </label>
                        </label>
                        <label
                            htmlFor="email"
                            className="block mb-5 text-lg font-normal text-gray-500 dark:text-gray-100"
                        >
                            assignedTo:{" "}
                            <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                {selectedEvent?.assignes?.photographerFirstName}{" "}
                                {selectedEvent?.assignes?.photographerLastName} - {selectedEvent?.assignes?.photographerEmail}
                            </label>
                        </label>

                        <label
                            htmlFor="email"
                            className="block mb-5 text-lg font-normal text-gray-500 dark:text-gray-100"
                        >
                            Scheduled Time:{" "}
                            <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                {selectedEvent.start + ""}
                            </label>
                        </label>
                    </div>
                    <label
                        htmlFor="countries"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                        Assign to Staff
                    </label>
                    <select
                        id="staff"
                        value={selectedEvent.assignStaff}
                        onChange={(e) => setSelectedEvent({...selectedEvent, assignStaff: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option selected></option>
                        {userList?.map((row) => (
                         <option value={row.userId}>{row.firstName} {row.lastName} - {row.email} - {row.userId}</option>))}

                    </select>
                    <div className="grid grid-rows-1 grid-flow-col gap-4">
                    <Button
                        onClick={onClickUpdateAssign}
                    >
                        Confirm
                    </Button>
                    <Button
                        color="failure"
                        onClick={onClose}
                    >
                        cancel
                    </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};
export default AssignOrderModal;