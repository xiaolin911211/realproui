import {ADMIN_ORDER_SEARCH_LIST, ORDER_STATUS} from "../../common/constants";
import {Button} from "flowbite-react";
import {HiUserAdd} from "react-icons/hi";

const AdminOrderSearch = ({pagination, searchBy, setSearchBy,setPagination,onChangeSearch, onSelectStatusType}) => {
    return (
        <div className="flex justify-between items-center pb-4 bg-white dark:bg-gray-900">

            <div className="flex">
                <select
                    id="propertyService"
                    required={true}
                    value={searchBy.searchBySelect}
                    onChange={(e) => {
                        setSearchBy({orderStatus: '', searchByValue: '', searchBySelect: e.target.value});
                        setPagination({
                            ...pagination, orderId: null,
                            email: null,
                            address: null,
                            name: null,
                            status: null
                        })
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value={"default"}>
                        Search By
                    </option>
                    {ADMIN_ORDER_SEARCH_LIST.map((item) => (
                        <option key={item}>
                            {item}
                        </option>
                    ))}

                </select>
                <div className="relative w-full">
                    <input type="search" id="search-dropdown"
                           disabled={searchBy.searchBySelect === 'default'}
                           value={searchBy.searchByValue}
                           onChange={onChangeSearch}
                           className="block p-2.5 w-96 z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                           placeholder="Search"/>
                </div>
            </div>


            <div className="relative">
                <select
                    id="propertyService"
                    required={true}
                    value={searchBy.orderStatus}
                    onChange={(e) => onSelectStatusType(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value={"default"}>
                        Order Status
                    </option>
                    {ORDER_STATUS.map((item =>
                            <option value={item.statusId} key={item.statusId}>
                                {item.name}
                            </option>
                    ))}
                </select>
            </div>

            <div className="relative">
                <Button
                    // onClick={()=>setModalOpen({...modalOpen,openAdd: true})}
                    color="dark"
                    pill={true}>
                    <HiUserAdd className="mr-2 h-5 w-5"/>
                    Add User
                </Button>
            </div>
        </div>
    )
}
export default AdminOrderSearch;