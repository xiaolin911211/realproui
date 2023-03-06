import SidebarAdmin from "../../navigation/sidebar";
import {
    ACTION_EDIT_DISPATCH,
    ACTION_RESET,
    COMMON_CREATE_ORDER_REQUEST,
    DISPLAY_INIT,
    INITIAL_STATE_BOOKNOW,
    METHOD_GET,
    ORDER_HISTORY_HEADER,
    PROPERTY_INIT,
    TABLE_INI_PAGE_NUM,
    TABLE_RECORD_PER_PAGE
} from "../../common/constants";
import {UserContext} from "../../contexts/context";
import {CheckPropertyCache, CommonLoadHttp, DisplayMessage} from "../../common/sharedComponent";
import Tables from "../../common/tables";
import {Pagination} from "flowbite-react";
import {useContext, useEffect, useReducer, useState} from "react";
import AdminOrderSearch from "./search";
import AdminOrderEdit from "./modal-edit";
import AdminOrderAdd from "./modal-add";
import {bookNowReducer} from "../../contexts/reducers";
import {validateDetail, validateScheduleTime, validateService} from "../../common/validation";
import {httpCommonGet} from "../../api/http-request";

const AdminOrder = () => {
    const [orderData, setOrderData] = useState([]);
    const [totalPage, setTotalPage] = useState(TABLE_INI_PAGE_NUM);
    const [userList, setUserList] = useState([]);
    const [modalOpen, setModalOpen] = useState({
        openEdit: false,
        openAdd: false
    });

    const [searchBy, setSearchBy] = useState({
        searchBySelect: 'default',
        searchByValue: '',
        orderStatus: 'default'
    });
    const [propertyData, setPropertyData] = useState(PROPERTY_INIT);

    const {state} = useContext(UserContext);
    const [pagination, setPagination] = useState({
        pageNo: TABLE_INI_PAGE_NUM,
        pageSize: TABLE_RECORD_PER_PAGE,
        userId: state.userId,
        orderId: null,
        email: null,
        address: null,
        name: null,
        status: null

    });
    const [displayMessage, setDisplayMessage] = useState(DISPLAY_INIT);
    const [stateOrder, dispatchOrderNow] = useReducer(bookNowReducer, INITIAL_STATE_BOOKNOW);
    useEffect(() => {
        fetchUserInformation();
        CheckPropertyCache({propertyData, setPropertyData, displayMessage, setDisplayMessage});
    }, []);

    useEffect(() => {
        httpGetOrders();

    }, [pagination]);

    const httpGetOrders = async () => {
        const httpResponse = await CommonLoadHttp({
            url: process.env.REACT_APP_URL_GET_ORDER,
            displayMessage,
            setDisplayMessage,
            request: pagination,
            token: state.sessionToken,
            method: METHOD_GET,
            isDisplay: !displayMessage.isSuccess,
            customPageMessage: '',
            navigate: '',
            cache: ''
        });
        setOrderData(httpResponse?.isData?.data)
        setTotalPage(httpResponse?.isData?.totalPages);
    };
    const onClickAddOrderOpen = () =>{
        dispatchOrderNow({type: ACTION_RESET,value:''});
        setModalOpen({...modalOpen, openAdd: true});

    };
    const onPageChange = async (e) => {
        if (e <= totalPage || e > 0) {
            setPagination({...pagination, pageNo: e});
        }
    };
    const onChangeSearch = (e) => {
        setSearchBy({...searchBy, searchByValue: e.target.value});
        switch (searchBy.searchBySelect) {
            case 'Name':
                setPagination({...pagination, name: e.target.value});
                break;
            case 'OrderID':
                setPagination({...pagination, orderId: e.target.value});
                break;
            case 'Email':
                setPagination({...pagination, email: e.target.value});
                break;
            case 'Address':
                setPagination({...pagination, address: e.target.value});
                break;
            case "default":

        }
    };
    const openOrderDetailHandler = (payload) =>{
        console.log('openOrderDetailHandler : ',payload);

        dispatchOrderNow({type: ACTION_EDIT_DISPATCH, value: payload, propertyDateList: propertyData});

    }
    const onClickAddOrderHandler = async (e) => {
        e.preventDefault();

        if (validateService({stateBookNow: stateOrder, displayMessage, setDisplayMessage}) && validateDetail({
            stateBookNow: stateOrder,
            displayMessage,
            setDisplayMessage
        }) && validateScheduleTime({stateBookNow: stateOrder, displayMessage, setDisplayMessage})) {
            setModalOpen({...modalOpen, modalAdd:false});
            await CommonLoadHttp(COMMON_CREATE_ORDER_REQUEST({displayMessage, setDisplayMessage, stateBookNow: stateOrder, state}));
        }
    }

    const onSelectStatusType = (e) => {

        setSearchBy({
            searchBySelect: 'default',
            searchByValue: '',
            orderStatus: parseInt(e)
        });
        setPagination({
            ...pagination, orderId: null,
            email: null,
            address: null,
            name: null,
            status: e === 'default' ? null : parseInt(e)
        });
    };
    const fetchUserInformation = async () => {
        setDisplayMessage({...displayMessage, loading: true});
        const getUserListResponse = await httpCommonGet(process.env.REACT_APP_BASE_PATH + process.env.REACT_APP_URL_GET_ADMIN_USERS, {}, state.sessionToken);
        setDisplayMessage({...displayMessage, loading: false});
        const [isSuccess, isMessage, isCode, userList] = [getUserListResponse?.data?.success, getUserListResponse?.data?.msg, getUserListResponse?.data?.code, getUserListResponse?.data?.data];
        setUserList(userList);

    }

    const onClickUpdateOrderHandler = async (e) => {
        console.log('onClickUpdateOrderHandler');
        setModalOpen({...modalOpen, openEdit: false});
        // setDisplayMessage({...displayMessage, loading: true});
        // const updateUserResponse = await httpCommonPost(process.env.REACT_APP_BASE_PATH + process.env.REACT_APP_URL_USER_UPDATE, selectedUser, state.sessionToken);
        // setDisplayMessage({...displayMessage, loading: false});
        // const [isSuccess, isMessage, isCode] = [updateUserResponse?.data?.success, updateUserResponse?.data?.msg, updateUserResponse?.data?.code];
        // if (isSuccess){
        //     await fetchUserInformation();
        // }
        // displayMessageAndRedirect(isSuccess, isMessage, isCode);
    };


    return (
        <>
            <section>
                <div className="flex ...">
                    <SidebarAdmin/>
                    <div className="flex-auto w-64 ...">
                        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                            <AdminOrderSearch onChangeSearch={onChangeSearch} setSearchBy={setSearchBy}
                                              setPagination={setPagination} searchBy={searchBy} pagination={pagination}
                                              onSelectStatusType={onSelectStatusType} onClickAddOrderOpen={onClickAddOrderOpen}
                                              />
                            <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage}
                                            isSuccess={displayMessage.isSuccess}/>
                            <Tables getOrderList={orderData} openOrderDetailHandler={(payload) => {
                                openOrderDetailHandler(payload);
                                setModalOpen({...modalOpen, openEdit: true}) 
                            }} label={'Edit'} headerCell={ORDER_HISTORY_HEADER} userList={userList} />
                            {modalOpen.openEdit ?<AdminOrderEdit openEdit={modalOpen.openEdit}
                                            onClose={() => setModalOpen({...modalOpen, openEdit: false})}
                                            stateOrder={stateOrder} dispatchOrderNow={dispatchOrderNow} propertyData={propertyData} userList={userList}

                                            />:<></>}
                            {modalOpen.openAdd ? <AdminOrderAdd openAdd={modalOpen.openAdd}
                                           onClose={() => setModalOpen({...modalOpen, openAdd: false})}
                                           propertyData={propertyData} stateOrder={stateOrder}
                                           dispatchOrderNow={dispatchOrderNow} onClickAddOrderHandler={onClickAddOrderHandler} displayMessage={displayMessage} userList={userList} />: <></>}
                            <div className="flex flex-col items-center">
              <span className="text-xl text-gray-700 dark:text-gray-400">
                Page {pagination.pageNo}
              </span>
                                <div className="inline-flex mt-2 xs:mt-0">
                                    <Pagination
                                        currentPage={pagination.pageNo}
                                        onPageChange={onPageChange}
                                        showIcons={true}
                                        totalPages={totalPage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};
export default AdminOrder;