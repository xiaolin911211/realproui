import SidebarAdmin from "../../navigation/sidebar";
import {
    DISPLAY_INIT,
    MESSAGE_SERVER_ERROR,
    MESSAGE_UNAUTHORIZED,
    ORDER_HISTORY_HEADER,
    TABLE_INI_PAGE_NUM,
    TABLE_RECORD_PER_PAGE,
    UNAUTHORIZED_CODE
} from "../../common/constants";
import {UserContext} from "../../contexts/context";
import {useNavigate} from "react-router-dom";
import {httpCommonGet} from "../../api/http-request";
import {DisplayMessage, UnauthorizedLogout} from "../../common/sharedComponent";
import Tables from "../../common/tables";
import {Pagination} from "flowbite-react";
import {useContext, useEffect, useState} from "react";
import AdminOrderSearch from "./search";
import AdminOrderEdit from "./modal-edit";

const AdminOrder = () => {
    const [orderData, setOrderData] = useState([]);
    const [totalPage, setTotalPage] = useState(TABLE_INI_PAGE_NUM);
    const [selectedOrder, setSelectedOrder] = useState([]);
    const [modalOpen, setModalOpen] = useState({
        openEdit: false,
        openAdd: false
    });
    const [searchBy, setSearchBy] = useState({
        searchBySelect: 'default',
        searchByValue: '',
        orderStatus: 'default'
    });

    const {state} = useContext(UserContext);
    const navigate = useNavigate();
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


    useEffect(() => {
        fetchOrderData();
    }, [pagination]);
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

    const onSelectStatusType = (e) => {

        setSearchBy({
            searchBySelect: 'default',
            searchByValue: '',
            orderStatus: parseInt(e)
        })
        setPagination({
            ...pagination, orderId: null,
            email: null,
            address: null,
            name: null,
            status: parseInt(e)
        })
    };

    const onClickUpdateOrderHandler = async (e) =>{
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


    const fetchOrderData = async () => {
        setDisplayMessage({...displayMessage, loading: true});
        const fetchOrderDataResponse = await httpCommonGet(process.env.REACT_APP_BASE_PATH + process.env.REACT_APP_URL_GET_ORDER, pagination, state.sessionToken);
        setDisplayMessage({...displayMessage, loading: false});
        const [isSuccess, isMessage, isCode] = [fetchOrderDataResponse?.data?.success, fetchOrderDataResponse?.data?.msg, fetchOrderDataResponse?.data?.code];
        if (isSuccess) {
            setOrderData(fetchOrderDataResponse?.data?.data)
            setTotalPage(fetchOrderDataResponse?.data?.totalPages);
        } else {
            setDisplayMessage({
                isDisplay: true,
                isMessage: isCode === UNAUTHORIZED_CODE ? MESSAGE_UNAUTHORIZED : (isMessage === undefined ? MESSAGE_SERVER_ERROR : isMessage),
                isSuccess: isSuccess,
                loading: false
            });
            // if unauthorized then log out
            UnauthorizedLogout(isCode, navigate);
        }
    };

    return (
        <>
            <section>
                <div className="flex ...">
                    <SidebarAdmin/>
                    <div className="flex-auto w-64 ...">
                        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                            <AdminOrderSearch onChangeSearch={onChangeSearch} setSearchBy={setSearchBy} setPagination={setPagination} searchBy={searchBy} pagination={pagination} onSelectStatusType={onSelectStatusType} />
                            <DisplayMessage isDisplay={displayMessage.isDisplay} isMessage={displayMessage.isMessage}
                                            isSuccess={displayMessage.isSuccess}/>
                            <Tables getOrderList={orderData} openOrderDetailHandler={(payload)=> {setSelectedOrder(payload); setModalOpen({...modalOpen, openEdit: true})}} label={'Edit'} headerCell={ORDER_HISTORY_HEADER} />
                            <AdminOrderEdit openEdit={modalOpen.openEdit} onClose={()=>setModalOpen({...modalOpen, openAdd: false})} onChangeUpdateOrder={(payload)=>setSelectedOrder(payload)} selectedOrder={selectedOrder} onClickUpdateOrderHandler={onClickUpdateOrderHandler}/>
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