import SidebarAdmin from "../../navigation/sidebar";
import UserTables from "./tables";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../contexts/context";
import {httpCommonGet, httpCommonPost, httpCommonPut} from "../../api/http-request";
import {
    MESSAGE_SERVER_ERROR, MESSAGE_SUCCESS_UPDATE_USER, MESSAGE_UNAUTHORIZED, PAGE_LOG_IN, SESSION_ORDER, SESSION_USER,
    TABLE_INI_PAGE_NUM,
    TABLE_RECORD_PER_PAGE,
    UNAUTHORIZED_CODE,
    USERS_HEADER
} from "../../common/constants";
import {Button, Pagination} from "flowbite-react";
import {DisplayMessage, Loading, UnauthorizedLogout} from "../../common/sharedComponent";
import ModalEdit from "./modal-edit";
import {useNavigate} from "react-router-dom";
import AdminModalAdd from "./modal-add";
import { HiUserAdd } from "react-icons/hi";

const AdminUsers = () => {
    const {state} = useContext(UserContext);
    const [userList, setUserList] = useState([]);
    const [modalOpen, setModalOpen] = useState({
        openEdit: false,
        openAdd: false
    });
    const navigate = useNavigate();
    const [usersProperty, setUsersProperty] = useState({
        users: [],
        currentPage: TABLE_INI_PAGE_NUM,
        pageSize: TABLE_INI_PAGE_NUM,
        onSelectAccountType: 'default',
        userSearchInput: ''
    });
    const [displayMessage, setDisplayMessage] = useState({
        isDisplay: false,
        isMessage: '',
        isSuccess: false,
        loading: false
    });

    const [addUser, setAddUser] = useState(
        {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            phone: '',
            accountTypeId: '',
        }
    )

    const [selectedUser, setSelectedUser] = useState([]);
    useEffect(() => {
        fetchUserInformation();
    }, []);

    const fetchUserInformation = async () => {
        setDisplayMessage({...displayMessage, loading: true});
        const getUserListResponse = await httpCommonGet(process.env.REACT_APP_BASE_PATH + process.env.REACT_APP_URL_GET_ADMIN_USERS, {}, state.sessionToken);
        setDisplayMessage({...displayMessage, loading: false});
        const [isSuccess, isMessage, isCode, userList] = [getUserListResponse?.data?.success, getUserListResponse?.data?.msg, getUserListResponse?.data?.code, getUserListResponse?.data?.data];

        if (isSuccess) {
            const userTemp = [];
            for (let item of userList) {
                userTemp.push({
                    "firstName": item.firstName,
                    "lastName": item.lastName,
                    "email": item.email,
                    "phone": item.phone,
                    "status": item.status.id,
                    "accountTypeId": item.accountTypeId.id,
                    "userId": item.userId
                })
            }
            setUserList(userTemp);
            const startIndex = 0 * TABLE_RECORD_PER_PAGE;
            const endIndex = startIndex + TABLE_RECORD_PER_PAGE;
            setUsersProperty({
                ...usersProperty,
                users: userTemp.slice(startIndex, endIndex),
                pageSize: Math.ceil(userTemp.length / TABLE_RECORD_PER_PAGE)
            });
        }
        else {
            displayMessageAndRedirect(isSuccess, isMessage, isCode);
        }
    };
    const onChangeSearchUser = (e) =>{
        const searchValue = e.target.value;
        const startIndex = 0 * TABLE_RECORD_PER_PAGE;
        const endIndex = startIndex + TABLE_RECORD_PER_PAGE;
        const userListTemp = userList.filter(user => user.firstName.toLowerCase().includes(searchValue.toLowerCase()) || user.lastName.toLowerCase().includes(searchValue.toLowerCase()));
        setUsersProperty({...usersProperty,onSelectAccountType: 'default', userSearchInput: searchValue, users: userListTemp.slice(startIndex, endIndex), currentPage: TABLE_INI_PAGE_NUM, pageSize: Math.ceil(userListTemp.length/TABLE_RECORD_PER_PAGE)})
    };

    const onSelectAccountType = (e) =>{
        const tempAccount = (e === "default") ? null : parseInt(e);
        const startIndex = 0 * TABLE_RECORD_PER_PAGE;
        const endIndex = startIndex + TABLE_RECORD_PER_PAGE;
        const userListTemp =(e == 'default') ? userList :userList.filter(user => user.accountTypeId === (tempAccount));
        setUsersProperty({...usersProperty, onSelectAccountType: tempAccount,userSearchInput: '', currentPage: TABLE_INI_PAGE_NUM, users: userListTemp.slice(startIndex, endIndex), pageSize: Math.ceil(userListTemp.length/TABLE_RECORD_PER_PAGE)});

    };

    const onPageChange = async (e) => {
        if (e <= usersProperty.pageSize || e > 0) {
            const startIndex = (e - 1) * TABLE_RECORD_PER_PAGE;
            const endIndex = startIndex + TABLE_RECORD_PER_PAGE;
            setUsersProperty({...usersProperty, currentPage: e, users: userList?.slice(startIndex,endIndex)});
        }
    };

    const onClickUpdateUserHandler = async (e) =>{
        setModalOpen({...modalOpen, openEdit: false});
        setDisplayMessage({...displayMessage, loading: true});
        const updateUserResponse = await httpCommonPost(process.env.REACT_APP_BASE_PATH + process.env.REACT_APP_URL_USER_UPDATE, selectedUser, state.sessionToken);
        setDisplayMessage({...displayMessage, loading: false});
        const [isSuccess, isMessage, isCode] = [updateUserResponse?.data?.success, updateUserResponse?.data?.msg, updateUserResponse?.data?.code];
        if (isSuccess){
            await fetchUserInformation();
        }
        displayMessageAndRedirect(isSuccess, isMessage, isCode);
    };
    const onClickAddUserHandler = async () =>{
        setModalOpen({...modalOpen, openAdd: false});
        setDisplayMessage({...displayMessage, loading: true});
        const addUserResponse = await httpCommonPost(process.env.REACT_APP_BASE_PATH + process.env.REACT_APP_URL_URL_REGISTER, addUser, state.sessionToken);
        setDisplayMessage({...displayMessage, loading: false});
        const [isSuccess, isMessage, isCode] = [addUserResponse?.data?.success, addUserResponse?.data?.msg, addUserResponse?.data?.code];
        if (isSuccess){
            await fetchUserInformation();
        }
        displayMessageAndRedirect(isSuccess, isMessage, isCode);
    }

    const displayMessageAndRedirect = (isSuccess, isMessage,isCode) =>{
        setDisplayMessage({
            isDisplay: true,
            isMessage: isSuccess ? MESSAGE_SUCCESS_UPDATE_USER : (isCode === UNAUTHORIZED_CODE ? MESSAGE_UNAUTHORIZED : (isMessage === undefined ? MESSAGE_SERVER_ERROR : isMessage)),
            isSuccess: isSuccess,
            loading: false
        });
        // if unauthorized then log out
        UnauthorizedLogout(isCode,navigate);
    }
    return (
        <section>
            <div className="flex ...">
                <SidebarAdmin/>
                <div className="flex-auto w-64 ...">
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                        <div className="flex justify-between items-center pb-4 bg-white dark:bg-gray-900">
                            <label htmlFor="table-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="table-search-users"
                                    className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search"
                                    onChange={onChangeSearchUser}
                                    value={usersProperty.userSearchInput}
                                />
                            </div>
                            <div className="relative">
                                <select
                                    id="propertyService"
                                    required={true}
                                    value={usersProperty.onSelectAccountType}
                                    onChange={(e) => onSelectAccountType(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value={"default"}>
                                        Account Type
                                    </option>

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

                            <div className="relative">
                                <Button
                                    onClick={()=>setModalOpen({...modalOpen,openAdd: true})}
                                    color="dark"
                                        pill={true}>
                                    <HiUserAdd className="mr-2 h-5 w-5" />
                                    Add User
                                </Button>
                            </div>
                        </div>
                        <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage}
                                        isSuccess={displayMessage.isSuccess}/>
                        <Loading isActive={displayMessage.loading} />
                        <ModalEdit openEdit={modalOpen.openEdit} selectedUser={selectedUser} onClose={()=>setModalOpen({...modalOpen, openEdit: false})} onChangeUpdateUser={(payload)=>setSelectedUser(payload)} onClickUpdateUserHandler={onClickUpdateUserHandler}/>
                     {/*   <AdminModalAdd openAdd={modalOpen.openAdd} onClose={()=>setModalOpen({...modalOpen, openAdd: false})} addUser={addUser} onChangeUpdateUser={(payload)=>setAddUser(payload)} onClickAddUserHandler={onClickAddUserHandler}/>*/}
                        <UserTables getUserList={usersProperty.users} headerCell={USERS_HEADER} onClickEdit={(payload)=> {setSelectedUser(payload) ; setModalOpen({...modalOpen, openEdit: true})}} />
                        <div className="flex flex-col items-center">
              <span className="text-xl text-gray-700 dark:text-gray-400">
                Page {usersProperty.currentPage}
              </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                                <Pagination
                                    currentPage={usersProperty.currentPage}
                                    onPageChange={onPageChange}
                                    showIcons={true}
                                    totalPages={usersProperty.pageSize}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default AdminUsers;